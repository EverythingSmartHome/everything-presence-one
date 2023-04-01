---
layout: default
title: Editing ESPHome Code
parent: Advanced Features
nav_order: 2
---

# Editing ESPHome Code

{: .no_toc }

## Importing the ESPHome code to your dashboard

If you want to make some more advanced changes to the EP1, you first need to add the ESPHome code to your dashboard.

First make sure that the EP1 has been added to Home Assistant, see [Connecting Home Assistant](https://everythingsmarthome.github.io/everything-presence-one/Home%20Assistant/connecting-home-assistant.html) if you have not already done that.

Then, make sure that the ESPHome Add-on [is installed](https://esphome.io/guides/getting_started_hassio.html)

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
