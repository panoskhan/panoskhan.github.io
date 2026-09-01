# Evidence OS security boundary

## Goal

The public site is the product interface. Sensitive processing must eventually run outside the public GitHub Pages bundle.

## Public

- SEO pages and project descriptions
- Public methodology
- Intentionally public evidence records
- Public graph visualizations
- Sanitized API responses

## Private

- API credentials and provider keys
- Private datasets
- Internal prompts and proprietary processing rules
- Authentication/session secrets
- Private research and unpublished material
- ChatGPT conversations or transcripts

## Required backend controls

1. HTTPS only.
2. Secrets stored in the deployment platform's secret manager/environment, never in source code.
3. Strict CORS allow-list.
4. Input validation and output schema validation.
5. Rate limiting and abuse protection.
6. Minimal logging; never log credentials or unnecessary private content.
7. Least-privilege service accounts.
8. Dependency and security updates.
9. Public responses must contain only data intended for the visitor.
10. The frontend must remain functional if the private API is unavailable, with a clear non-verified state rather than fabricated results.

## Important limitation

GitHub Pages is a static hosting environment. JavaScript delivered to a visitor is inspectable. Therefore, this repository must not contain proprietary secrets or logic that must remain confidential. The secure processing boundary becomes real only when the API is deployed to a server-side platform and the frontend calls that endpoint.

## Privacy rule

Never commit private conversations, credentials, access tokens, private contact information, or other secrets to this public repository.
