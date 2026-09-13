import uuid

DECISIONS = {"allow", "deny", "confirm"}
PERMISSIONS = {"read", "prepare", "confirm", "execute"}


class AuthorizationBoundary:
    """In-memory authorization boundary for local development.

    Decisions are bound to a tool, permission level, and optional reason.
    Missing decisions default to ``confirm`` so the caller must explicitly
    approve consequential work before execution.
    """

    def __init__(self):
        self.decisions = {}

    def authorize(self, tool, permission_level, decision=None, reason=None):
        if not isinstance(tool, str) or not tool.strip():
            raise ValueError("tool must be a non-empty string")
        if permission_level not in PERMISSIONS:
            raise ValueError("invalid permissionLevel")
        if decision is None:
            decision = "confirm"
        if decision not in DECISIONS:
            raise ValueError("decision must be allow, deny, or confirm")
        if reason is not None and (not isinstance(reason, str) or len(reason) > 1000):
            raise ValueError("reason must be a string of at most 1000 characters")

        decision_id = uuid.uuid4().hex
        self.decisions[decision_id] = {
            "decisionId": decision_id,
            "tool": tool,
            "permissionLevel": permission_level,
            "decision": decision,
            "reason": reason,
        }
        return self.decisions[decision_id]

    def check(self, decision_id, tool, permission_level):
        record = self.decisions.get(decision_id)
        if record is None:
            return "deny"
        if record["tool"] != tool or record["permissionLevel"] != permission_level:
            return "deny"
        return record["decision"]
