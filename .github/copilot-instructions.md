For this repository, prefer local static-site validation over screenshot-based verification.

- Run `python3 scripts/validate_static.py` after HTML, data, or workflow changes that affect the published site.
- Avoid generating or attaching browser screenshots unless the user explicitly asks for visual proof.
- When manual verification is needed, prefer inspecting local HTML/CSS/JS and validator output over image artifacts from `/tmp`.
