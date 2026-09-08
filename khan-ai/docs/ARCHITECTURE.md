# KHAN AI Architecture

```text
                         iPHONE
                    KHAN AI / SwiftUI
                           |
                    Secure API Gateway
                           |
                     ┌─────▼─────┐
                     │ KHAN CORE │
                     └─────┬─────┘
             ┌─────────────┼─────────────┐
             │             │             │
        Model Router     Memory       Tool Router
             │             │             │
       Reasoning/Fast   Task/Long     Web/Files/APIs
       Vision/Voice      Term       Automation
             └─────────────┼─────────────┘
                           │
                    Permission Guard
                           │
                     Action / Result
```

## Request lifecycle

1. Normalize the request.
2. Classify intent and risk.
3. Select a model and tools.
4. Build a minimal execution plan.
5. Execute permitted tools.
6. Verify tool results and surface uncertainty.
7. Produce the response.
8. Save only memory that is useful and allowed.

## Permission levels

- `read`: retrieve information.
- `prepare`: create a draft/plan without committing an external action.
- `confirm`: require explicit user approval before consequential execution.
- `execute`: run an already-authorized low-risk action.

## iOS boundary

The iPhone client never contains server-side provider secrets. Sensitive credentials remain server-side. App Intents expose supported KHAN actions to Apple system experiences. Actions that can affect external systems should use authentication/confirmation appropriate to their risk.

## Service contracts

The first backend contract should expose:

- `POST /v1/chat`
- `POST /v1/agent/run`
- `GET /v1/memory`
- `POST /v1/memory`
- `POST /v1/tools/authorize`
- `GET /v1/health`

These are contracts, not claims that the backend is deployed yet.
