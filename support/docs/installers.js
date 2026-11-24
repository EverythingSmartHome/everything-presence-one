// Canonical installer implementation shared by Wiki.js and standalone views. Edit this file directly.
const firmwareTools = import('https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module');
firmwareTools.catch(()=>{});

customElements.define('es-installer-one',class extends HTMLElement {
      connectedCallback(){
        if(this.shadowRoot)return;
        const root=this.attachShadow({mode:'open'});
        root.innerHTML="<style>\n    :host {\n      /* Light mode (default) */\n      --bg-gradient-start: #FFFFFF;\n      --bg-gradient-end: #FFFFFF;\n      --text-primary: #1e293b;\n      --text-secondary: #64748b;\n      --text-muted: #94a3b8;\n      --tile-bg: rgba(0, 0, 0, 0.03);\n      --tile-border: rgba(0, 0, 0, 0.08);\n      --tile-hover-bg: rgba(0, 0, 0, 0.05);\n      --tile-selected-bg: rgba(102, 126, 234, 0.1);\n      --tile-selected-border: #667eea;\n      --tile-selected-shadow: rgba(102, 126, 234, 0.15);\n      --summary-bg: rgba(0, 0, 0, 0.03);\n      --summary-item-bg: rgba(102, 126, 234, 0.1);\n      --summary-item-text: #5b6eae;\n      --btn-secondary-bg: rgba(0, 0, 0, 0.05);\n      --btn-secondary-hover: rgba(0, 0, 0, 0.08);\n      --btn-secondary-text: #475569;\n      --warning-bg: rgba(251, 191, 36, 0.1);\n      --warning-border: rgba(251, 191, 36, 0.3);\n      --warning-text: #b45309;\n      --progress-bg: #e2e8f0;\n      --progress-complete: #4ade80;\n      --back-btn-bg: rgba(0, 0, 0, 0.05);\n      --back-btn-hover: rgba(0, 0, 0, 0.1);\n    }\n\n    :host([data-theme=\"dark\"]) {\n      --bg-gradient-start: #111319;\n      --bg-gradient-end: #111319;\n      --text-primary: #ffffff;\n      --text-secondary: #a0a0a0;\n      --text-muted: #888888;\n      --tile-bg: rgba(255, 255, 255, 0.05);\n      --tile-border: rgba(255, 255, 255, 0.1);\n      --tile-hover-bg: rgba(255, 255, 255, 0.08);\n      --tile-selected-bg: rgba(102, 126, 234, 0.15);\n      --tile-selected-border: #667eea;\n      --tile-selected-shadow: rgba(102, 126, 234, 0.2);\n      --summary-bg: rgba(255, 255, 255, 0.05);\n      --summary-item-bg: rgba(102, 126, 234, 0.2);\n      --summary-item-text: #a5b4fc;\n      --btn-secondary-bg: rgba(255, 255, 255, 0.1);\n      --btn-secondary-hover: rgba(255, 255, 255, 0.15);\n      --btn-secondary-text: #ffffff;\n      --warning-bg: rgba(251, 191, 36, 0.1);\n      --warning-border: rgba(251, 191, 36, 0.3);\n      --warning-text: #fbbf24;\n      --progress-bg: #333333;\n      --progress-complete: #4ade80;\n      --back-btn-bg: rgba(255, 255, 255, 0.1);\n      --back-btn-hover: rgba(255, 255, 255, 0.15);\n    }\n\n    @media (prefers-color-scheme: dark) {\n      :host(:not([data-theme=\"light\"])) {\n        --bg-gradient-start: #111319;\n        --bg-gradient-end: #111319;\n        --text-primary: #ffffff;\n        --text-secondary: #a0a0a0;\n        --text-muted: #888888;\n        --tile-bg: rgba(255, 255, 255, 0.05);\n        --tile-border: rgba(255, 255, 255, 0.1);\n        --tile-hover-bg: rgba(255, 255, 255, 0.08);\n        --tile-selected-bg: rgba(102, 126, 234, 0.15);\n        --tile-selected-border: #667eea;\n        --tile-selected-shadow: rgba(102, 126, 234, 0.2);\n        --summary-bg: rgba(255, 255, 255, 0.05);\n        --summary-item-bg: rgba(102, 126, 234, 0.2);\n        --summary-item-text: #a5b4fc;\n        --btn-secondary-bg: rgba(255, 255, 255, 0.1);\n        --btn-secondary-hover: rgba(255, 255, 255, 0.15);\n        --btn-secondary-text: #ffffff;\n        --warning-bg: rgba(251, 191, 36, 0.1);\n        --warning-border: rgba(251, 191, 36, 0.3);\n        --warning-text: #fbbf24;\n        --progress-bg: #333333;\n        --progress-complete: #4ade80;\n        --back-btn-bg: rgba(255, 255, 255, 0.1);\n        --back-btn-hover: rgba(255, 255, 255, 0.15);\n      }\n    }\n\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n\n    .installer-body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;\n      background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);\n      min-height: 100vh;\n      color: var(--text-primary);\n      padding: 16px;\n      transition: background 0.3s ease, color 0.3s ease;\n    }\n\n    .container {\n      max-width: 600px;\n      margin: 0 auto;\n      position: relative;\n    }\n\n    .top-bar {\n      display: flex;\n      align-items: center;\n      margin-bottom: 16px;\n      min-height: 32px;\n    }\n\n    .back-btn {\n      display: none;\n      align-items: center;\n      gap: 4px;\n      padding: 6px 12px;\n      border: none;\n      border-radius: 6px;\n      background: var(--back-btn-bg);\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .back-btn:hover {\n      background: var(--back-btn-hover);\n      color: var(--text-primary);\n    }\n\n    .back-btn.visible {\n      display: flex;\n    }\n\n    .back-btn svg {\n      width: 14px;\n      height: 14px;\n    }\n\n    .header {\n      text-align: center;\n      margin-bottom: 20px;\n    }\n\n    .header h3 {\n      font-size: 1.4rem;\n      font-weight: 600;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .progress-bar {\n      display: flex;\n      justify-content: center;\n      gap: 8px;\n      margin-bottom: 24px;\n    }\n\n    .progress-step {\n      width: 32px;\n      height: 4px;\n      background: var(--progress-bg);\n      border-radius: 2px;\n      transition: all 0.3s ease;\n    }\n\n    .progress-step.active {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    }\n\n    .progress-step.completed {\n      background: var(--progress-complete);\n    }\n\n    .step {\n      display: none;\n      animation: fadeIn 0.4s ease;\n    }\n\n    .step.active {\n      display: block;\n    }\n\n    @keyframes fadeIn {\n      from {\n        opacity: 0;\n        transform: translateY(10px);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n    .step-header {\n      text-align: center;\n      margin-bottom: 16px;\n    }\n\n    .step-number {\n      display: none;\n    }\n\n    .step-title {\n      font-size: 1.1rem;\n      font-weight: 600;\n      margin-bottom: 4px;\n      color: var(--text-primary);\n    }\n\n    .step-description {\n      color: var(--text-muted);\n      font-size: 0.85rem;\n    }\n\n    .tiles {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 12px;\n    }\n\n    .tiles.three-col {\n      grid-template-columns: repeat(3, 1fr);\n    }\n\n    .tile {\n      background: var(--tile-bg);\n      border: 2px solid var(--tile-border);\n      border-radius: 12px;\n      padding: 20px 16px;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      text-align: center;\n    }\n\n    .tile:hover {\n      background: var(--tile-hover-bg);\n      border-color: rgba(102, 126, 234, 0.5);\n      transform: translateY(-2px);\n    }\n\n    .tile.selected {\n      background: var(--tile-selected-bg);\n      border-color: var(--tile-selected-border);\n      box-shadow: 0 0 20px var(--tile-selected-shadow);\n    }\n\n    .tile-icon {\n      font-size: 2rem;\n      margin-bottom: 10px;\n      display: block;\n    }\n\n    .tile-icon img {\n      width: 48px;\n      height: 48px;\n      object-fit: contain;\n    }\n\n    .tile-title {\n      font-weight: 600;\n      font-size: 0.95rem;\n      margin-bottom: 4px;\n      color: var(--text-primary);\n    }\n\n    .tile-description {\n      color: var(--text-muted);\n      font-size: 0.75rem;\n      line-height: 1.4;\n    }\n\n    .summary {\n      background: var(--summary-bg);\n      border-radius: 12px;\n      padding: 16px;\n      margin-bottom: 20px;\n    }\n\n    .summary-title {\n      font-size: 0.8rem;\n      color: var(--text-muted);\n      margin-bottom: 10px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .summary-items {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 8px;\n    }\n\n    .summary-item {\n      background: var(--summary-item-bg);\n      color: var(--summary-item-text);\n      padding: 6px 12px;\n      border-radius: 20px;\n      font-size: 0.8rem;\n      font-weight: 500;\n    }\n\n    .install-section {\n      text-align: center;\n    }\n\n    .install-btn {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      border: none;\n      padding: 14px 32px;\n      border-radius: 8px;\n      font-size: 1rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);\n    }\n\n    .install-btn:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n\n    .install-btn:active {\n      transform: translateY(0);\n    }\n\n    .btn-restart {\n      background: var(--btn-secondary-bg);\n      color: var(--btn-secondary-text);\n      border: none;\n      padding: 10px 20px;\n      border-radius: 8px;\n      font-size: 0.85rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      width: 100%;\n      margin-top: 16px;\n    }\n\n    .btn-restart:hover {\n      background: var(--btn-secondary-hover);\n    }\n\n    .browser-warning {\n      background: var(--warning-bg);\n      border: 1px solid var(--warning-border);\n      border-radius: 8px;\n      padding: 12px 16px;\n      margin-top: 16px;\n      font-size: 0.8rem;\n      color: var(--warning-text);\n      display: none;\n    }\n\n    .browser-warning.show {\n      display: block;\n    }\n\n    .unsupported-msg {\n      color: var(--warning-text);\n      font-size: 0.9rem;\n      padding: 12px 16px;\n      background: var(--warning-bg);\n      border-radius: 8px;\n      border: 1px solid var(--warning-border);\n    }\n\n    @media (max-width: 500px) {\n      .tiles {\n        grid-template-columns: 1fr;\n      }\n      .tiles.three-col {\n        grid-template-columns: 1fr;\n      }\n      .tile {\n        padding: 16px;\n      }\n    }\n  \n:host{display:block;color:var(--es-ink);font-family:inherit}\n    :host,:host([data-theme=\"dark\"]){--text-primary:var(--es-ink);--text-secondary:var(--es-muted);--text-muted:var(--es-muted);--tile-selected-border:var(--es-accent);--summary-item-text:var(--es-ink)}\n    .installer-body{background:transparent;padding:24px 0;min-height:0;margin:0;color:var(--es-ink);font-family:inherit}\n    .container{max-width:none;margin:0;padding:0;box-shadow:none;background:transparent}\n    .tile:focus-visible,button:focus-visible{outline:3px solid var(--es-accent);outline-offset:3px}\n    h3{font-size:22px} .step.active{animation:none}\n    .install-btn{background:var(--es-accent);color:var(--es-bg);box-shadow:none}\n    .inline-load-error{color:var(--es-ink);padding:12px;border:1px solid var(--es-line)}\n    @media(max-width:600px){.tiles,.tiles.three-col{grid-template-columns:1fr!important}}\n    </style><div class=\"installer-body\">\n  <div class=\"container\">\n    <div class=\"top-bar\">\n      <button class=\"back-btn\" id=\"backBtn\" data-action=\"0\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n          <path fill-rule=\"evenodd\" d=\"M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z\" clip-rule=\"evenodd\" />\n        </svg>\n        Back\n      </button>\n    </div>\n\n    <div class=\"header\">\n      <h3>Everything Presence One</h3>\n    </div>\n\n    <div class=\"progress-bar\" id=\"progressBar\">\n      <!-- Progress steps will be dynamically generated -->\n    </div>\n\n    <!-- Step 1: Platform -->\n    <div class=\"step active\" data-step=\"1\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Platform</div>\n        <div class=\"step-description\">Which platform are you using?</div>\n      </div>\n      <div class=\"tiles three-col\">\n        <div class=\"tile\" data-action=\"1\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/home-assistant.png\" alt=\"Home Assistant\"></span>\n          <div class=\"tile-title\">Home Assistant</div>\n          <div class=\"tile-description\">Full features and customization</div>\n        </div>\n        <div class=\"tile\" data-action=\"2\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/homey.png\" alt=\"Homey\"></span>\n          <div class=\"tile-title\">Homey</div>\n          <div class=\"tile-description\">Athom Homey integration</div>\n        </div>\n        <div class=\"tile\" data-action=\"3\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/smartthings.png\" alt=\"SmartThings\"></span>\n          <div class=\"tile-title\">SmartThings</div>\n          <div class=\"tile-description\">Samsung SmartThings integration</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 2: Hardware Revision -->\n    <div class=\"step\" data-step=\"2\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Hardware Revision</div>\n        <div class=\"step-description\">Check the sticker on the back of your device</div>\n      </div>\n      <div class=\"tiles three-col\">\n        <div class=\"tile\" data-action=\"4\">\n          <span class=\"tile-icon\">&#10024;</span>\n          <div class=\"tile-title\">Rev 1.6</div>\n          <div class=\"tile-description\">April 2025 onwards</div>\n        </div>\n        <div class=\"tile\" data-action=\"5\">\n          <span class=\"tile-icon\">&#128190;</span>\n          <div class=\"tile-title\">Rev 1.5</div>\n          <div class=\"tile-description\">March 2024 - April 2025</div>\n        </div>\n        <div class=\"tile\" data-action=\"6\">\n          <span class=\"tile-icon\">&#128230;</span>\n          <div class=\"tile-title\">Rev 1.3/1.4</div>\n          <div class=\"tile-description\">October 2022 - February 2024</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 3: Sensor Type -->\n    <div class=\"step\" data-step=\"3\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">mmWave Sensor</div>\n        <div class=\"step-description\">Which mmWave sensor does your device have?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"7\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/sen0609.png\" alt=\"SEN0609\"></span>\n          <div class=\"tile-title\">SEN0609</div>\n          <div class=\"tile-description\">Purchased after March 2024</div>\n        </div>\n        <div class=\"tile\" data-action=\"8\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/sen0395.png\" alt=\"SEN0395\"></span>\n          <div class=\"tile-title\">SEN0395</div>\n          <div class=\"tile-description\">Purchased before March 2024</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 4: Bluetooth Proxy (HA only) -->\n    <div class=\"step\" data-step=\"4\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Bluetooth Proxy</div>\n        <div class=\"step-description\">Enable Bluetooth proxy for Home Assistant?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"9\">\n          <span class=\"tile-icon\">&#128225;</span>\n          <div class=\"tile-title\">Yes, Enable</div>\n          <div class=\"tile-description\">Proxy Bluetooth devices to Home Assistant</div>\n        </div>\n        <div class=\"tile\" data-action=\"10\">\n          <span class=\"tile-icon\">&#9889;</span>\n          <div class=\"tile-title\">No, Disable</div>\n          <div class=\"tile-description\">Recommended if you have WiFi connectivity issues</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 5: CO2 Module (HA only) -->\n    <div class=\"step\" data-step=\"5\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">CO2 Module</div>\n        <div class=\"step-description\">Do you have the CO2 expansion module?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"11\">\n          <span class=\"tile-icon\">&#127811;</span>\n          <div class=\"tile-title\">Yes, I Have It</div>\n          <div class=\"tile-description\">Enable CO2 sensor support</div>\n        </div>\n        <div class=\"tile\" data-action=\"12\">\n          <span class=\"tile-icon\">&#10060;</span>\n          <div class=\"tile-title\">No Module</div>\n          <div class=\"tile-description\">I don't have the CO2 module</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 6: Firmware Channel (HA only) -->\n    <div class=\"step\" data-step=\"6\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Firmware Channel</div>\n        <div class=\"step-description\">Which firmware channel do you want?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"13\">\n          <span class=\"tile-icon\">&#9989;</span>\n          <div class=\"tile-title\">Stable</div>\n          <div class=\"tile-description\">Recommended for most users</div>\n        </div>\n        <div class=\"tile\" data-action=\"14\">\n          <span class=\"tile-icon\">&#128300;</span>\n          <div class=\"tile-title\">Beta</div>\n          <div class=\"tile-description\">Latest features, may have bugs</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Final Step: Install -->\n    <div class=\"step\" data-step=\"final\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Ready to Install</div>\n        <div class=\"step-description\">Connect your device via USB and click install</div>\n      </div>\n\n      <div class=\"summary\">\n        <div class=\"summary-title\">Your Configuration</div>\n        <div class=\"summary-items\" id=\"summaryItems\"></div>\n      </div>\n\n      <div class=\"install-section\">\n        <esp-web-install-button id=\"installButton\">\n          <button class=\"install-btn\" slot=\"activate\">Install Firmware</button>\n          <span class=\"unsupported-msg\" slot=\"unsupported\">Your browser doesn't support Web Serial. Please use Chrome or Edge on desktop.</span>\n          <span class=\"unsupported-msg\" slot=\"not-allowed\">Serial access denied. Please allow access to continue.</span>\n        </esp-web-install-button>\n\n        <div class=\"browser-warning\" id=\"browserWarning\">\n          Web Serial is only supported in Chrome, Edge, and Opera browsers on desktop.\n        </div>\n      </div>\n\n      <button class=\"btn-restart\" data-action=\"15\">Start Over</button>\n    </div>\n  </div>\n\n  </div>";
        const document={querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),getElementById:id=>root.getElementById(id),createElement:tag=>this.ownerDocument.createElement(tag)};
        
    const supportWifiPower = new URLSearchParams(window.location.search).get('wifi_power') === '11';
    const powerPanel = document.createElement('div');
    powerPanel.hidden = true;
    powerPanel.innerHTML = '<label><input type="checkbox" id="wifi11"> Reduced Wi-Fi power — 11 dBm (support only)</label><p style="margin:8px 0;font-size:0.85rem">Use only when advised by support. This may reduce Wi-Fi range.</p>';
    const finalStep = root.querySelector('.step[data-step="final"]');
    finalStep.querySelector('.install-section').before(powerPanel);
    const powerCheckbox = powerPanel.querySelector('input');
    const manifestStatus = document.createElement('p');
    manifestStatus.setAttribute('role', 'status');
    finalStep.querySelector('.install-section').append(manifestStatus);
    let manifestCheck = 0;
    let checkedManifest = null;
    let toolsReady = false;
    powerCheckbox.addEventListener('change', generateManifest);

    const BASE_URL = 'https://everythingsmarthome.github.io/everything-presence-one/';

    let currentStep = 1;
    let totalSteps = 6;
    let stepSequence = [1, 2, 3, 4, 5, 6, 'final'];

    const selections = {
      platform: null,     // ha | st
      revision: null,     // rev1-3 | rev1-5 | rev1-6
      sensor: null,       // sen0395 | sen0609
      bluetooth: null,    // ble | noble
      module: null,       // co2 | nomodule
      stability: null     // stable | beta
    };

    function updateStepSequence() {
      if (selections.platform === 'st') {
        // SmartThings: Platform -> Sensor -> Revision -> Install
        // All sensor and revision combinations are valid
        stepSequence = [1, 3, 2, 'final'];
        totalSteps = 3;
      } else {
        // Home Assistant: All steps, but sensor choice depends on revision
        if (selections.revision === 'rev1-3') {
          // Rev 1.3 only has SEN0395, no sensor choice needed
          stepSequence = [1, 2, 4, 5, 6, 'final'];
          totalSteps = 5;
          selections.sensor = 'sen0395';
        } else if (selections.sensor === 'sen0609') {
          // SEN0609 has no beta variants, skip stability choice
          stepSequence = [1, 2, 3, 4, 5, 'final'];
          totalSteps = 5;
          selections.stability = 'stable';
        } else {
          stepSequence = [1, 2, 3, 4, 5, 6, 'final'];
          totalSteps = 6;
        }
      }
      updateProgressBar();
    }

    function updateProgressBar() {
      const progressBar = document.getElementById('progressBar');
      progressBar.innerHTML = '';

      const numSteps = stepSequence.filter(s => s !== 'final').length + 1; // +1 for install

      for (let i = 0; i < numSteps; i++) {
        const step = document.createElement('div');
        step.className = 'progress-step';
        step.dataset.index = i;

        const currentIndex = stepSequence.indexOf(currentStep);
        if (currentStep === 'final') {
          step.classList.add('completed');
        } else if (i < currentIndex) {
          step.classList.add('completed');
        } else if (i === currentIndex) {
          step.classList.add('active');
        }

        progressBar.appendChild(step);
      }
    }

    function updateBackButton() {
      const backBtn = document.getElementById('backBtn');
      const currentIndex = stepSequence.indexOf(currentStep);
      if (currentIndex > 0) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }

    function selectOption(step, value, element) {
      const tiles = element.parentElement.querySelectorAll('.tile');
      tiles.forEach(t => t.classList.remove('selected'));
      element.classList.add('selected');

      // Store selection
      switch(step) {
        case 1: selections.platform = value; selections.platformLabel = element.querySelector('.tile-title').textContent; break;
        case 2: selections.revision = value; break;
        case 3: selections.sensor = value; break;
        case 4: selections.bluetooth = value; break;
        case 5: selections.module = value; break;
        case 6: selections.stability = value; break;
      }

      // Update step sequence after platform, revision, or sensor selection
      if (step === 1 || step === 2 || step === 3) {
        updateStepSequence();
      }


      setTimeout(() => {
        nextStep();
      }, 200);
    }

    function nextStep() {
      const currentIndex = stepSequence.indexOf(currentStep);
      const nextStepValue = stepSequence[currentIndex + 1];

      document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
      document.querySelector(`.step[data-step="${nextStepValue}"]`).classList.add('active');

      currentStep = nextStepValue;
      updateProgressBar();
      updateBackButton();

      if (currentStep === 'final') {
        generateManifest();
      }
    }

    function goBack() {
      powerCheckbox.checked = false;
      manifestCheck++;
      checkedManifest = null;
      const currentIndex = stepSequence.indexOf(currentStep);
      if (currentIndex <= 0) return;

      const prevStepValue = stepSequence[currentIndex - 1];

      document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
      document.querySelector(`.step[data-step="${prevStepValue}"]`).classList.add('active');

      currentStep = prevStepValue;
      updateProgressBar();
      updateBackButton();
    }

    function generateManifest() {
      let manifestFilename = '';
      const summaryItems = [];

      if (selections.platform === 'st') {
        // SmartThings manifest pattern
        // everything-presence-one-st-{sensor}-nomodule-ble-{rev}-stable-manifest.json
        // Naming convention:
        // - If sensor not specified in filename = SEN0395 (default)
        // - If revision not specified in filename = Rev 1.5 (default)
        const sensor = selections.sensor || 'sen0395';
        let manifestRev = 'rev1-5'; // default

        // SEN0395 always uses rev1-5 manifest (works for all revisions)
        // SEN0609 uses rev1-5 for 1.3/1.5, rev1-6 for 1.6
        if (sensor === 'sen0609' && selections.revision === 'rev1-6') {
          manifestRev = 'rev1-6';
        }

        manifestFilename = `everything-presence-one-st-${sensor}-nomodule-ble-${manifestRev}-stable-manifest.json`;

        summaryItems.push('SmartThings');
        summaryItems.push(sensor === 'sen0609' ? 'SEN0609' : 'SEN0395');
        summaryItems.push(selections.revision === 'rev1-6' ? 'Rev 1.6' : selections.revision === 'rev1-5' ? 'Rev 1.5' : 'Rev 1.3/1.4');
      } else {
        // Home Assistant manifest pattern
        // everything-presence-one-ha-{sensor}-{module}-{ble}-{rev}-{stability}-manifest.json
        const sensor = selections.sensor || 'sen0395';
        const module = selections.module;
        const ble = selections.bluetooth;
        const rev = selections.revision;
        const stability = selections.stability;

        manifestFilename = `everything-presence-one-ha-${sensor}-${module}-${ble}-${rev}-${stability}-manifest.json`;

        summaryItems.push(selections.platformLabel || 'Home Assistant');
        summaryItems.push(sensor === 'sen0609' ? 'SEN0609' : 'SEN0395');
        summaryItems.push(rev === 'rev1-6' ? 'Rev 1.6' : rev === 'rev1-5' ? 'Rev 1.5' : 'Rev 1.3/1.4');
        summaryItems.push(ble === 'ble' ? 'Bluetooth Enabled' : 'No Bluetooth');
        summaryItems.push(module === 'co2' ? 'CO2 Module' : 'No CO2 Module');
        summaryItems.push(stability === 'stable' ? 'Stable' : 'Beta');
      }

      const allowPower = supportWifiPower && selections.platform === 'ha' && selections.stability === 'stable';
      powerPanel.hidden = !allowPower;
      if (!allowPower) powerCheckbox.checked = false;
      if (allowPower && powerCheckbox.checked) {
        manifestFilename = manifestFilename.replace('-stable-manifest.json', '-stable-wifi11-manifest.json');
        summaryItems.push('Wi-Fi power: 11 dBm');
      }
      const manifestUrl = `${BASE_URL}${manifestFilename}`;
      const check = ++manifestCheck;
      checkedManifest = null;
      const install = root.querySelector('.install-btn');
      install.disabled = true;
      manifestStatus.textContent = 'Checking firmware availability…';
      fetch(manifestUrl, {cache: 'no-cache'}).then(async response => {
        if (!response.ok) throw new Error('Firmware unavailable');
        const manifest = await response.json();
        if (!manifest.builds?.some(build => build.chipFamily === 'ESP32' && build.parts?.length)) throw new Error('Invalid firmware manifest');
        if (check !== manifestCheck) return;
        checkedManifest = manifestUrl;
        install.disabled = !toolsReady;
        manifestStatus.textContent = '';
      }).catch(() => {
        if (check !== manifestCheck) return;
        install.disabled = true;
        manifestStatus.textContent = 'This firmware is not available yet. Contact support or choose standard firmware.';
      });
      document.getElementById('installButton').setAttribute('manifest', manifestUrl);

      // Update summary display
      const summaryContainer = document.getElementById('summaryItems');
      summaryContainer.innerHTML = '';
      summaryItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'summary-item';
        span.textContent = item;
        summaryContainer.appendChild(span);
      });

      console.log('Manifest URL:', manifestUrl);
    }

    function restart() {
      powerCheckbox.checked = false;
      powerPanel.hidden = true;
      manifestCheck++;
      checkedManifest = null;
      selections.platform = null;
      selections.revision = null;
      selections.sensor = null;
      selections.bluetooth = null;
      selections.module = null;
      selections.stability = null;

      currentStep = 1;
      stepSequence = [1, 2, 3, 4, 5, 6, 'final'];
      totalSteps = 6;

      document.querySelectorAll('.tile').forEach(t => {
        t.classList.remove('selected');
        t.style.display = '';
      });
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.querySelector('.step[data-step="1"]').classList.add('active');

      // Reset grid columns
      const threeColGrid = document.querySelector('.tiles.three-col');
      if (threeColGrid) {
        threeColGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }

      updateProgressBar();
      updateBackButton();
    }

    if (!('serial' in navigator)) {
      document.getElementById('browserWarning').classList.add('show');
    }

    // Initialize
    updateProgressBar();
    updateBackButton();
  
        {const node=root.querySelector('[data-action="0"]');
        const activate=()=>{goBack();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="1"]');
        const activate=()=>{selectOption(1, 'ha', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="2"]');
        const activate=()=>{selectOption(1, 'ha', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="3"]');
        const activate=()=>{selectOption(1, 'st', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="4"]');
        const activate=()=>{selectOption(2, 'rev1-6', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="5"]');
        const activate=()=>{selectOption(2, 'rev1-5', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="6"]');
        const activate=()=>{selectOption(2, 'rev1-3', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="7"]');
        const activate=()=>{selectOption(3, 'sen0609', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="8"]');
        const activate=()=>{selectOption(3, 'sen0395', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="9"]');
        const activate=()=>{selectOption(4, 'ble', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="10"]');
        const activate=()=>{selectOption(4, 'noble', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="11"]');
        const activate=()=>{selectOption(5, 'co2', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="12"]');
        const activate=()=>{selectOption(5, 'nomodule', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="13"]');
        const activate=()=>{selectOption(6, 'stable', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="14"]');
        const activate=()=>{selectOption(6, 'beta', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="15"]');
        const activate=()=>{restart();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
        const install=root.querySelector('.install-btn');install.disabled=true;
        firmwareTools.then(()=>{toolsReady=true;install.disabled=!checkedManifest;}).catch(()=>{
          const note=document.createElement('p');note.className='inline-load-error';
          note.textContent='The firmware tool could not load. Check your internet connection and reload the page.';
          install.after(note);
        });
      }
    });
    
customElements.define('es-installer-lite',class extends HTMLElement {
      connectedCallback(){
        if(this.shadowRoot)return;
        const root=this.attachShadow({mode:'open'});
        root.innerHTML="<style>\n    :host {\n      /* Light mode (default) */\n      --bg-gradient-start: #FFFFFF;\n      --bg-gradient-end: #FFFFFF;\n      --text-primary: #1e293b;\n      --text-secondary: #64748b;\n      --text-muted: #94a3b8;\n      --tile-bg: rgba(0, 0, 0, 0.03);\n      --tile-border: rgba(0, 0, 0, 0.08);\n      --tile-hover-bg: rgba(0, 0, 0, 0.05);\n      --tile-selected-bg: rgba(102, 126, 234, 0.1);\n      --tile-selected-border: #667eea;\n      --tile-selected-shadow: rgba(102, 126, 234, 0.15);\n      --summary-bg: rgba(0, 0, 0, 0.03);\n      --summary-item-bg: rgba(102, 126, 234, 0.1);\n      --summary-item-text: #5b6eae;\n      --btn-secondary-bg: rgba(0, 0, 0, 0.05);\n      --btn-secondary-hover: rgba(0, 0, 0, 0.08);\n      --btn-secondary-text: #475569;\n      --warning-bg: rgba(251, 191, 36, 0.1);\n      --warning-border: rgba(251, 191, 36, 0.3);\n      --warning-text: #b45309;\n      --progress-bg: #e2e8f0;\n      --progress-complete: #4ade80;\n      --back-btn-bg: rgba(0, 0, 0, 0.05);\n      --back-btn-hover: rgba(0, 0, 0, 0.1);\n      --expand-btn-bg: rgba(0, 0, 0, 0.03);\n      --expand-btn-hover: rgba(0, 0, 0, 0.06);\n      --expand-btn-border: rgba(0, 0, 0, 0.08);\n    }\n\n    :host([data-theme=\"dark\"]) {\n      --bg-gradient-start: #111319;\n      --bg-gradient-end: #111319;\n      --text-primary: #ffffff;\n      --text-secondary: #a0a0a0;\n      --text-muted: #888888;\n      --tile-bg: rgba(255, 255, 255, 0.05);\n      --tile-border: rgba(255, 255, 255, 0.1);\n      --tile-hover-bg: rgba(255, 255, 255, 0.08);\n      --tile-selected-bg: rgba(102, 126, 234, 0.15);\n      --tile-selected-border: #667eea;\n      --tile-selected-shadow: rgba(102, 126, 234, 0.2);\n      --summary-bg: rgba(255, 255, 255, 0.05);\n      --summary-item-bg: rgba(102, 126, 234, 0.2);\n      --summary-item-text: #a5b4fc;\n      --btn-secondary-bg: rgba(255, 255, 255, 0.1);\n      --btn-secondary-hover: rgba(255, 255, 255, 0.15);\n      --btn-secondary-text: #ffffff;\n      --warning-bg: rgba(251, 191, 36, 0.1);\n      --warning-border: rgba(251, 191, 36, 0.3);\n      --warning-text: #fbbf24;\n      --progress-bg: #333333;\n      --progress-complete: #4ade80;\n      --back-btn-bg: rgba(255, 255, 255, 0.1);\n      --back-btn-hover: rgba(255, 255, 255, 0.15);\n      --expand-btn-bg: rgba(255, 255, 255, 0.05);\n      --expand-btn-hover: rgba(255, 255, 255, 0.08);\n      --expand-btn-border: rgba(255, 255, 255, 0.1);\n    }\n\n    @media (prefers-color-scheme: dark) {\n      :host(:not([data-theme=\"light\"])) {\n        --bg-gradient-start: #111319;\n        --bg-gradient-end: #111319;\n        --text-primary: #ffffff;\n        --text-secondary: #a0a0a0;\n        --text-muted: #888888;\n        --tile-bg: rgba(255, 255, 255, 0.05);\n        --tile-border: rgba(255, 255, 255, 0.1);\n        --tile-hover-bg: rgba(255, 255, 255, 0.08);\n        --tile-selected-bg: rgba(102, 126, 234, 0.15);\n        --tile-selected-border: #667eea;\n        --tile-selected-shadow: rgba(102, 126, 234, 0.2);\n        --summary-bg: rgba(255, 255, 255, 0.05);\n        --summary-item-bg: rgba(102, 126, 234, 0.2);\n        --summary-item-text: #a5b4fc;\n        --btn-secondary-bg: rgba(255, 255, 255, 0.1);\n        --btn-secondary-hover: rgba(255, 255, 255, 0.15);\n        --btn-secondary-text: #ffffff;\n        --warning-bg: rgba(251, 191, 36, 0.1);\n        --warning-border: rgba(251, 191, 36, 0.3);\n        --warning-text: #fbbf24;\n        --progress-bg: #333333;\n        --progress-complete: #4ade80;\n        --back-btn-bg: rgba(255, 255, 255, 0.1);\n        --back-btn-hover: rgba(255, 255, 255, 0.15);\n        --expand-btn-bg: rgba(255, 255, 255, 0.05);\n        --expand-btn-hover: rgba(255, 255, 255, 0.08);\n        --expand-btn-border: rgba(255, 255, 255, 0.1);\n      }\n    }\n\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n\n    .installer-body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;\n      background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);\n      min-height: 100vh;\n      color: var(--text-primary);\n      padding: 16px;\n      transition: background 0.3s ease, color 0.3s ease;\n    }\n\n    .container {\n      max-width: 600px;\n      margin: 0 auto;\n      position: relative;\n    }\n\n    .top-bar {\n      display: flex;\n      align-items: center;\n      margin-bottom: 16px;\n      min-height: 32px;\n    }\n\n    .back-btn {\n      display: none;\n      align-items: center;\n      gap: 4px;\n      padding: 6px 12px;\n      border: none;\n      border-radius: 6px;\n      background: var(--back-btn-bg);\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .back-btn:hover {\n      background: var(--back-btn-hover);\n      color: var(--text-primary);\n    }\n\n    .back-btn.visible {\n      display: flex;\n    }\n\n    .back-btn svg {\n      width: 14px;\n      height: 14px;\n    }\n\n    .header {\n      text-align: center;\n      margin-bottom: 20px;\n    }\n\n    .header h3 {\n      font-size: 1.4rem;\n      font-weight: 600;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .progress-bar {\n      display: flex;\n      justify-content: center;\n      gap: 8px;\n      margin-bottom: 24px;\n    }\n\n    .progress-step {\n      width: 32px;\n      height: 4px;\n      background: var(--progress-bg);\n      border-radius: 2px;\n      transition: all 0.3s ease;\n    }\n\n    .progress-step.active {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    }\n\n    .progress-step.completed {\n      background: var(--progress-complete);\n    }\n\n    .step {\n      display: none;\n      animation: fadeIn 0.4s ease;\n    }\n\n    .step.active {\n      display: block;\n    }\n\n    @keyframes fadeIn {\n      from {\n        opacity: 0;\n        transform: translateY(10px);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n    .step-header {\n      text-align: center;\n      margin-bottom: 16px;\n    }\n\n    .step-title {\n      font-size: 1.1rem;\n      font-weight: 600;\n      margin-bottom: 4px;\n      color: var(--text-primary);\n    }\n\n    .step-description {\n      color: var(--text-muted);\n      font-size: 0.85rem;\n    }\n\n    .tiles {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 12px;\n    }\n\n    .tiles.single {\n      grid-template-columns: 1fr;\n      max-width: 300px;\n      margin: 0 auto;\n    }\n\n    .tile {\n      background: var(--tile-bg);\n      border: 2px solid var(--tile-border);\n      border-radius: 12px;\n      padding: 20px 16px;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      text-align: center;\n    }\n\n    .tile:hover {\n      background: var(--tile-hover-bg);\n      border-color: rgba(102, 126, 234, 0.5);\n      transform: translateY(-2px);\n    }\n\n    .tile.selected {\n      background: var(--tile-selected-bg);\n      border-color: var(--tile-selected-border);\n      box-shadow: 0 0 20px var(--tile-selected-shadow);\n    }\n\n    .tile.recommended {\n      border-color: rgba(74, 222, 128, 0.5);\n    }\n\n    .tile.recommended:hover {\n      border-color: rgba(74, 222, 128, 0.8);\n    }\n\n    .tile-icon {\n      font-size: 2rem;\n      margin-bottom: 10px;\n      display: block;\n    }\n\n    .tile-icon img {\n      width: 48px;\n      height: 48px;\n      object-fit: contain;\n    }\n\n    .tile-title {\n      font-weight: 600;\n      font-size: 0.95rem;\n      margin-bottom: 4px;\n      color: var(--text-primary);\n    }\n\n    .tile-description {\n      color: var(--text-muted);\n      font-size: 0.75rem;\n      line-height: 1.4;\n    }\n\n    .tile-badge {\n      display: inline-block;\n      background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);\n      color: white;\n      font-size: 0.65rem;\n      font-weight: 600;\n      padding: 2px 8px;\n      border-radius: 10px;\n      margin-bottom: 8px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .expand-section {\n      margin-top: 16px;\n    }\n\n    .expand-btn {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 8px;\n      width: 100%;\n      padding: 12px 16px;\n      background: var(--expand-btn-bg);\n      border: 1px dashed var(--expand-btn-border);\n      border-radius: 8px;\n      color: var(--text-muted);\n      font-size: 0.85rem;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .expand-btn:hover {\n      background: var(--expand-btn-hover);\n      color: var(--text-secondary);\n    }\n\n    .expand-btn svg {\n      width: 16px;\n      height: 16px;\n      transition: transform 0.3s ease;\n    }\n\n    .expand-btn.expanded svg {\n      transform: rotate(180deg);\n    }\n\n    .other-sensors {\n      display: none;\n      margin-top: 12px;\n      animation: fadeIn 0.3s ease;\n    }\n\n    .other-sensors.visible {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 12px;\n    }\n\n    .other-sensors .tile {\n      padding: 16px 12px;\n    }\n\n    .other-sensors .tile-icon {\n      font-size: 1.5rem;\n      margin-bottom: 8px;\n    }\n\n    .other-sensors .tile-icon img {\n      width: 36px;\n      height: 36px;\n    }\n\n    .other-sensors .tile-title {\n      font-size: 0.85rem;\n    }\n\n    .other-sensors .tile-description {\n      font-size: 0.7rem;\n    }\n\n    .summary {\n      background: var(--summary-bg);\n      border-radius: 12px;\n      padding: 16px;\n      margin-bottom: 20px;\n    }\n\n    .summary-title {\n      font-size: 0.8rem;\n      color: var(--text-muted);\n      margin-bottom: 10px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .summary-items {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 8px;\n    }\n\n    .summary-item {\n      background: var(--summary-item-bg);\n      color: var(--summary-item-text);\n      padding: 6px 12px;\n      border-radius: 20px;\n      font-size: 0.8rem;\n      font-weight: 500;\n    }\n\n    .install-section {\n      text-align: center;\n    }\n\n    .install-btn {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      border: none;\n      padding: 14px 32px;\n      border-radius: 8px;\n      font-size: 1rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);\n    }\n\n    .install-btn:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n\n    .install-btn:active {\n      transform: translateY(0);\n    }\n\n    .btn-restart {\n      background: var(--btn-secondary-bg);\n      color: var(--btn-secondary-text);\n      border: none;\n      padding: 10px 20px;\n      border-radius: 8px;\n      font-size: 0.85rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      width: 100%;\n      margin-top: 16px;\n    }\n\n    .btn-restart:hover {\n      background: var(--btn-secondary-hover);\n    }\n\n    .browser-warning {\n      background: var(--warning-bg);\n      border: 1px solid var(--warning-border);\n      border-radius: 8px;\n      padding: 12px 16px;\n      margin-top: 16px;\n      font-size: 0.8rem;\n      color: var(--warning-text);\n      display: none;\n    }\n\n    .browser-warning.show {\n      display: block;\n    }\n\n    .unsupported-msg {\n      color: var(--warning-text);\n      font-size: 0.9rem;\n      padding: 12px 16px;\n      background: var(--warning-bg);\n      border-radius: 8px;\n      border: 1px solid var(--warning-border);\n    }\n\n    @media (max-width: 500px) {\n      .tiles {\n        grid-template-columns: 1fr;\n      }\n      .other-sensors.visible {\n        grid-template-columns: 1fr;\n      }\n      .tile {\n        padding: 16px;\n      }\n    }\n  \n:host{display:block;color:var(--es-ink);font-family:inherit}\n    :host,:host([data-theme=\"dark\"]){--text-primary:var(--es-ink);--text-secondary:var(--es-muted);--text-muted:var(--es-muted);--tile-selected-border:var(--es-accent);--summary-item-text:var(--es-ink)}\n    .installer-body{background:transparent;padding:24px 0;min-height:0;margin:0;color:var(--es-ink);font-family:inherit}\n    .container{max-width:none;margin:0;padding:0;box-shadow:none;background:transparent}\n    .tile:focus-visible,button:focus-visible{outline:3px solid var(--es-accent);outline-offset:3px}\n    h3{font-size:22px} .step.active{animation:none}\n    .install-btn{background:var(--es-accent);color:var(--es-bg);box-shadow:none}\n    .inline-load-error{color:var(--es-ink);padding:12px;border:1px solid var(--es-line)}\n    @media(max-width:600px){.tiles,.tiles.three-col{grid-template-columns:1fr!important}}\n    </style><div class=\"installer-body\">\n  <div class=\"container\">\n    <div class=\"top-bar\">\n      <button class=\"back-btn\" id=\"backBtn\" data-action=\"0\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n          <path fill-rule=\"evenodd\" d=\"M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z\" clip-rule=\"evenodd\" />\n        </svg>\n        Back\n      </button>\n    </div>\n\n    <div class=\"header\">\n      <h3>Everything Presence Lite</h3>\n    </div>\n\n    <div class=\"progress-bar\" id=\"progressBar\">\n      <!-- Progress steps will be dynamically generated -->\n    </div>\n\n    <!-- Step 1: Platform -->\n    <div class=\"step active\" data-step=\"1\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Platform</div>\n        <div class=\"step-description\">Which platform are you using?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"1\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/home-assistant.png\" alt=\"Home Assistant\"></span>\n          <div class=\"tile-title\">Home Assistant</div>\n          <div class=\"tile-description\">Full features and customization</div>\n        </div>\n        <div class=\"tile\" data-action=\"2\">\n          <span class=\"tile-icon\"><img src=\"/flash/images/homey.png\" alt=\"Homey\"></span>\n          <div class=\"tile-title\">Homey</div>\n          <div class=\"tile-description\">Athom Homey integration</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 2: Sensor Type -->\n    <div class=\"step\" data-step=\"2\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">mmWave Sensor</div>\n        <div class=\"step-description\">Which mmWave sensor does your device have?</div>\n      </div>\n      <div class=\"tiles single\">\n        <div class=\"tile recommended\" data-action=\"3\">\n          <span class=\"tile-badge\">99% of users</span>\n          <span class=\"tile-icon\"><img src=\"/flash/images/ld2450.png\" alt=\"LD2450\"></span>\n          <div class=\"tile-title\">LD2450</div>\n          <div class=\"tile-description\">Standard EPL sensor with target tracking</div>\n        </div>\n      </div>\n      <div class=\"expand-section\">\n        <button class=\"expand-btn\" id=\"expandBtn\" data-action=\"4\">\n          <span>Other sensors (advanced)</span>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n            <path fill-rule=\"evenodd\" d=\"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z\" clip-rule=\"evenodd\" />\n          </svg>\n        </button>\n        <div class=\"other-sensors\" id=\"otherSensors\">\n          <div class=\"tile\" data-action=\"5\">\n            <span class=\"tile-icon\"><img src=\"/flash/images/ld2410c.png\" alt=\"LD2410\"></span>\n            <div class=\"tile-title\">LD2410</div>\n            <div class=\"tile-description\">HiLink alternative sensor</div>\n          </div>\n          <div class=\"tile\" data-action=\"6\">\n            <span class=\"tile-icon\"><img src=\"/flash/images/seeed-mmwave-lite.png\" alt=\"MR24HPC1\"></span>\n            <div class=\"tile-title\">MR24HPC1</div>\n            <div class=\"tile-description\">Seeed mmWave sensor</div>\n          </div>\n          <div class=\"tile\" data-action=\"7\">\n            <span class=\"tile-icon\"><img src=\"/flash/images/sen0395.png\" alt=\"SEN0395\"></span>\n            <div class=\"tile-title\">SEN0395</div>\n            <div class=\"tile-description\">DFRobot mmWave sensor</div>\n          </div>\n          <div class=\"tile\" data-action=\"8\">\n            <span class=\"tile-icon\"><img src=\"/flash/images/sen0609.png\" alt=\"SEN0609\"></span>\n            <div class=\"tile-title\">SEN0609</div>\n            <div class=\"tile-description\">DFRobot mmWave sensor</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 3: Bluetooth Proxy -->\n    <div class=\"step\" data-step=\"3\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Bluetooth Proxy</div>\n        <div class=\"step-description\">Enable Bluetooth proxy for Home Assistant?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"9\">\n          <span class=\"tile-icon\">&#128225;</span>\n          <div class=\"tile-title\">Yes, Enable</div>\n          <div class=\"tile-description\">Proxy Bluetooth devices to Home Assistant</div>\n        </div>\n        <div class=\"tile\" data-action=\"10\">\n          <span class=\"tile-icon\">&#9889;</span>\n          <div class=\"tile-title\">No, Disable</div>\n          <div class=\"tile-description\">Recommended if you have WiFi connectivity issues</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 4: CO2 Module -->\n    <div class=\"step\" data-step=\"4\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">CO2 Module</div>\n        <div class=\"step-description\">Do you have the CO2 expansion module?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-action=\"11\">\n          <span class=\"tile-icon\">&#127811;</span>\n          <div class=\"tile-title\">Yes, I Have It</div>\n          <div class=\"tile-description\">Enable CO2 sensor support</div>\n        </div>\n        <div class=\"tile\" data-action=\"12\">\n          <span class=\"tile-icon\">&#10060;</span>\n          <div class=\"tile-title\">No Module</div>\n          <div class=\"tile-description\">I don't have the CO2 module</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Final Step: Install -->\n    <div class=\"step\" data-step=\"final\">\n      <div class=\"step-header\">\n        <div class=\"step-title\">Ready to Install</div>\n        <div class=\"step-description\">Connect your device via USB and click install</div>\n      </div>\n\n      <div class=\"summary\">\n        <div class=\"summary-title\">Your Configuration</div>\n        <div class=\"summary-items\" id=\"summaryItems\"></div>\n      </div>\n\n      <div class=\"install-section\">\n        <esp-web-install-button id=\"installButton\">\n          <button class=\"install-btn\" slot=\"activate\">Install Firmware</button>\n          <span class=\"unsupported-msg\" slot=\"unsupported\">Your browser doesn't support Web Serial. Please use Chrome or Edge on desktop.</span>\n          <span class=\"unsupported-msg\" slot=\"not-allowed\">Serial access denied. Please allow access to continue.</span>\n        </esp-web-install-button>\n\n        <div class=\"browser-warning\" id=\"browserWarning\">\n          Web Serial is only supported in Chrome, Edge, and Opera browsers on desktop.\n        </div>\n      </div>\n\n      <button class=\"btn-restart\" data-action=\"13\">Start Over</button>\n    </div>\n  </div>\n\n  </div>";
        const document={querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),getElementById:id=>root.getElementById(id),createElement:tag=>this.ownerDocument.createElement(tag)};
        
    const BASE_URL = 'https://everythingsmarthome.github.io/everything-presence-lite/';

    let currentStep = 1;
    let totalSteps = 4;
    let stepSequence = [1, 2, 3, 4, 'final'];

    const selections = {
      platform: null,     // ha | homey
      sensor: null,       // ld2450 | ld2410 | sen0395 | sen0609 | mr24hpc1
      bluetooth: null,    // ble | noble
      co2: null           // co2 | noco2
    };

    function updateStepSequence() {
      if (selections.platform === 'homey') {
        // Homey: Skip sensor selection, default to LD2450
        stepSequence = [1, 3, 4, 'final'];
        totalSteps = 3;
        selections.sensor = 'ld2450';
      } else {
        // Home Assistant: Full flow with sensor selection
        stepSequence = [1, 2, 3, 4, 'final'];
        totalSteps = 4;
      }
      updateProgressBar();
    }

    function updateProgressBar() {
      const progressBar = document.getElementById('progressBar');
      progressBar.innerHTML = '';

      const numSteps = totalSteps + 1; // +1 for install step

      for (let i = 0; i < numSteps; i++) {
        const step = document.createElement('div');
        step.className = 'progress-step';
        step.dataset.index = i;

        const currentIndex = stepSequence.indexOf(currentStep);
        if (currentStep === 'final') {
          step.classList.add('completed');
        } else if (i < currentIndex) {
          step.classList.add('completed');
        } else if (i === currentIndex) {
          step.classList.add('active');
        }

        progressBar.appendChild(step);
      }
    }

    function updateBackButton() {
      const backBtn = document.getElementById('backBtn');
      const currentIndex = stepSequence.indexOf(currentStep);
      if (currentIndex > 0) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }

    function toggleOtherSensors() {
      const otherSensors = document.getElementById('otherSensors');
      const expandBtn = document.getElementById('expandBtn');

      if (otherSensors.classList.contains('visible')) {
        otherSensors.classList.remove('visible');
        expandBtn.classList.remove('expanded');
      } else {
        otherSensors.classList.add('visible');
        expandBtn.classList.add('expanded');
      }
    }

    function selectOption(step, value, element) {
      // For sensor step, need to handle both main tile and other sensors
      if (step === 2) {
        document.querySelectorAll('.step[data-step="2"] .tile').forEach(t => t.classList.remove('selected'));
      } else {
        const tiles = element.parentElement.querySelectorAll('.tile');
        tiles.forEach(t => t.classList.remove('selected'));
      }
      element.classList.add('selected');

      // Store selection
      switch(step) {
        case 1:
          selections.platform = value;
          updateStepSequence();
          break;
        case 2: selections.sensor = value; break;
        case 3: selections.bluetooth = value; break;
        case 4: selections.co2 = value; break;
      }

      setTimeout(() => {
        nextStep();
      }, 200);
    }

    function nextStep() {
      const currentIndex = stepSequence.indexOf(currentStep);
      const nextStepValue = stepSequence[currentIndex + 1];

      document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
      document.querySelector(`.step[data-step="${nextStepValue}"]`).classList.add('active');

      currentStep = nextStepValue;
      updateProgressBar();
      updateBackButton();

      if (currentStep === 'final') {
        generateManifest();
      }
    }

    function goBack() {
      const currentIndex = stepSequence.indexOf(currentStep);
      if (currentIndex <= 0) return;

      const prevStepValue = stepSequence[currentIndex - 1];

      document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
      document.querySelector(`.step[data-step="${prevStepValue}"]`).classList.add('active');

      currentStep = prevStepValue;
      updateProgressBar();
      updateBackButton();
    }

    function generateManifest() {
      const summaryItems = [];

      // Build manifest filename
      // Pattern: everything-presence-lite-ha{-sensor}{-no-ble}{-co2}-manifest.json
      let manifestFilename = 'everything-presence-lite-ha';

      // Add sensor (ld2450 is default, no suffix needed)
      const sensor = selections.sensor;
      if (sensor !== 'ld2450') {
        manifestFilename += `-${sensor}`;
      }

      // Add no-ble if disabled
      if (selections.bluetooth === 'noble') {
        manifestFilename += '-no-ble';
      }

      // Add co2 if enabled
      if (selections.co2 === 'co2') {
        manifestFilename += '-co2';
      }

      manifestFilename += '-manifest.json';

      // Build summary
      summaryItems.push(selections.platform === 'homey' ? 'Homey' : 'Home Assistant');

      const sensorNames = {
        'ld2450': 'LD2450',
        'ld2410': 'LD2410',
        'sen0395': 'SEN0395',
        'sen0609': 'SEN0609',
        'mr24hpc1': 'MR24HPC1'
      };
      summaryItems.push(sensorNames[sensor] || 'LD2450');
      summaryItems.push(selections.bluetooth === 'ble' ? 'Bluetooth Enabled' : 'No Bluetooth');
      summaryItems.push(selections.co2 === 'co2' ? 'CO2 Module' : 'No CO2 Module');

      const manifestUrl = `${BASE_URL}${manifestFilename}`;
      document.getElementById('installButton').setAttribute('manifest', manifestUrl);

      // Update summary display
      const summaryContainer = document.getElementById('summaryItems');
      summaryContainer.innerHTML = '';
      summaryItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'summary-item';
        span.textContent = item;
        summaryContainer.appendChild(span);
      });

      console.log('Manifest URL:', manifestUrl);
    }

    function restart() {
      selections.platform = null;
      selections.sensor = null;
      selections.bluetooth = null;
      selections.co2 = null;

      currentStep = 1;
      stepSequence = [1, 2, 3, 4, 'final'];
      totalSteps = 4;

      // Reset other sensors visibility
      document.getElementById('otherSensors').classList.remove('visible');
      document.getElementById('expandBtn').classList.remove('expanded');

      document.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.querySelector('.step[data-step="1"]').classList.add('active');

      updateProgressBar();
      updateBackButton();
    }

    if (!('serial' in navigator)) {
      document.getElementById('browserWarning').classList.add('show');
    }

    // Initialize
    updateProgressBar();
    updateBackButton();
  
        {const node=root.querySelector('[data-action="0"]');
        const activate=()=>{goBack();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="1"]');
        const activate=()=>{selectOption(1, 'ha', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="2"]');
        const activate=()=>{selectOption(1, 'homey', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="3"]');
        const activate=()=>{selectOption(2, 'ld2450', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="4"]');
        const activate=()=>{toggleOtherSensors();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="5"]');
        const activate=()=>{selectOption(2, 'ld2410', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="6"]');
        const activate=()=>{selectOption(2, 'mr24hpc1', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="7"]');
        const activate=()=>{selectOption(2, 'sen0395', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="8"]');
        const activate=()=>{selectOption(2, 'sen0609', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="9"]');
        const activate=()=>{selectOption(3, 'ble', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="10"]');
        const activate=()=>{selectOption(3, 'noble', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="11"]');
        const activate=()=>{selectOption(4, 'co2', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="12"]');
        const activate=()=>{selectOption(4, 'noco2', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="13"]');
        const activate=()=>{restart();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
        const install=root.querySelector('.install-btn');install.disabled=true;
        firmwareTools.then(()=>{install.disabled=false;}).catch(()=>{
          const note=document.createElement('p');note.className='inline-load-error';
          note.textContent='The firmware tool could not load. Check your internet connection and reload the page.';
          install.after(note);
        });
      }
    });
    
customElements.define('es-installer-pro',class extends HTMLElement {
      connectedCallback(){
        if(this.shadowRoot)return;
        const root=this.attachShadow({mode:'open'});
        root.innerHTML="<style>\n    :host {\n      /* Light mode (default) */\n      --bg-gradient-start: #FFFFFF;\n      --bg-gradient-end: #FFFFFF;\n      --text-primary: #1e293b;\n      --text-secondary: #64748b;\n      --text-muted: #94a3b8;\n      --tile-bg: rgba(0, 0, 0, 0.03);\n      --tile-border: rgba(0, 0, 0, 0.08);\n      --tile-hover-bg: rgba(0, 0, 0, 0.05);\n      --tile-selected-bg: rgba(102, 126, 234, 0.1);\n      --tile-selected-border: #667eea;\n      --tile-selected-shadow: rgba(102, 126, 234, 0.15);\n      --summary-bg: rgba(0, 0, 0, 0.03);\n      --summary-item-bg: rgba(102, 126, 234, 0.1);\n      --summary-item-text: #5b6eae;\n      --btn-secondary-bg: rgba(0, 0, 0, 0.05);\n      --btn-secondary-hover: rgba(0, 0, 0, 0.08);\n      --btn-secondary-text: #475569;\n      --warning-bg: rgba(251, 191, 36, 0.1);\n      --warning-border: rgba(251, 191, 36, 0.3);\n      --warning-text: #b45309;\n      --progress-bg: #e2e8f0;\n      --progress-complete: #4ade80;\n      --back-btn-bg: rgba(0, 0, 0, 0.05);\n      --back-btn-hover: rgba(0, 0, 0, 0.1);\n    }\n\n    :host([data-theme=\"dark\"]) {\n      --bg-gradient-start: #111319;\n      --bg-gradient-end: #111319;\n      --text-primary: #ffffff;\n      --text-secondary: #a0a0a0;\n      --text-muted: #888888;\n      --tile-bg: rgba(255, 255, 255, 0.05);\n      --tile-border: rgba(255, 255, 255, 0.1);\n      --tile-hover-bg: rgba(255, 255, 255, 0.08);\n      --tile-selected-bg: rgba(102, 126, 234, 0.15);\n      --tile-selected-border: #667eea;\n      --tile-selected-shadow: rgba(102, 126, 234, 0.2);\n      --summary-bg: rgba(255, 255, 255, 0.05);\n      --summary-item-bg: rgba(102, 126, 234, 0.2);\n      --summary-item-text: #a5b4fc;\n      --btn-secondary-bg: rgba(255, 255, 255, 0.1);\n      --btn-secondary-hover: rgba(255, 255, 255, 0.15);\n      --btn-secondary-text: #ffffff;\n      --warning-bg: rgba(251, 191, 36, 0.1);\n      --warning-border: rgba(251, 191, 36, 0.3);\n      --warning-text: #fbbf24;\n      --progress-bg: #333333;\n      --progress-complete: #4ade80;\n      --back-btn-bg: rgba(255, 255, 255, 0.1);\n      --back-btn-hover: rgba(255, 255, 255, 0.15);\n    }\n\n    @media (prefers-color-scheme: dark) {\n      :host(:not([data-theme=\"light\"])) {\n        --bg-gradient-start: #111319;\n        --bg-gradient-end: #111319;\n        --text-primary: #ffffff;\n        --text-secondary: #a0a0a0;\n        --text-muted: #888888;\n        --tile-bg: rgba(255, 255, 255, 0.05);\n        --tile-border: rgba(255, 255, 255, 0.1);\n        --tile-hover-bg: rgba(255, 255, 255, 0.08);\n        --tile-selected-bg: rgba(102, 126, 234, 0.15);\n        --tile-selected-border: #667eea;\n        --tile-selected-shadow: rgba(102, 126, 234, 0.2);\n        --summary-bg: rgba(255, 255, 255, 0.05);\n        --summary-item-bg: rgba(102, 126, 234, 0.2);\n        --summary-item-text: #a5b4fc;\n        --btn-secondary-bg: rgba(255, 255, 255, 0.1);\n        --btn-secondary-hover: rgba(255, 255, 255, 0.15);\n        --btn-secondary-text: #ffffff;\n        --warning-bg: rgba(251, 191, 36, 0.1);\n        --warning-border: rgba(251, 191, 36, 0.3);\n        --warning-text: #fbbf24;\n        --progress-bg: #333333;\n        --progress-complete: #4ade80;\n        --back-btn-bg: rgba(255, 255, 255, 0.1);\n        --back-btn-hover: rgba(255, 255, 255, 0.15);\n      }\n    }\n\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n\n    .installer-body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;\n      background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);\n      min-height: 100vh;\n      color: var(--text-primary);\n      padding: 16px;\n      transition: background 0.3s ease, color 0.3s ease;\n    }\n\n    .container {\n      max-width: 600px;\n      margin: 0 auto;\n      position: relative;\n    }\n\n    /* Top bar with back button */\n    .top-bar {\n      display: flex;\n      align-items: center;\n      margin-bottom: 16px;\n      min-height: 32px;\n    }\n\n    .back-btn {\n      display: none;\n      align-items: center;\n      gap: 4px;\n      padding: 6px 12px;\n      border: none;\n      border-radius: 6px;\n      background: var(--back-btn-bg);\n      color: var(--text-secondary);\n      font-size: 0.8rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n    }\n\n    .back-btn:hover {\n      background: var(--back-btn-hover);\n      color: var(--text-primary);\n    }\n\n    .back-btn.visible {\n      display: flex;\n    }\n\n    .back-btn svg {\n      width: 14px;\n      height: 14px;\n    }\n\n    .header {\n      text-align: center;\n      margin-bottom: 20px;\n    }\n\n    .header h3 {\n      font-size: 1.4rem;\n      font-weight: 600;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    /* Progress Steps */\n    .progress-bar {\n      display: flex;\n      justify-content: center;\n      gap: 8px;\n      margin-bottom: 24px;\n    }\n\n    .progress-step {\n      width: 40px;\n      height: 4px;\n      background: var(--progress-bg);\n      border-radius: 2px;\n      transition: all 0.3s ease;\n    }\n\n    .progress-step.active {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    }\n\n    .progress-step.completed {\n      background: var(--progress-complete);\n    }\n\n    /* Step Container */\n    .step {\n      display: none;\n      animation: fadeIn 0.4s ease;\n    }\n\n    .step.active {\n      display: block;\n    }\n\n    @keyframes fadeIn {\n      from {\n        opacity: 0;\n        transform: translateY(10px);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n    .step-header {\n      text-align: center;\n      margin-bottom: 16px;\n    }\n\n    .step-number {\n      display: none;\n    }\n\n    .step-title {\n      font-size: 1.1rem;\n      font-weight: 600;\n      margin-bottom: 4px;\n      color: var(--text-primary);\n    }\n\n    .step-description {\n      color: var(--text-muted);\n      font-size: 0.85rem;\n    }\n\n    /* Tiles */\n    .tiles {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 12px;\n    }\n\n    .tile {\n      background: var(--tile-bg);\n      border: 2px solid var(--tile-border);\n      border-radius: 12px;\n      padding: 20px 16px;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      text-align: center;\n    }\n\n    .tile:hover {\n      background: var(--tile-hover-bg);\n      border-color: rgba(102, 126, 234, 0.5);\n      transform: translateY(-2px);\n    }\n\n    .tile.selected {\n      background: var(--tile-selected-bg);\n      border-color: var(--tile-selected-border);\n      box-shadow: 0 0 20px var(--tile-selected-shadow);\n    }\n\n    .tile-icon {\n      font-size: 2rem;\n      margin-bottom: 10px;\n      display: block;\n    }\n\n    .tile-title {\n      font-weight: 600;\n      font-size: 0.95rem;\n      margin-bottom: 4px;\n      color: var(--text-primary);\n    }\n\n    .tile-description {\n      color: var(--text-muted);\n      font-size: 0.75rem;\n      line-height: 1.4;\n    }\n\n    /* Summary */\n    .summary {\n      background: var(--summary-bg);\n      border-radius: 12px;\n      padding: 16px;\n      margin-bottom: 20px;\n    }\n\n    .summary-title {\n      font-size: 0.8rem;\n      color: var(--text-muted);\n      margin-bottom: 10px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n\n    .summary-items {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 8px;\n    }\n\n    .summary-item {\n      background: var(--summary-item-bg);\n      color: var(--summary-item-text);\n      padding: 6px 12px;\n      border-radius: 20px;\n      font-size: 0.8rem;\n      font-weight: 500;\n    }\n\n    /* Install Section */\n    .install-section {\n      text-align: center;\n    }\n\n    esp-web-install-button {\n      display: inline-block;\n    }\n\n    /* Style the slotted button */\n    .install-btn {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      border: none;\n      padding: 14px 32px;\n      border-radius: 8px;\n      font-size: 1rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);\n    }\n\n    .install-btn:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n\n    .install-btn:active {\n      transform: translateY(0);\n    }\n\n    .btn-restart {\n      background: var(--btn-secondary-bg);\n      color: var(--btn-secondary-text);\n      border: none;\n      padding: 10px 20px;\n      border-radius: 8px;\n      font-size: 0.85rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.3s ease;\n      width: 100%;\n      margin-top: 16px;\n    }\n\n    .btn-restart:hover {\n      background: var(--btn-secondary-hover);\n    }\n\n    /* Browser warning */\n    .browser-warning {\n      background: var(--warning-bg);\n      border: 1px solid var(--warning-border);\n      border-radius: 8px;\n      padding: 12px 16px;\n      margin-top: 16px;\n      font-size: 0.8rem;\n      color: var(--warning-text);\n      display: none;\n    }\n\n    .browser-warning.show {\n      display: block;\n    }\n\n    /* Unsupported message styling */\n    .unsupported-msg {\n      color: var(--warning-text);\n      font-size: 0.9rem;\n      padding: 12px 16px;\n      background: var(--warning-bg);\n      border-radius: 8px;\n      border: 1px solid var(--warning-border);\n    }\n\n    /* Responsive */\n    @media (max-width: 400px) {\n      .tiles {\n        grid-template-columns: 1fr;\n      }\n\n      .tile {\n        padding: 16px;\n      }\n    }\n  \n:host{display:block;color:var(--es-ink);font-family:inherit}\n    :host,:host([data-theme=\"dark\"]){--text-primary:var(--es-ink);--text-secondary:var(--es-muted);--text-muted:var(--es-muted);--tile-selected-border:var(--es-accent);--summary-item-text:var(--es-ink)}\n    .installer-body{background:transparent;padding:24px 0;min-height:0;margin:0;color:var(--es-ink);font-family:inherit}\n    .container{max-width:none;margin:0;padding:0;box-shadow:none;background:transparent}\n    .tile:focus-visible,button:focus-visible{outline:3px solid var(--es-accent);outline-offset:3px}\n    h3{font-size:22px} .step.active{animation:none}\n    .install-btn{background:var(--es-accent);color:var(--es-bg);box-shadow:none}\n    .inline-load-error{color:var(--es-ink);padding:12px;border:1px solid var(--es-line)}\n    @media(max-width:600px){.tiles,.tiles.three-col{grid-template-columns:1fr!important}}\n    </style><div class=\"installer-body\">\n  <div class=\"container\">\n    <div class=\"top-bar\">\n      <button class=\"back-btn\" id=\"backBtn\" data-action=\"0\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n          <path fill-rule=\"evenodd\" d=\"M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z\" clip-rule=\"evenodd\" />\n        </svg>\n        Back\n      </button>\n    </div>\n\n    <div class=\"header\">\n      <h3>Everything Presence Pro</h3>\n    </div>\n\n    <div class=\"progress-bar\">\n      <div class=\"progress-step active\" data-step=\"1\"></div>\n      <div class=\"progress-step\" data-step=\"2\"></div>\n      <div class=\"progress-step\" data-step=\"3\"></div>\n      <div class=\"progress-step\" data-step=\"4\"></div>\n    </div>\n\n    <!-- Step 1: Connection Type -->\n    <div class=\"step active\" data-step=\"1\">\n      <div class=\"step-header\">\n        <div class=\"step-number\">1</div>\n        <div class=\"step-title\">Connection Type</div>\n        <div class=\"step-description\">How will your device connect to the network?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-value=\"wifi\" data-action=\"1\">\n          <span class=\"tile-icon\">&#128246;</span>\n          <div class=\"tile-title\">WiFi</div>\n          <div class=\"tile-description\">Connect wirelessly to your network</div>\n        </div>\n        <div class=\"tile\" data-value=\"ethernet\" data-action=\"2\">\n          <span class=\"tile-icon\">&#128268;</span>\n          <div class=\"tile-title\">Ethernet</div>\n          <div class=\"tile-description\">Wired connection for reliability</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 2: Bluetooth -->\n    <div class=\"step\" data-step=\"2\">\n      <div class=\"step-header\">\n        <div class=\"step-number\">2</div>\n        <div class=\"step-title\">Bluetooth Proxy</div>\n        <div class=\"step-description\">Enable Bluetooth proxy for Home Assistant?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-value=\"ble\" data-action=\"3\">\n          <span class=\"tile-icon\">&#128225;</span>\n          <div class=\"tile-title\">Yes, Enable</div>\n          <div class=\"tile-description\">Proxy Bluetooth devices to Home Assistant</div>\n        </div>\n        <div class=\"tile\" data-value=\"no-ble\" data-action=\"4\">\n          <span class=\"tile-icon\">&#9889;</span>\n          <div class=\"tile-title\">No, Disable</div>\n          <div class=\"tile-description\">Recommended if you have WiFi connectivity issues</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 3: CO2 Module -->\n    <div class=\"step\" data-step=\"3\">\n      <div class=\"step-header\">\n        <div class=\"step-number\">3</div>\n        <div class=\"step-title\">CO2 Module</div>\n        <div class=\"step-description\">Do you have the CO2 expansion module?</div>\n      </div>\n      <div class=\"tiles\">\n        <div class=\"tile\" data-value=\"co2\" data-action=\"5\">\n          <span class=\"tile-icon\">&#127811;</span>\n          <div class=\"tile-title\">Yes, I Have It</div>\n          <div class=\"tile-description\">Enable CO2 sensor support</div>\n        </div>\n        <div class=\"tile\" data-value=\"no-co2\" data-action=\"6\">\n          <span class=\"tile-icon\">&#10060;</span>\n          <div class=\"tile-title\">No Module</div>\n          <div class=\"tile-description\">I don't have the CO2 module</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 4: Install -->\n    <div class=\"step\" data-step=\"4\">\n      <div class=\"step-header\">\n        <div class=\"step-number\">&#10003;</div>\n        <div class=\"step-title\">Ready to Install</div>\n        <div class=\"step-description\">Connect your device via USB and click install</div>\n      </div>\n\n      <div class=\"summary\">\n        <div class=\"summary-title\">Your Configuration</div>\n        <div class=\"summary-items\" id=\"summaryItems\"></div>\n      </div>\n\n      <div class=\"install-section\">\n        <esp-web-install-button id=\"installButton\">\n          <button class=\"install-btn\" slot=\"activate\">Install Firmware</button>\n          <span class=\"unsupported-msg\" slot=\"unsupported\">Your browser doesn't support Web Serial. Please use Chrome or Edge on desktop.</span>\n          <span class=\"unsupported-msg\" slot=\"not-allowed\">Serial access denied. Please allow access to continue.</span>\n        </esp-web-install-button>\n\n        <div class=\"browser-warning\" id=\"browserWarning\">\n          Web Serial is only supported in Chrome, Edge, and Opera browsers on desktop.\n        </div>\n      </div>\n\n      <button class=\"btn-restart\" data-action=\"7\">Start Over</button>\n    </div>\n  </div>\n\n  </div>";
        const document={querySelector:s=>root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s),getElementById:id=>root.getElementById(id),createElement:tag=>this.ownerDocument.createElement(tag)};
        
    const BASE_URL = '/update/everything-presence-pro/';

    let currentStep = 1;
    const selections = {
      1: null,
      2: null,
      3: null
    };

    function updateBackButton() {
      const backBtn = document.getElementById('backBtn');
      if (currentStep > 1) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }

    function selectOption(step, value, element) {
      // Remove selection from siblings
      const tiles = element.parentElement.querySelectorAll('.tile');
      tiles.forEach(t => t.classList.remove('selected'));

      // Add selection to clicked tile
      element.classList.add('selected');

      // Store selection
      selections[step] = value;

      // Auto-advance after brief delay for visual feedback
      setTimeout(() => {
        nextStep(step);
      }, 200);
    }

    function nextStep(fromStep) {
      const currentEl = document.querySelector(`.step[data-step="${fromStep}"]`);
      const nextEl = document.querySelector(`.step[data-step="${fromStep + 1}"]`);

      currentEl.classList.remove('active');
      nextEl.classList.add('active');

      // Update progress bar
      document.querySelector(`.progress-step[data-step="${fromStep}"]`).classList.remove('active');
      document.querySelector(`.progress-step[data-step="${fromStep}"]`).classList.add('completed');
      document.querySelector(`.progress-step[data-step="${fromStep + 1}"]`).classList.add('active');

      currentStep = fromStep + 1;
      updateBackButton();

      // If final step, generate manifest URL
      if (currentStep === 4) {
        generateManifest();
      }
    }

    function goBack() {
      if (currentStep <= 1) return;

      const currentEl = document.querySelector(`.step[data-step="${currentStep}"]`);
      const prevEl = document.querySelector(`.step[data-step="${currentStep - 1}"]`);

      currentEl.classList.remove('active');
      prevEl.classList.add('active');

      // Update progress bar
      document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
      document.querySelector(`.progress-step[data-step="${currentStep - 1}"]`).classList.remove('completed');
      document.querySelector(`.progress-step[data-step="${currentStep - 1}"]`).classList.add('active');

      currentStep--;
      updateBackButton();
    }

    function generateManifest() {
      const connection = selections[1];
      const bluetooth = selections[2];
      const co2 = selections[3];

      // Build firmware name
      let firmwareName = `everything-presence-pro-${connection}`;

      if (bluetooth === 'ble') {
        firmwareName += '-ble';
      }

      if (co2 === 'co2') {
        firmwareName += '-co2';
      }

      const manifestUrl = `${BASE_URL}${firmwareName}-manifest.json`;

      // Update install button
      document.getElementById('installButton').setAttribute('manifest', manifestUrl);

      // Update summary
      const summaryItems = document.getElementById('summaryItems');
      summaryItems.innerHTML = '';

      const items = [
        connection === 'wifi' ? 'WiFi' : 'Ethernet',
        bluetooth === 'ble' ? 'Bluetooth Enabled' : 'No Bluetooth',
        co2 === 'co2' ? 'CO2 Module' : 'No CO2 Module'
      ];

      items.forEach(item => {
        const span = document.createElement('span');
        span.className = 'summary-item';
        span.textContent = item;
        summaryItems.appendChild(span);
      });
    }

    function restart() {
      // Reset selections
      selections[1] = null;
      selections[2] = null;
      selections[3] = null;
      currentStep = 1;

      // Reset UI
      document.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));

      // Reset steps
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.querySelector('.step[data-step="1"]').classList.add('active');

      // Reset progress
      document.querySelectorAll('.progress-step').forEach(p => {
        p.classList.remove('active', 'completed');
      });
      document.querySelector('.progress-step[data-step="1"]').classList.add('active');

      updateBackButton();
    }

    // Check for Web Serial support
    if (!('serial' in navigator)) {
      document.getElementById('browserWarning').classList.add('show');
    }

    // Initialize
    updateBackButton();
  
        {const node=root.querySelector('[data-action="0"]');
        const activate=()=>{goBack();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="1"]');
        const activate=()=>{selectOption(1, 'wifi', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="2"]');
        const activate=()=>{selectOption(1, 'ethernet', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="3"]');
        const activate=()=>{selectOption(2, 'ble', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="4"]');
        const activate=()=>{selectOption(2, 'no-ble', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="5"]');
        const activate=()=>{selectOption(3, 'co2', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="6"]');
        const activate=()=>{selectOption(3, 'no-co2', node);};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
{const node=root.querySelector('[data-action="7"]');
        const activate=()=>{restart();};node.addEventListener('click',activate);
        if(node.tagName!=='BUTTON'){node.setAttribute('role','button');node.tabIndex=0;
        node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}});}}
        const install=root.querySelector('.install-btn');install.disabled=true;
        firmwareTools.then(()=>{install.disabled=false;}).catch(()=>{
          const note=document.createElement('p');note.className='inline-load-error';
          note.textContent='The firmware tool could not load. Check your internet connection and reload the page.';
          install.after(note);
        });
      }
    });
    