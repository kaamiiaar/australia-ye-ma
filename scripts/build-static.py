#!/usr/bin/env python3
"""Produce an explicit public-file allowlist; never include repository/private files."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
out=root/'dist'
if out.is_symlink(): raise SystemExit('Refusing symlink output directory')
if out.exists(): shutil.rmtree(out)
out.mkdir()
for name in ('index.html','app.js','data.js','features.js','exchange.js','styles.css','favicon.svg'):
    shutil.copyfile(root/name,out/name)
shutil.copytree(root/'assets',out/'assets',dirs_exist_ok=True)
(out/'.nojekyll').touch()
print('Public static files prepared in dist/.')
