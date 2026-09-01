# Evidence OS

Evidence OS is the evidence layer for the Panos Khan ecosystem.

## Product model

`Claim → Source → Evidence → Verification → Confidence → Provenance`

## Surfaces

- `/evidence-os/` — interactive workspace for records, search and inspection.
- `/evidence-os/graph.html` — relationship and provenance graph.
- `/evidence-os/methodology.html` — verification methodology and policy.
- `/evidence-os/registry.html` — registry inspection, local validation, import and JSON export.
- `/evidence-os/private-engine-demo.html` — public explanation of the intended public-product/private-engine boundary.
- `/assets/data/evidence-os.json` — machine-readable public registry.

## Verification rules

1. A record is not verified merely because it exists in the registry.
2. A source must be identifiable and relevant to the claim it supports.
3. Independent corroboration should be distinguished from first-party material.
4. Confidence is an assessment of the available evidence, not a statement of certainty.
5. Superseded or disputed evidence should remain traceable rather than silently deleted.
6. Identity claims require multiple consistent non-sensitive signals; a matching name alone is insufficient.

## Public/private architecture

The website is intentionally public and SEO-readable. Browser code must be treated as public. Proprietary processing is therefore **not** considered private until it runs on a server-side service outside the public static site.

Target production flow:

`Public HTML/UI → HTTPS API → authenticated server-side service → private data/logic → minimal result`

The public layer should contain indexable descriptions, methodology, intentionally public evidence and accessible results. The private layer should contain credentials, private datasets, proprietary algorithms and internal processing. Secrets must be supplied through the deployment platform's secret manager, never committed to Git.

## Data safety

The registry contains only intentionally public project information. Private conversations, credentials, access tokens, secrets and personal sensitive information must never be stored here. This repository is public, so every committed file must be treated as public.

## Production rollout

1. Freeze the public schema and result contract.
2. Implement a small server-side verification API outside GitHub Pages.
3. Add authentication, rate limiting, CORS allow-listing, validation and structured error handling.
4. Move sensitive processing/data behind that API; keep the browser as an untrusted client.
5. Add observability without logging secrets or private payloads.
6. Run integration, accessibility, security and SEO checks before switching production traffic.
7. Keep a deterministic public fallback for informational pages when the API is unavailable; never fabricate verification results.

## Roadmap

- Shared evidence components across Research, Projects and Platform Intelligence.
- Public evidence graph with provenance filters.
- Validation rules and schema versioning.
- Evidence snapshots and change history.
- Citation-quality and source-type analysis.
- Production API deployment with a private processing boundary.
- Automated regression checks for schema, links, accessibility and SEO.
