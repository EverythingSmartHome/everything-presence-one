# EP1 reduced Wi-Fi power rollout

This directory contains the shared production installer captured on 24 November
2026, with the EP1 support gate added. It serves both the embedded WikiJS wizard
and the standalone flash page. EPL and EPP component source is unchanged.

## Release order

1. Merge the firmware change and wait for the main build, GitHub Pages publication,
   and update-host mirror deployment to succeed. The PR build only creates artifacts.
2. Release the coordinated Zone Configurator change (EverythingSmartHome/everything-presence-addons#436).
3. Run `python support/docs/deploy.py --check`. It checks all 20 manifests against
   the mirror, referenced binaries on both hosts, mirror OTA hashes, and the live
   installer's original hash. It refuses to overwrite concurrent installer edits.
4. Run `python support/docs/deploy.py --apply`, then verify the embedded and
   standalone wizard. The command records a backup; no service restart is needed.
5. Apply the article corrections below through WikiJS's editor/API so page history
   is preserved. Do not write rendered content directly to PostgreSQL.

Deployment targets the active `/opt/installers` Docker mount, currently
`/opt/wikijs3/releases/20261119/design/installers`. The older file at
`/var/www/docs.everythingsmart.io/flash/everything-presence-one.html` is not live.

## Support usage

Append `?wifi_power=11` to either the EP1 restore article URL or
`https://docs.everythingsmart.io/flash/everything-presence-one.html`.
The final screen exposes an **unchecked** 11 dBm option for stable HA/Homey
configurations. Normal visits, beta, and SmartThings cannot select it. Back and
Start Over clear it. The final summary identifies 11 dBm explicitly.

In Zone Configurator, select an EP1 in Firmware Updates, expand Advanced options
then Support options, and unlock using `wifi11`. Confirm the installation.
Devices on the reduced-power profile can restore standard power without a code.
Current firmware does not need the new power flag, but must report its hardware
configuration through `get_build_flags`. Devices lacking that service use USB.

The `stable-wifi11` channel is a compatibility guard for older Configurator
clients. It contains only reduced-power builds. Standard and beta releases retain
their existing channels. The reduced-power build's own update URL, dashboard
import, and Apply Update feature selection all remain on this channel.

## WikiJS article corrections for release

Page: `/docs/products/everything-presence-one-ep1/troubleshooting/restore-or-update-your-ep1-to-factory-settings-using-a-computer`

Replace restore step 2 with:

> Select your platform and board revision, then your mmWave sensor where prompted,
> Bluetooth proxy and CO2 options. Select Stable unless support has asked you to
> use another build. Some options are skipped when only one configuration applies.

After the wizard link, add:

> If support supplied a troubleshooting link, it may show an additional Wi-Fi
> power option. Leave it unselected unless support asked you to enable it. Reduced
> Wi-Fi power may reduce range. To return to standard power, reinstall with this
> option unselected, or use Restore standard Wi-Fi power in Zone Configurator.

Keep the existing `/flash/everything-presence-one.html` link: the site theme uses
it to mount the embedded component. Do not publish the support code or gated URL
in normal troubleshooting navigation.

## Validation and rollback

Run `node scripts/test-wifi-power.js`, generate the index into this directory,
then `npm ci --prefix support/docs` and `npm test --prefix support/docs`.
The tests exercise all 20 stable hardware combinations, Homey reuse, normal visits,
beta/SmartThings exclusion, reset/back behavior, and unavailable manifests.

Before wider support use, USB-flash a device and verify provisioning, power profile,
reboot, OTA, BLE/CO2 switching, ESPHome adoption, and return to standard power.
These hardware checks have not been performed by the automated tests.

To roll back the UI, restore the backup path printed by the deployment command.
Keep the published reduced-power manifests and binaries available for devices
already running that profile; hiding an installer option should not strand them.
