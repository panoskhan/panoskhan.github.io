import json
import unittest
from http.client import HTTPConnection
from threading import Thread
from http.server import ThreadingHTTPServer
from khan_server import Handler


class ChatContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.port = cls.server.server_address[1]

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()

    def request(self, method, path, payload=None):
        conn = HTTPConnection("127.0.0.1", self.port)
        body = None if payload is None else json.dumps(payload)
        headers = {} if body is None else {"Content-Type": "application/json"}
        conn.request(method, path, body=body, headers=headers)
        response = conn.getresponse()
        raw = response.read()
        return response.status, json.loads(raw)

    def test_chat_rejects_missing_message(self):
        status, body = self.request("POST", "/v1/chat", {})
        self.assertEqual(status, 400)
        self.assertEqual(body["error"], "invalid_request")

    def test_chat_rejects_empty_message(self):
        status, body = self.request("POST", "/v1/chat", {"message": ""})
        self.assertEqual(status, 400)
        self.assertEqual(body["error"], "invalid_request")


if __name__ == "__main__":
    unittest.main()
