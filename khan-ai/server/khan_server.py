from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os

HOST = os.getenv("KHAN_HOST", "127.0.0.1")
PORT = int(os.getenv("KHAN_PORT", "8787"))

class Handler(BaseHTTPRequestHandler):
    def _json(self, status, value):
        raw = json.dumps(value).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/v1/health":
            self._json(200, {"status": "ok", "version": "0.1.0"})
        else:
            self._json(404, {"error": "not_found", "message": "Route not found"})

    def log_message(self, fmt, *args):
        print("KHAN:", fmt % args)

if __name__ == "__main__":
    print(f"KHAN local backend: http://{HOST}:{PORT}")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
