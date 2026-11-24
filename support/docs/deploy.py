"""Check published Wi-Fi builds, then optionally deploy the shared docs installer.

Run with --check (default) first. --apply keeps a backup and atomically replaces
the mounted installer. This does not publish firmware or edit WikiJS articles.
"""
import argparse
import base64
import json
from pathlib import Path
import re
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--server', default='root@172.236.19.38')
mode = parser.add_mutually_exclusive_group()
mode.add_argument('--check', action='store_true')
mode.add_argument('--apply', action='store_true')
args = parser.parse_args()
here = Path(__file__).resolve().parent
root = here.parent.parent
manifests = [re.search(r'source: https://\S+/([^/]+-manifest.json)', p.read_text()).group(1)
             for p in sorted(root.glob('*-wifi11.yaml'))]
assert len(manifests) == 20 and len(set(manifests)) == 20
payload = dict(manifests=manifests, expected=here.joinpath('baseline.sha256').read_text().strip(),
               source=base64.b64encode(here.joinpath('installers.js').read_bytes()).decode(), apply=args.apply)
remote = r'''
import base64, concurrent.futures, datetime, hashlib, json, os, pathlib, shutil, subprocess, tempfile, urllib.request
mounts = json.loads(subprocess.check_output(['docker', 'inspect', 'wikijs3-live-web-1']))[0]['Mounts']
directory = pathlib.Path(next(m['Source'] for m in mounts if m['Destination'] == '/opt/installers'))
target = directory / 'installers.js'
source = base64.b64decode(payload['source']).decode('utf-8-sig').replace('\r\n', '\n').encode()
before = target.read_text(encoding='utf-8-sig').replace('\r\n', '\n').encode()
if before == source:
    print('The requested installer is already deployed.'); raise SystemExit(0)
assert hashlib.sha256(before).hexdigest() == payload['expected'], 'Live installer changed since investigation. Review it before deployment.'
mirror = pathlib.Path('/var/www/docs.everythingsmart.io/update/everything-presence-one')
base = 'https://everythingsmarthome.github.io/everything-presence-one/'
missing = [name for name in payload['manifests'] if not (mirror / name).is_file()]
if missing:
    raise SystemExit('Not ready: ' + str(len(missing)) + ' reduced-power manifests are not published on the mirror. No files changed.')
def check(name):
    local = json.loads((mirror / name).read_text())
    with urllib.request.urlopen(base + name, timeout=30) as response:
        published = json.load(response)
    assert local == published, name + ': mirror does not match GitHub Pages'
    for build in local['builds']:
        for item in [build['ota']] + build['parts']:
            file = item['path']
            assert not file.startswith(('/', 'http:','https:')) and '..' not in file
            assert (mirror / file).is_file(), name + ': missing mirror binary'
            with urllib.request.urlopen(urllib.request.Request(base + file, method='HEAD'), timeout=30):
                pass
        ota = build['ota']
        assert hashlib.md5((mirror / ota['path']).read_bytes()).hexdigest() == ota['md5'], name + ': bad OTA hash'
    return name
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    checked = list(pool.map(check, payload['manifests']))
print('Verified', len(checked), 'published builds and both binary paths; live installer baseline matches.')
if payload['apply']:
    backup = target.with_name('installers.js.backup-' + datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ'))
    shutil.copy2(target, backup)
    fd, temp = tempfile.mkstemp(prefix='installers-', suffix='.js', dir=directory)
    try:
        with os.fdopen(fd, 'wb') as output:
            output.write(source)
        os.chmod(temp, target.stat().st_mode & 0o777)
        os.replace(temp, target)
    finally:
        if os.path.exists(temp): os.unlink(temp)
    print('Deployed', str(target), 'Backup:', str(backup))
else:
    print('Check only: no server files changed. Use --apply to deploy.')
'''
result = subprocess.run(['ssh', args.server, 'python3', '-'],
                        input='import json\npayload = json.loads(' + repr(json.dumps(payload)) + ')\n' + remote,
                        text=True)
raise SystemExit(result.returncode)
