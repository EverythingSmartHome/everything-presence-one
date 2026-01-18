---
layout: default
title: Sensors
nav_order: 3
parent: Samsung SmartThings
---

# SmartThings Sensors Available

{: .no_toc }

What are all of these sensors!?
{: .fs-6 .fw-300 }

### Temperature, Humidity and Illuminance

Temperature is the current room temperature as measured by the on-board temperature sensor and is given in celsius. This sensor supports a configureable offset allowing you to adjust the reading. See the settings section below for how to do that.

Humidity gives a humidity sensor reading in percent for the room:

![SmartThings Temperature and Humidity](https://everythingsmarthome.github.io/everything-presence-one/images/smartthings-sensors-temp.jpg)

Illuminance is measured from the on-board light sensor in lux. There are slots at the side of the EP1 case that allow for light to pass-through and be measured, so make sure not to obstruct these for the best readings.

![SmartThings Light Sensor](https://everythingsmarthome.github.io/everything-presence-one/images/smartthings-sensors-light.jpg)

### mmWave, PIR and Occupancy

![SmartThings Presence and Motion Sensors](https://everythingsmarthome.github.io/everything-presence-one/images/smartthings-sensors-presence.jpg)

You will find a sensor called mmWave - this is the output from the mmWave sensor directly and indicates if movement is detected. The mmWave sensor has a configurable offset for the "Blind time" which we will cover below. The default blind time is 12.5 seconds, which is basically how long the sensor takes to go to an "Off" or "clear" state after motion has stopped being detected:

The sensor called "Motion Sensor" is the PIR. The PIR sensor indicates if motion was detected or not. It also has a timeout period, which by default is 10 seconds. This means that it will take 10 seconds after the last motion for the PIR sensor to go back to the "Off" or "Clear" state.

The sensor called "Presence Sensor" is a combination of the mmWave and PIR sensor. If **either** the mmWave or PIR sensor detects motion, Occupancy will be "On" or "Detected". Both the mmWave and PIR sensor must be clear before Occupancy will change to the "Off" or "Clear" state. This is the sensor that you will generally want to use in your Automations.

## Settings

Click the three dots in the top right corner of the sensor from within the SmartThings app and select Settings:

![SmartThings Settings](https://everythingsmarthome.github.io/everything-presence-one/images/smartthings-sensors-settings.jpg)

### Offsets for mmWave

The mmWave sensor has 2 configurable time periods - "On Latency" and "Off Latency".

On Latency configures a delay of how long motion must be detected for before the sensor will change to "detected". It's also really useful for filtering out detections from unwanted objects - see the [tuning guide](https://everythingsmarthome.github.io/everything-presence-one/tuning.html) for more information.

Off Latency configures a delay of how long the sensor will still on detected for after motion has stopped. I would generally recommending keeping this to at least 15 seconds.

### Distance and Sensitivity

The mmWave sensor has a configurable Sensitivity and Distance control inside of SmartThings.

Sensitivity allows you to adjust how sensitive the mmWave sensor reacts to movement - this can be useful to configure in rooms where slight movements by something not Human triggers the device (this cannot filter out non Human objects like fans or pets) - see the [tuning guide](https://everythingsmarthome.github.io/everything-presence-one/tuning.html) for more information.

Distance allows you to adjust the max range of the sensor, up to a maximum of 8m. Please note that 8m is the max range, but doesn't nessecarily mean the sensor is capable of detecting the tiniest of movements at 8m - placement is still important for the best results - see the [tuning guide](https://everythingsmarthome.github.io/everything-presence-one/tuning.html) for more information.

### Turning off LEDs

The EP1 has two LED's that will be visible, both of which can be turned off.

The mmWave LED disables the LED on the mmWave sensor itself which flashes when in use and the LED disables the LED on the EP1 board itself.

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
