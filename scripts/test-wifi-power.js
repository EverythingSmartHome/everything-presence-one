const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const workflow = read('.github/workflows/publish.yml');
const lowFiles = fs.readdirSync(root).filter(f => f.endsWith('-wifi11.yaml'));
assert.equal(lowFiles.length, 20);
const manifests = new Set();
const directories = new Set();
for (const file of lowFiles) {
  const standardFile = file.replace('-wifi11.yaml', '.yaml');
  const source = read(file);
  const original = read(standardFile);
  // Power must be the only hardware change in each corresponding variant.
  const normalized = source.replace('  wifi_power: !include common/wifi-power-11.yaml\n', '')
    .replace('wifi_power_profile: "wifi11"', 'wifi_power_profile: "standard"')
    .replace('firmware_channel: "stable-wifi11"', 'firmware_channel: "stable"')
    .replace('-stable-wifi11-manifest.json', '-stable-manifest.json')
    .replace(file + '@main', standardFile + '@main');
  assert.equal(normalized, original, `${file} changes hardware configuration`);
  const manifest = source.match(/source: https:\/\/\S+\/([^/]+-manifest.json)/)[1];
  assert.ok(!manifests.has(manifest), `duplicate ${manifest}`);
  manifests.add(manifest);
  const jobs = [...workflow.matchAll(/^  (publish-[\w-]+):\n([\s\S]*?)(?=^  [\w-]+:|$(?![\s\S]))/gm)];
  const matches = jobs.filter(([, , body]) => body.includes(`files: ${file}\n`));
  assert.equal(matches.length, 1, `${file} needs exactly one build job`);
  const [, job, body] = matches[0];
  assert.ok(body.includes(`manifest_filename: ${manifest}\n`));
  const dir = body.match(/directory_name: (\S+)/)[1];
  assert.ok(!directories.has(dir), `duplicate artifact directory ${dir}`);
  directories.add(dir);
  assert.ok(workflow.includes(`      - ${job}\n`), `${job} missing from publish dependencies`);
  assert.ok(source.includes('firmware_channel: "stable-wifi11"'));
}
assert.match(read('common/wifi-power-11.yaml'), /output_power: 11dB/);
assert.ok(!read('common/everything-presence-one-base.yaml').includes('output_power:'));
console.log('20 hardware-equivalent Wi-Fi power variants, unique artifacts/manifests, and publish dependencies verified.');
