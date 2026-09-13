import json
import unittest
from http.client import HTTPConnection
from http.server import ThreadingHTTPServer
from threading import Thread

from khan_server import Handler


class AuthorizationHttpTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.port = cls.server.server_address[1]

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()

    def post(self, path, payload):
        conn = HTTPConnection("127.0.0.1", self.port)
        body = json.dumps(payload).encode("utf-8")
        conn.request("POST", path, body=body, headers={"Content-Type": "application/json"})
        response = conn.getresponse()
        data = json.loads(response.read())
        conn.close()
        return response.status, data

    def test_execute_without_decision_is_blocked(self):
        status, data = self.post("/v1/agent/run", {"task": "execute", "permissionLevel": "execute"})
        self.assertEqual(status, 200)
        self.assertEqual(data["status"], "blocked")
        self.assertEqual(data["steps"][-1]["status"], "blocked")

    def test_denied_decision_cannot_execute(self):
        status, decision = self.post("/v1/tools/authorize", {"tool": "agent", "permissionLevel": "execute", "decision": "deny"})
        self.assertEqual(status, 200)
        status, data = self.post("/v1/agent/run", {"task": "execute", "permissionLevel": "execute", "authorizationDecisionId": decision["decisionId"]})
        self.assertEqual(status, 200)
        self.assertEqual(data["status"], "blocked")

    def test_mismatched_tool_decision_cannot_execute(self):
        status, decision = self.post("/v1/tools/authorize", {"tool": "calendar", "permissionLevel": "execute", "decision": "allow"})
        self.assertEqual(status, 200)
        status, data = self.post("/v1/agent/run", {"task": "execute", "permissionLevel": "execute", "authorizationDecisionId": decision["decisionId"]})
        self.assertEqual(status, 200)
        self.assertEqual(data["status"], "blocked")

    def test_matching_allow_decision_can_execute(self):
        status, decision = self.post("/v1/tools/authorize", {"tool": "agent", "permissionLevel": "execute", "decision": "allow"})
        self.assertEqual(status, 200)
        status, data = self.post("/v1/agent/run", {"task": "execute", "permissionLevel": "execute", "authorizationDecisionId": decision["decisionId"]})
        self.assertEqual(status, 200)
        self.assertEqual(data["status"], "completed")
        self.assertEqual(data["result"]["evidence"], [])

    def test_confirm_decision_does_not_execute(self):
        status, decision = self.post("/v1/tools/authorize", {"tool": "agent", "permissionLevel": "execute", "decision": "confirm"})
        self.assertEqual(status, 200)
        status, data = self.post("/v1/agent/run", {"task": "execute", "permissionLevel": "execute", "authorizationDecisionId": decision["decisionId"]})
        self.assertEqual(status, 200)
        self.assertEqual(data["status"], "blocked")


if __name__ == "__main__":
    unittest.main()