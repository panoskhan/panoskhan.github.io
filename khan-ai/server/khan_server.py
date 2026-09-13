from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
import uuid

from agent_runtime import AgentRuntime
from model_adapter import LocalModelAdapter

HOST = os.getenv("KHAN_HOST", "127.0.0.1")
PORT = int(os.getenv("KHAN_PORT", "8787"))
VERSION = "0.1.0"
MAX_BODY_BYTES = 256 * 1024
MAX_MESSAGE_CHARS = 12000
MODEL = LocalModelAdapter()
AGENT = AgentRuntime(MODEL)


def json_error(code, message, request_id=None):
    value = {"error": code, "message": message}
    if request_id:
        value["requestId"] = request_id
    return value


class Handler(BaseHTTPRequestHandler):
    def _json(self, status, value):
        raw = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def _request_id(self):
        return uuid.uuid4().hex

    def _read_json(self):
        length = self.headers.get("Content-Length")
        try:
            length = int(length) if length is not None else 0
        except ValueError:
            return None, "invalid_request", "Content-Length must be an integer"
        if length <= 0:
            return None, "invalid_request", "Request body is required"
        if length > MAX_BODY_BYTES:
            return None, "invalid_request", "Request body is too large"
        try:
            raw = self.rfile.read(length)
            return json.loads(raw.decode("utf-8")), None, None
        except (UnicodeDecodeError, json.JSONDecodeError):
            return None, "invalid_request", "Request body must be valid JSON"

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/v1/health":
            self._json(200, {"status": "ok", "version": VERSION})
            return
        if path.startswith("/v1/agent/runs/"):
            run_id = path.rsplit("/", 1)[-1]
            record = AGENT.get(run_id)
            if record is None:
                self._json(404, json_error("not_found", "Run not found"))
            else:
                self._json(200, record)
            return
        self._json(404, json_error("not_found", "Route not found"))

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        request_id = self._request_id()
        if path not in {"/v1/chat", "/v1/agent/run"}:
            self._json(404, json_error("not_found", "Route not found", request_id))
            return

        payload, error, message = self._read_json()
        if error:
            self._json(400, json_error(error, message, request_id))
            return
        if not isinstance(payload, dict):
            self._json(400, json_error("invalid_request", "JSON body must be an object", request_id))
            return

        if path == "/v1/chat":
            user_message = payload.get("message")
            if not isinstance(user_message, str) or not user_message.strip():
                self._json(400, json_error("invalid_request", "message must be a non-empty string", request_id))
                return
            if len(user_message) > MAX_MESSAGE_CHARS:
                self._json(400, json_error("invalid_request", "message exceeds the maximum length", request_id))
                return
            session_id = payload.get("sessionId")
            if session_id is not None and (not isinstance(session_id, str) or len(session_id) > 128):
                self._json(400, json_error("invalid_request", "sessionId must be a string of at most 128 characters", request_id))
                return
            self._json(200, {"message": MODEL.generate(user_message), "sessionId": session_id or uuid.uuid4().hex, "requestId": request_id})
            return

        task = payload.get("task")
        permission_level = payload.get("permissionLevel")
        try:
            record = AGENT.run(task, permission_level, payload.get("authorizationDecisionId"), payload.get("sessionId"))
        except ValueError as exc:
            self._json(400, json_error("invalid_request", str(exc), request_id))
            return
        self._json(200, record)

    def log_message(self, fmt, *args):
        print("KHAN:", fmt % args)


if __name__ == "__main__":
    print(f"KHAN local backend: http://{HOST}:{PORT}")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
