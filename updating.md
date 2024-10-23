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

Here you can install the latest firmware on the Everything Presence One for direct integration with [Home Assistant](https://home-assistant.io) or Samsung Smartthings (Beta).

First, make sure you have the EP1 connected to a USB port on your computer and select the platform you would like to install below. Hit the connect button, select the USB port from the list and then hit the install button to begin installing the latest software on your Everything Presence One.

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

    <!-- Sensor Model Options -->
    <div id="sensorModelOptions" class="hidden">
        <div class="question-prompt">Select Your mmWave Sensor Model:</div>
        <div class="types">
            <label>
                <input type="radio" name="sensorModel" value="DFRobot SEN0395" />
                <div class="option-content">
                    <img src="images/sen0395.png" alt="DFRobot SEN0395" class="option-image">
                    <div>
                        <div class="title">DFRobot SEN0395</div>
                        <div class="description">Select this option if you are using the DFRobot SEN0395 sensor (6 Pin).</div>
                    </div>
                </div>
            </label>
            <label>
                <input type="radio" name="sensorModel" value="DFRobot SEN0609" />
                <div class="option-content">
                    <img src="images/sen0609.png" alt="DFRobot SEN0609" class="option-image">
                    <div>
                        <div class="title">DFRobot SEN0609</div>
                        <div class="description">Select this option if you are using the DFRobot SEN0609 sensor (5 Pin).</div>
                    </div>
                </div>
            </label>
        </div>
    </div>

    <!-- Add-on Module Options -->
    <div id="addonModuleOptions" class="hidden">
        <div class="question-prompt">Select Add-on Module:</div>
        <div class="types">
            <label>
                <input type="radio" name="addonModule" value="No Add-on Module" />
                <div class="option-content">
                    <div>
                        <div class="title">No Add-on Module</div>
                        <div class="description">Proceed without any add-on module.</div>
                    </div>
                </div>
            </label>
            <label>
                <input type="radio" name="addonModule" value="CO2 Module" />
                <div class="option-content">
                    <div>
                        <div class="title">CO2 Module</div>
                        <div class="description">Select this if you are using the CO2 add-on module.</div>
                    </div>
                </div>
            </label>
        </div>
    </div>

    <!-- Board Revision Options -->
    <div id="boardRevisionOptions" class="hidden">
        <div class="question-prompt">Select Board Revision:</div>
        <div class="types">
            <label>
                <input type="radio" name="boardRevision" value="1.3/1.4" />
                <div class="option-content">
                    <div>
                        <div class="title">Revision 1.3/1.4</div>
                        <div class="description">Select this if your board revision is 1.3 or 1.4.</div>
                    </div>
                </div>
            </label>
            <label>
                <input type="radio" name="boardRevision" value="1.5" />
                <div class="option-content">
                    <div>
                        <div class="title">Revision 1.5</div>
                        <div class="description">Select this if your board revision is 1.5.</div>
                    </div>
                </div>
            </label>
        </div>
    </div>

    <!-- Home Assistant Options -->
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

    <!-- Firmware Version Options -->
    <div id="firmwareVersionOptions" class="hidden">
        <div class="question-prompt">Select Firmware Version:</div>
        <div class="types">
            <label>
                <input type="radio" name="firmwareVersion" value="Stable" />
                <img src="images/stable-logo.png" alt="Stable Logo" class="option-image">
                <div>
                    <div class="title">Stable</div>
                    <div class="description">Choose this for a stable version of the firmware.</div>
                </div>
            </label>
            <label>
                <input type="radio" name="firmwareVersion" value="Beta" />
                <img src="images/beta-logo.png" alt="Beta Logo" class="option-image">
                <div>
                    <div class="title">Beta</div>
                    <div class="description">The Beta release includes target tracking and distance zones. Do not use unless you are comfortable with troubleshooting and reporting bugs.</div>
                </div>
            </label>
        </div>
    </div>

    <!-- SmartThings Sensor Options -->
    <div id="smartThingsSensorOptions" class="hidden">
        <div class="question-prompt">Select Your mmWave Sensor Model for SmartThings:</div>
        <div class="types">
            <label>
                <input type="radio" name="stSensorModel" value="DFRobot SEN0395" />
                <div class="option-content">
                    <img src="images/sen0395.png" alt="DFRobot SEN0395" class="option-image">
                    <div>
                        <div class="title">DFRobot SEN0395</div>
                        <div class="description">Select this option if you are using the DFRobot SEN0395 sensor for SmartThings.</div>
                    </div>
                </div>
            </label>
            <label>
                <input type="radio" name="stSensorModel" value="DFRobot SEN0609" />
                <div class="option-content">
                    <img src="images/sen0609.png" alt="DFRobot SEN0609" class="option-image">
                    <div>
                        <div class="title">DFRobot SEN0609</div>
                        <div class="description">Select this option if you are using the DFRobot SEN0609 sensor for SmartThings.</div>
                    </div>
                </div>
            </label>
        </div>
    </div>

    <!-- Summary and Install Button -->
    <div id="summary" class="summary hidden">
        <h3>You are flashing:</h3>
        <p id="summaryPlatform"></p>
        <p id="summarySensor"></p>
        <p id="summaryAddonModule"></p>
        <p id="summaryBoardRevision"></p>
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
  src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js?module"
></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const homeAssistantOptions = document.getElementById("homeAssistantOptions");
    const sensorModelOptions = document.getElementById("sensorModelOptions");
    const addonModuleOptions = document.getElementById("addonModuleOptions");
    const boardRevisionOptions = document.getElementById("boardRevisionOptions");
    const smartThingsSensorOptions = document.getElementById("smartThingsSensorOptions");
    const firmwareVersionOptions = document.getElementById("firmwareVersionOptions");
    const summary = document.getElementById("summary");
    const installButton = document.querySelector("esp-web-install-button");

    function clearAndHideOptions() {
        homeAssistantOptions.classList.add("hidden");
        sensorModelOptions.classList.add("hidden");
        addonModuleOptions.classList.add("hidden");
        boardRevisionOptions.classList.add("hidden");
        smartThingsSensorOptions.classList.add("hidden");
        firmwareVersionOptions.classList.add("hidden");
        summary.classList.add("hidden");
        installButton.classList.add("hidden");
    }

    function handleRadioButtonChange(event, groupSelector) {
        document.querySelectorAll(groupSelector + ' label').forEach(label => {
            label.classList.remove('selected-option');
        });
        event.target.closest('label').classList.add('selected-option');
    }

    document.querySelectorAll('input[name="platform"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '.types');
            clearAndHideOptions();
            if (this.value === "Home Assistant") {
                sensorModelOptions.classList.remove("hidden");
            } else if (this.value === "Smartthings") {
                smartThingsSensorOptions.classList.remove("hidden");
            }
        });
    });

    document.querySelectorAll('input[name="sensorModel"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '#sensorModelOptions .types');
            addonModuleOptions.classList.remove("hidden");
        });
    });

    document.querySelectorAll('input[name="addonModule"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '#addonModuleOptions .types');
            if (this.value === "CO2 Module") {
                boardRevisionOptions.classList.remove("hidden");
            } else {
                boardRevisionOptions.classList.add("hidden");
                homeAssistantOptions.classList.remove("hidden");
            }
        });
    });

    document.querySelectorAll('input[name="boardRevision"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '#boardRevisionOptions .types');
            homeAssistantOptions.classList.remove("hidden");
        });
    });

    document.querySelectorAll('input[name="haOption"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '#homeAssistantOptions .types');
            firmwareVersionOptions.classList.remove("hidden");
        });
    });

    document.querySelectorAll('input[name="firmwareVersion"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '#firmwareVersionOptions .types');
            const selectedVersion = this.value;
            const selectedOption = document.querySelector('input[name="haOption"]:checked').value;
            const selectedSensorModel = document.querySelector('input[name="sensorModel"]:checked').value;
            const addonModule = document.querySelector('input[name="addonModule"]:checked') ? document.querySelector('input[name="addonModule"]:checked').value : "No Add-on Module";
            const boardRevision = document.querySelector('input[name="boardRevision"]:checked') ? document.querySelector('input[name="boardRevision"]:checked').value : "";

            updateSummary("Home Assistant", selectedSensorModel, `${selectedOption} - ${selectedVersion}`, addonModule, boardRevision);
        });
    });

    document.querySelectorAll('input[name="stSensorModel"]').forEach(radio => {
        radio.addEventListener("change", function(event) {
            handleRadioButtonChange(event, '#smartThingsSensorOptions .types');
            updateSummary("Smartthings", this.value, "Stable");
        });
    });

    function updateSummary(platform, sensorModel, firmware, addonModule, boardRevision) {
        document.getElementById("summaryPlatform").textContent = "Platform: " + platform;
        document.getElementById("summarySensor").textContent = "Sensor Model: " + sensorModel;
        document.getElementById("summaryOption").textContent = "Firmware: " + firmware;

        if (addonModule && addonModule !== "No Add-on Module") {
            document.getElementById("summaryAddonModule").textContent = "Add-on Module: " + addonModule;
        } else {
            document.getElementById("summaryAddonModule").textContent = "";
        }

        if (boardRevision) {
            document.getElementById("summaryBoardRevision").textContent = "Board Revision: " + boardRevision;
        } else {
            document.getElementById("summaryBoardRevision").textContent = "";
        }

        summary.classList.remove("hidden");
        installButton.classList.remove("hidden");

        let manifestUrl = determineManifestUrl(platform, sensorModel, firmware, addonModule, boardRevision);
        if (manifestUrl) {
            installButton.setAttribute("manifest", manifestUrl);
        } else {
            installButton.classList.add("hidden");
        }
    }

    function determineManifestUrl(platform, sensorModel, firmware, addonModule, boardRevision) {
        let baseName = "";

        if (platform === "Home Assistant") {
            if (sensorModel === "DFRobot SEN0609") {
                baseName = "everything-presence-one-sen0609";
            } else {
                baseName = "everything-presence-one";
            }

            if (sensorModel === "DFRobot SEN0609" && firmware.includes("Beta")) {
                alert("Beta firmware is not available for DFRobot SEN0609 sensor model.");
                return null;
            }

            if (firmware.includes("Beta") && sensorModel !== "DFRobot SEN0609") {
                baseName += "-beta";
            }

            if (firmware === "Bluetooth") {
                baseName += "-ble";
            }

            if (addonModule === "CO2 Module") {
                baseName += "-co2";
                if (boardRevision === "1.3/1.4") {
                    baseName += "-rev1.3";
                }
            }

        } else if (platform === "Smartthings") {
            if (sensorModel === "DFRobot SEN0609") {
                baseName = "everything-presence-one-st-sen0609";
            } else {
                baseName = "everything-presence-one-st";
            }
        }

        let manifestUrl = `https://everythingsmarthome.github.io/everything-presence-one/${baseName}-manifest.json`;
        return manifestUrl;
    }
});
</script>
