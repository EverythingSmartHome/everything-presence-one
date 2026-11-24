const { parseHTML } = require('linkedom');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');
const original = fs.readFileSync(__dirname + '/installers.js', 'utf8');
const source = fs.readFileSync(__dirname + '/installers.js', 'utf8').replace(
  "import('https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module')", 'Promise.resolve()');
const flush = () => new Promise(resolve => setImmediate(resolve));
function wizard(search = '', missing = false) {
  const { window } = parseHTML('<html><body></body></html>');
  const requests = [];
  vm.runInNewContext(source, { window: { location: { search } }, document: window.document,
    customElements: window.customElements, HTMLElement: window.HTMLElement,
    navigator: { serial: {} }, URLSearchParams, console: { log() {} }, setTimeout: fn => fn(),
    fetch: async url => { requests.push(url); return { ok: !missing, json: async () => ({ builds: [{ chipFamily: 'ESP32', parts: [{}] }] }) }; },
  });
  const element = window.document.createElement('es-installer-one');
  window.document.body.append(element);
  const root = element.shadowRoot;
  const click = action => root.querySelector(`[data-action="${action}"]`).click();
  const power = () => root.querySelector('#wifi11');
  const toggle = () => { power().checked = !power().checked; power().dispatchEvent(new window.Event('change')); };
  return { root, click, power, toggle, requests };
}
function select(w, { revision = '1.6', sensor = 'sen0609', ble = false, co2 = false, beta = false, homey = false } = {}) {
  w.click(homey ? 2 : 1);
  w.click({ '1.3': 6, '1.5': 5, '1.6': 4 }[revision]);
  if (revision !== '1.3') w.click(sensor === 'sen0609' ? 7 : 8);
  w.click(ble ? 9 : 10);
  w.click(co2 ? 11 : 12);
  if (sensor === 'sen0395') w.click(beta ? 14 : 13);
}
test('normal visits cannot select reduced power', async () => {
  const w = wizard(); select(w); await flush();
  assert.equal(w.power().parentElement.parentElement.hidden, true);
  w.toggle(); await flush();
  assert.ok(w.requests.every(url => !url.includes('wifi11')));
});
test('all 20 stable hardware combinations resolve to published build names only after opt-in', async () => {
  const index = JSON.parse(fs.readFileSync(process.env.EP1_FIRMWARE_INDEX || __dirname + '/firmware-index.json', 'utf8'));
  const names = new Set(index.firmwares.flatMap(f => f.variants.map(v => v.manifestUrl)));
  let count = 0;
  for (const revision of ['1.3', '1.5', '1.6']) for (const sensor of (revision === '1.3' ? ['sen0395'] : ['sen0395', 'sen0609'])) {
    for (const ble of [false, true]) for (const co2 of [false, true]) {
      const w = wizard('?wifi_power=11'); select(w, { revision, sensor, ble, co2, homey: ble }); await flush();
      assert.ok(!w.requests.at(-1).includes('wifi11'));
      w.toggle(); await flush();
      assert.ok(w.requests.at(-1).includes('-stable-wifi11-manifest.json'));
      assert.ok(names.has(w.requests.at(-1).split('/').at(-1)));
      assert.equal(w.root.querySelector('.install-btn').disabled, false);
      count++;
    }
  }
  assert.equal(count, 20);
});
test('beta and SmartThings never expose the support power option', async () => {
  const w = wizard('?wifi_power=11'); select(w, { sensor: 'sen0395', beta: true }); await flush();
  assert.equal(w.power().parentElement.parentElement.hidden, true);
  const st = wizard('?wifi_power=11'); st.click(3); st.click(7); st.click(4); await flush();
  assert.equal(st.power().parentElement.parentElement.hidden, true);
  assert.ok(!st.requests.at(-1).includes('wifi11'));
});
test('Back and Start Over clear a previous power selection', async () => {
  const w = wizard('?wifi_power=11'); select(w); w.toggle(); await flush();
  w.click(0); assert.equal(w.power().checked, false);
  w.click(12); await flush(); assert.ok(!w.requests.at(-1).includes('wifi11'));
  w.toggle(); w.click(15); select(w); await flush();
  assert.equal(w.power().checked, false);
  assert.ok(!w.requests.at(-1).includes('wifi11'));
});
test('missing manifests leave installation disabled', async () => {
  const w = wizard('?wifi_power=11', true); select(w); w.toggle(); await flush();
  assert.equal(w.root.querySelector('.install-btn').disabled, true);
  assert.match(w.root.querySelector('[role="status"]').textContent, /not available/);
});
