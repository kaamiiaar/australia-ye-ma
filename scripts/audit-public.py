#!/usr/bin/env python3
"""Fail on credentials/private files in the public build; never print matched secrets."""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
patterns=[rb'\b\d{8,12}:[A-Za-z0-9_-]{35}\b',rb'gh[pousr]_[A-Za-z0-9]{30,}',rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',rb'sk-(?:proj-)?[A-Za-z0-9_-]{30,}']
errors=[]
for p in (root/'dist').rglob('*'):
    if not p.is_file():continue
    rel=p.relative_to(root/'dist')
    if any(part in {'.git','.private','.env','token','context.sqlite3'} for part in rel.parts):errors.append(str(rel)+' forbidden path')
    data=p.read_bytes()
    if any(re.search(pattern,data) for pattern in patterns):errors.append(str(rel)+' credential-like content')
    if p.suffix in {'.html','.js','.css'}:
        for name in re.findall(rb'["\'](\./assets/[^"\']+)',data) + re.findall(rb'(?:src=|href=)["\'](\./[^"\']+)',data):
            target=(root/'dist'/name.decode().split('#')[0])
            if not target.exists():errors.append(str(rel)+' missing local asset '+name.decode())
if errors:raise SystemExit('\n'.join(errors))
print('Public build passed: no credential patterns, forbidden paths or broken literal local links.')
