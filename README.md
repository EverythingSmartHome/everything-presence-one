# Almost Everything One

Almost Everything One is perhaps a slightly more accurately named but unofficial
fork of the [Everything Presence One][EP1] project for [ESPHome][ESPH].

## Changes from upstream

1. Enable Bluetooth Proxy support
1. Disable `esp32_improv` (WiFi config via BLE) support
1. Uses [Calendar Versioning][CalVer] instead of [Semantic Versioning][SemVer]

## About the sensor

The Everything Presence One is a presence sensor for the smart home combining
a mmWave sensor with a PIR motion sensor, light illuminance sensor as well as
temperature and humidity sensors. It integrates directly with [Home Assistant][HASS]
using [ESPHome][ESPH].

See the [official user guide for the EP1][EP1DOCS] for setup and configuration
details.

![Everything Presence One](static/images/assembly-insert-pir-sensor-3.jpg)

[EP1]: https://github.com/EverythingSmartHome/everything-presence-one
[HASS]: https://www.home-assistant.io/
[ESPH]: https://esphome.io/
[EP1DOCS]: https://everythingsmarthome.github.io/everything-presence-one/
[CalVer]: https://calver.org/
[SemVer]: https://semver.org/
