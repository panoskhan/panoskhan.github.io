from authorization import AuthorizationBoundary


def test_allow_matches_exact_scope():
    boundary = AuthorizationBoundary()
    record = boundary.authorize("calendar", "execute", "allow")
    assert boundary.check(record["decisionId"], "calendar", "execute") == "allow"


def test_deny_is_enforced():
    boundary = AuthorizationBoundary()
    record = boundary.authorize("calendar", "execute", "deny")
    assert boundary.check(record["decisionId"], "calendar", "execute") == "deny"


def test_confirm_is_preserved():
    boundary = AuthorizationBoundary()
    record = boundary.authorize("calendar", "execute", "confirm")
    assert boundary.check(record["decisionId"], "calendar", "execute") == "confirm"


def test_mismatched_tool_is_denied():
    boundary = AuthorizationBoundary()
    record = boundary.authorize("calendar", "execute", "allow")
    assert boundary.check(record["decisionId"], "mail", "execute") == "deny"


def test_mismatched_permission_is_denied():
    boundary = AuthorizationBoundary()
    record = boundary.authorize("calendar", "execute", "allow")
    assert boundary.check(record["decisionId"], "calendar", "prepare") == "deny"


def test_unknown_decision_id_is_denied():
    boundary = AuthorizationBoundary()
    assert boundary.check("missing", "calendar", "execute") == "deny"


def test_invalid_decision_is_rejected():
    boundary = AuthorizationBoundary()
    try:
        boundary.authorize("calendar", "execute", "maybe")
    except ValueError:
        return
    raise AssertionError("invalid authorization decision was accepted")
