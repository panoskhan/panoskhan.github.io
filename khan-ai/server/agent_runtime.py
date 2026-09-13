import uuid

from authorization import AuthorizationBoundary
from model_adapter import LocalModelAdapter

PERMISSIONS = {"read", "prepare", "confirm", "execute"}


class AgentRuntime:
    """Small in-memory agent lifecycle implementation for local development."""

    def __init__(self, model=None, authorization=None):
        self.model = model or LocalModelAdapter()
        self.authorization = authorization or AuthorizationBoundary()
        self.runs = {}

    def run(self, task, permission_level, authorization_decision_id=None, session_id=None):
        if not isinstance(task, str) or not task.strip():
            raise ValueError("task must be a non-empty string")
        if len(task) > 12000:
            raise ValueError("task exceeds the maximum length")
        if permission_level not in PERMISSIONS:
            raise ValueError("invalid permissionLevel")
        if session_id is not None and (not isinstance(session_id, str) or len(session_id) > 128):
            raise ValueError("sessionId must be a string of at most 128 characters")

        run_id = uuid.uuid4().hex
        steps = [{"id": uuid.uuid4().hex, "kind": "plan", "status": "completed", "summary": "Task normalized and execution scope selected."}]

        decision = "allow" if permission_level in {"read", "prepare"} else self.authorization.check(
            authorization_decision_id, "agent", permission_level
        )
        if decision != "allow":
            steps.append({"id": uuid.uuid4().hex, "kind": "verify", "status": "blocked", "summary": "Authorization did not permit execution."})
            record = {"runId": run_id, "status": "blocked", "steps": steps}
            self.runs[run_id] = record
            return record

        steps.append({"id": uuid.uuid4().hex, "kind": "tool", "status": "completed", "summary": "Local model adapter executed without external side effects."})
        response = self.model.generate(task)
        steps.append({"id": uuid.uuid4().hex, "kind": "verify", "status": "completed", "summary": "Local result produced; no external evidence was claimed."})
        steps.append({"id": uuid.uuid4().hex, "kind": "respond", "status": "completed", "summary": "Agent response prepared."})
        record = {"runId": run_id, "status": "completed", "steps": steps, "result": {"message": response, "evidence": []}}
        self.runs[run_id] = record
        return record

    def get(self, run_id):
        return self.runs.get(run_id)
