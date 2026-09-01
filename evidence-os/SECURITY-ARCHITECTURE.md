# Evidence OS — Public / Private Architecture

## Goal

Evidence OS should be usable as a public web product without exposing proprietary server-side implementation, credentials, private datasets, or internal processing rules.

## Current state

The current GitHub Pages application is a public static prototype. Any HTML, CSS, and JavaScript shipped to the browser should be treated as public. Therefore no secret, credential, private key, or proprietary server-side algorithm belongs in the frontend.

## Target state

```text
Public browser
    |
    | HTTPS request
    v
Public Evidence OS UI
    |
    | authenticated / rate-limited API
    v
Private service boundary
    |
    +--> private processing
    +--> private database
    +--> secret manager
    +--> validation / provenance pipeline
    |
    v
Minimal public result
```

## SEO boundary

Keep indexable claims, project descriptions, methodology summaries, canonical metadata, and other intentionally public material in crawlable HTML. Private processing must not be required for Google to understand the public project identity and purpose.

## Security boundary

The future backend must:

- keep credentials server-side;
- validate and rate-limit requests;
- return only the minimum data needed by the public UI;
- avoid placing private datasets in client-side bundles;
- log provenance without storing private conversation content;
- separate public evidence records from private working data;
- support revocation and rotation of credentials;
- fail closed when a private dependency is unavailable.

## Repository privacy rule

This public repository must never contain ChatGPT conversations, private messages, access tokens, passwords, API keys, private contact information, or other secrets. The presence of a public/private architecture document does not make the repository private.

## Deployment rule

Do not deploy a fake "private backend" by placing backend code in this repository. When server-side processing is introduced, deploy it to a service with server-side secrets and access controls, then connect the static frontend to that service through a narrow API contract.

## Product principle

Public users should experience a complete product. They do not need access to the source repository to use Evidence OS. Public visibility and private implementation are compatible when the security boundary is real and server-side.