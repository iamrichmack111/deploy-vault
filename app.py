#!/usr/bin/env python3
"""DeployVault Lite: zero-dependency Kubernetes training server."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse, json, os, threading, webbrowser

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/drills":
            drills = []
            for name in ("core.json", "interview.json"):
                drills.extend(json.loads((ROOT / "data" / name).read_text()))
            body = json.dumps(drills).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path == "/api/health":
            body = b'{"status":"ok"}'
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path in ("/", "/index.html"):
            self.path = "/index.html"
        return super().do_GET()

    def translate_path(self, path):
        clean = path.split("?", 1)[0].split("#", 1)[0].lstrip("/")
        return str(ROOT / "static" / clean)

    def log_message(self, fmt, *args):
        if args and str(args[1]) == "200": return
        super().log_message(fmt, *args)

def main():
    parser = argparse.ArgumentParser(description="DeployVault Lite")
    parser.add_argument("--host", default=os.getenv("HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.getenv("PORT", "8080")))
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), Handler)
    url = f"http://127.0.0.1:{args.port}"
    print(f"\nDeployVault Lite running at {url}")
    print("Press Ctrl+C to stop.\n")
    if not args.no_browser:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try: server.serve_forever()
    except KeyboardInterrupt: print("\nDeployVault stopped.")
    finally: server.server_close()

if __name__ == "__main__": main()

