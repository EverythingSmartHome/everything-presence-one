---
layout: default
title: Flashing
nav_order: 3
---

# Configuration

{: .no_toc }

Just the Docs has some specific configuration parameters that can be defined in your Jekyll site's \_config.yml file.
{: .fs-6 .fw-300 }

<img
        class="header"
        src="./header.png"
        alt="Web installer for the Everything Presence One board."
        width="100" height="150"
      />

## Everything Presence One ESPHome Installer

This site installs the latest [ESPHome](https://esphome.io) firmware on the Everything Presence One board for direct integration with [Home Assistant](https://home-assistant.io).

Hit the connect button to install the latest ESPHome firmware on you're
Everything Presence One board. No programming or other software
required.
<input
            type="radio"
            name="type"
            value="everything-presence-one"
            checked
          />
<img src="./everything-presence-one.png" alt="Everything Presence One"/>

<esp-web-install-button></esp-web-install-button>

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
