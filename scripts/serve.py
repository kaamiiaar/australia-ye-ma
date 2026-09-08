#!/usr/bin/env python3
"""Loopback preview serving public assets only, never .private, .git or credentials."""
import http.server
from pathlib import Path
from urllib.parse import unquote,urlsplit
import argparse
root=Path(__file__).resolve().parents[1]
allowed={'index.html','app.js','data.js','features.js','exchange.js','styles.css','favicon.svg'}
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(root),**kwargs)
    def send_head(self):
        path=unquote(urlsplit(self.path).path).lstrip('/') or 'index.html'
        target=(root/path).resolve()
        if (path not in allowed and not path.startswith('assets/')) or root not in target.parents or not target.is_file() or any(p.startswith('.') for p in Path(path).parts):
            self.send_error(404);return None
        return super().send_head()
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=4198);args=parser.parse_args()
    http.server.ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
