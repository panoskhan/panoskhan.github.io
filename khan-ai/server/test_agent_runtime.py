import unittest

from agent_runtime import AgentRuntime


class AgentRuntimeTests(unittest.TestCase):
    def test_read_completes_without_confirmation(self):
        runtime = AgentRuntime()
        result = runtime.run("research this", "read")
        self.assertEqual(result["status"], "completed")
        self.assertEqual(result["result"]["message"], "research this")
        self.assertEqual(result["result"]["evidence"], [])

    def test_confirm_without_decision_is_blocked(self):
        runtime = AgentRuntime()
        result = runtime.run("send this", "confirm")
        self.assertEqual(result["status"], "blocked")
        self.assertIsNone(result.get("result"))
        self.assertEqual(result["steps"][-1]["status"], "blocked")

    def test_execute_requires_decision(self):
        runtime = AgentRuntime()
        result = runtime.run("do this", "execute", authorization_decision_id="decision-1")
        self.assertEqual(result["status"], "completed")

    def test_invalid_permission_is_rejected(self):
        runtime = AgentRuntime()
        with self.assertRaises(ValueError):
            runtime.run("task", "admin")

    def test_run_can_be_retrieved(self):
        runtime = AgentRuntime()
        result = runtime.run("task", "prepare")
        self.assertIs(runtime.get(result["runId"]), result)


if __name__ == "__main__":
    unittest.main()
