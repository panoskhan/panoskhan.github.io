import json
import unittest
from http.client import HTTPConnection
from threading import Thread
from http.server import ThreadingHTTPServer
from khan_server import Handler

class HealthContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.port = cls.server.server_address[1]

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()

    def test_health(self):
        conn = HTTPConnection("127.0.0.1", self.port)
        conn.request("GET", "/v1/health")
        response = conn.getresponse()
        body = json.loads(response.read())
        self.assertEqual(response.status, 200)
        self.assertEqual(body["status"], "ok")
        self.assertEqual(body["version"], "0.1.0")

    def test_unknown_route(self):
        conn = HTTPConnection("127.0.0.1", self.port)
        conn.request("GET", "/v1/unknown")
        response = conn.getresponse()
        self.assertEqual(response.status, 404)

if __name__ == "__main__":
    unittest.main()
