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

Here you can install the latest [ESPHome](https://esphome.io) firmware on the Everything Presence One board for direct integration with [Home Assistant](https://home-assistant.io).

Hit the connect button to install the latest ESPHome firmware on you're
Everything Presence One board. No programming or other software
required.

{: .warning-title }
If you do not see a "Connect" button below, use a supported web browser like Google Chrome.

After flashing has completed, you can connect the EP1 to your Wi-Fi and integrate directly with Home Assistant.

<div class="radios">
  <label>
    <input type="radio" name="type" value="everything-presence-one" checked/>
    <img src="images/everything-presence-one-ha.png" alt="Everything Presence One Home Assistant" width="200" height="250"/>
  </label>
  <label>
    <input type="radio" name="type" value="everything-presence-one-st" />
    <img src="images/everything-presence-one-st.png" alt="Everything Presence One Smartthings Beta" width="200" height="250"/>
  </label>
</div>

<esp-web-install-button></esp-web-install-button>


## Next Steps

With the EP1 fully updated and connected to WiFi, the final step is to connect it to Home Assistant!

[Connecting to Home Assistant](http://everythingsmarthome.github.io/everything-presence-one/connecting-home-assistant.html){: .btn .btn-blue }

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
  document.querySelectorAll('input[name="type"]').forEach((radio) =>
    radio.addEventListener("change", () => {
      const button = document.querySelector("esp-web-install-button");
      button.manifest = `./${radio.value}-manifest.json`;

      document.querySelectorAll(".info").forEach((info) => {
        info.classList.add("hidden");
      });
      document
        .querySelector(`.info.${radio.value}`)
        .classList.remove("hidden");
    })
  );
  document
    .querySelector('input[name="type"]:checked')
    .dispatchEvent(new Event("change"));
  if (new URLSearchParams(document.location.search).has("diy")) {
    document.body.classList.add("show-diy");
  }
</script>
