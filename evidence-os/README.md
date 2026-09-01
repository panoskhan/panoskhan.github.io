# Evidence OS

Evidence OS is the evidence layer for the Panos Khan ecosystem.

## Product model

`Claim → Source → Evidence → Verification → Confidence → Provenance`

## Surfaces

- `/evidence-os/` — interactive workspace for records, search and inspection.
- `/evidence-os/graph.html` — relationship and provenance graph.
- `/evidence-os/methodology.html` — verification methodology and policy.
- `/evidence-os/registry.html` — registry inspection, local validation, import and JSON export.
- `/assets/data/evidence-os.json` — machine-readable public registry.

## Verification rules

1. A record is not verified merely because it exists in the registry.
2. A source must be identifiable and relevant to the claim it supports.
3. Independent corroboration should be distinguished from first-party material.
4. Confidence is an assessment of the available evidence, not a statement of certainty.
5. Superseded or disputed evidence should remain traceable rather than silently deleted.
6. Identity claims require multiple consistent non-sensitive signals; a matching name alone is insufficient.

## Data safety

The registry contains only intentionally public project information. Private conversations, credentials, access tokens, secrets and personal sensitive information must never be stored here.

## Roadmap

- Shared evidence components across Research, Projects and Platform Intelligence.
- Public evidence graph with provenance filters.
- Validation rules and schema versioning.
- Evidence snapshots and change history.
- Citation-quality and source-type analysis.
