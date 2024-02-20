---
layout: default
title: Updating and Connecting to WiFi
nav_order: 4
---

# Updating and Connecting To WiFi

{: .no_toc }

This page will help you to flash and update your Everything Presence One to the latest version!
{: .fs-6 .fw-300 }

## Everything Presence One ESPHome Firmware Install

Here you can install the latest [ESPHome](https://esphome.io) firmware on the Everything Presence One board for direct integration with [Home Assistant](https://home-assistant.io) or Samsung Smartthings (Beta).

First, make sure you have the EP1 connected you a USB port on your computer and select the platform you would like to install below. Hit the connect button, select the USB port from the list and then hit the install button to begin installing the latest software on your Everything Presence One.

Once the install has completed, you can then connect the EP1 to your WiFi easily and securely.

{: .warning-title }
If you do not see a "Connect" button below, use a supported web browser like Google Chrome.

{: .warning-title }
After clicking the "Connect" button, if you do not see a "USB Serial" port listed, or you get the error "Failed to open serial port.", you may need to install the CH340 driver. The installer should give you links to the latest driver.

<div class="container">
    <div class="question-prompt">Select Smart Home Platform:</div>
    <div class="types">
        <label>
            <input type="radio" name="platform" value="Home Assistant" />
            <div class="option-content">
                <img src="images/home-assistant-logo.png" alt="Home Assistant" class="option-image">
                <div>
                    <div class="title">Home Assistant</div>
                    <div class="description">Choose this for Home Assistant integration, with additional options for Bluetooth.</div>
                </div>
            </div>
        </label>
        <label>
            <input type="radio" name="platform" value="Smartthings" />
            <div class="option-content">
                <img src="images/everything-presence-one-st.png" alt="Samsung SmartThings" class="option-image">
                <div>
                    <div class="title">SmartThings</div>
                    <div class="description">Choose this option to integrate with SmartThings</div>
                </div>
            </div>
        </label>
    </div>

    <!-- Firmware Type Selection for Home Assistant -->
    <div id="homeAssistantOptions" class="hidden">
        <div class="question-prompt">Select Firmware Type:</div>
        <div class="types">
            <label>
                <input type="radio" name="haOption" value="Bluetooth" />
                <img src="images/ble_logo.png" alt="BLE Logo" class="option-image">
                <div>
                    <div class="title">Bluetooth Proxy</div>
                    <div class="description">Enable Bluetooth Proxy and Improv. May affect WiFi connectivity.</div>
                </div>
            </label>
            <label>
                <input type="radio" name="haOption" value="No-Bluetooth" />
                <img src="images/no_ble_logo.png" alt="BLE Logo" class="option-image">
                <div>
                    <div class="title">No Bluetooth</div>
                    <div class="description">Choose this option to disable Bluetooth Proxy and Improv, which can improve stability of the WiFi connection and/or you don't need Bluetooth Proxy.</div>
                </div>
            </label>
        </div>
    </div>

    <!-- Firmware Version Selection for Home Assistant -->
    <div id="firmwareVersionOptions" class="hidden">
        <div class="question-prompt">Select Firmware Version:</div>
        <div class="types">
            <label>
                <input type="radio" name="firmwareVersion" value="Stable" />
                <img src="images/stable-logo.png" alt="BLE Logo" class="option-image">
                <div>
                    <div class="title">Stable</div>
                    <div class="description">Choose this for a stable version of the firmware.</div>
                </div>
            </label>
            <label>
                <input type="radio" name="firmwareVersion" value="Beta" />
                <img src="images/beta-logo.png" alt="BLE Logo" class="option-image">
                <div>
                    <div class="title">Beta</div>
                    <div class="description">The Beta release includes target tracking and distance zones. Do not use unless you are comfortable with troubleshooting and reporting bugs.</div>
                </div>
            </label>
        </div>
    </div>

    <div id="summary" class="summary hidden">
        <h3>You are flashing:</h3>
        <p id="summaryPlatform"></p>
        <p id="summarySensor"></p>
        <p id="summaryOption"></p>
    </div>
    <esp-web-install-button class="hidden"></esp-web-install-button>
</div>

## Next Steps

With the EP1 fully updated and connected to WiFi, the final step is to connect it to Home Assistant or Samsung Smartthings (Beta)!

[Connecting to Home Assistant](https://everythingsmarthome.github.io/everything-presence-one/Home%20Assistant/connecting-home-assistant.html){: .btn .btn-blue }
[Connecting to SmartThings](https://everythingsmarthome.github.io/everything-presence-one/SmartThings/smartthings-driver.html){: .btn .btn-blue }

<script
  type="module"
  src="https://unpkg.com/esp-web-tools@9.0.3/dist/web/install-button.js?module"
></script>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Preview dark color scheme';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Return to the light side';
  }
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function() {

  function clearSelectedOption(groupSelector) {
        document.querySelectorAll(groupSelector + ' label').forEach(label => {
            label.classList.remove('selected-option');
        });
    }

    function handleRadioButtonChange(event, groupSelector) {
        clearSelectedOption(groupSelector);
        event.target.closest('label').classList.add('selected-option');
    }

    const homeAssistantOptions = document.getElementById("homeAssistantOptions");
    const firmwareVersionOptions = document.getElementById("firmwareVersionOptions");
    const summary = document.getElementById("summary");
    const installButton = document.querySelector("esp-web-install-button");

    function clearAndHideOptions() {
        homeAssistantOptions.classList.add("hidden");
        firmwareVersionOptions.classList.add("hidden");
        summary.classList.add("hidden");
        installButton.classList.add("hidden");
    }

    
    document.querySelectorAll('input[name="platform"]').forEach(radio => {
        radio.addEventListener("change", function() {
          handleRadioButtonChange(event, '.types');
            clearAndHideOptions();
            const selectedPlatform = this.value;
            if (selectedPlatform === "Home Assistant") {
                homeAssistantOptions.classList.remove("hidden");
            } else if (selectedPlatform === "Smartthings") {
                updateSummary("Smartthings", "Stable");
            }
        });
    });

    
    document.querySelectorAll('input[name="haOption"]').forEach(radio => {
        radio.addEventListener("change", function() {
            firmwareVersionOptions.classList.remove("hidden");
            handleRadioButtonChange(event, '#homeAssistantOptions .types');
        });
    });

    
    document.querySelectorAll('input[name="firmwareVersion"]').forEach(radio => {
        radio.addEventListener("change", function() {
          handleRadioButtonChange(event, '#firmwareVersionOptions .types');
            const selectedVersion = this.value;
            const selectedOption = document.querySelector('input[name="haOption"]:checked').value;
            updateSummary("Home Assistant", `${selectedOption} - ${selectedVersion}`);
        });
    });
    
    function updateSummary(platform, firmware) {
        document.getElementById("summaryPlatform").textContent = "Platform: " + platform;
        document.getElementById("summarySensor").textContent = "";
        document.getElementById("summaryOption").textContent = "Firmware: " + firmware;
        summary.classList.remove("hidden");

        installButton.classList.remove("hidden");
        
        
        let manifestUrl = "";
        if (platform === "Home Assistant") {
            if (firmware == "Bluetooth - Stable") {
                manifestUrl = "https://everythingsmarthome.github.io/everything-presence-one/everything-presence-one-ble-manifest.json";
            } else if (firmware == "Bluetooth - Beta") {
                manifestUrl = "https://everythingsmarthome.github.io/everything-presence-one/everything-presence-one-ha-ble-beta-manifest.json";
            } else if (firmware == "No-Bluetooth - Stable") {
                manifestUrl = "https://everythingsmarthome.github.io/everything-presence-one/everything-presence-one-manifest.json";
            } else if (firmware == "No-Bluetooth - Beta") {
                manifestUrl = "https://everythingsmarthome.github.io/everything-presence-one/everything-presence-one-ha-beta-manifest.json";
            }
        } else if (platform === "Smartthings") {
            
            manifestUrl = "https://everythingsmarthome.github.io/everything-presence-one/everything-presence-one-st-manifest.json";
        }
        installButton.setAttribute("manifest", manifestUrl);
    }
});

document.getElementById("advancedSensorsDivider").addEventListener("click", function() {
    var advancedSensors = document.getElementById("advancedSensors");
    advancedSensors.classList.toggle("hidden");
});
</script>
