# Entity Readiness Audit

A lightweight, browser-based audit for public website signals that help people and search systems understand a site.

## What it checks

- HTTP accessibility
- Canonical URL
- Robots metadata
- Open Graph title
- JSON-LD structured data
- Recognizable identity links (GitHub, LinkedIn, ORCID, Wikidata)
- Sitemap URL discovery

## Privacy

The demo runs the fetch and parsing in the visitor's browser. It does not ask for passwords, API keys, or Search Console credentials, and it does not claim to send audit data to a backend.

Some websites block browser cross-origin requests. When that happens, the audit reports that the browser could not fetch the page instead of pretending the site failed a check.

## What this tool does not claim

A technical pass is not proof of Google indexing, ranking, Knowledge Panel eligibility, Wikidata notability, or search-engine recognition. Those outcomes depend on many factors outside this audit.

## Method

The audit is intentionally transparent: each check corresponds to a public HTML signal that a user can inspect manually in page source or developer tools. The project favors reproducible checks over opaque scores.

## Project

Live demo: https://panoskhan.github.io/projects/entity-readiness-audit/

Project author: Panos Khan — https://panoskhan.github.io/about/

## Contributing

Suggestions and improvements are welcome. Useful contributions include additional public checks, clearer explanations, browser-compatibility fixes, accessibility improvements, tests, and documentation.
