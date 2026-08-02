"""Dependency-free release checks for the public static-site entry points."""
from __future__ import annotations

from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html",
    "tools.html",
    "research.html",
    "projects.html",
    "research/index.html",
    "projects/index.html",
    "capabilities/index.html",
    "device/index.html",
    "downloads/index.html",
    "open-source/index.html",
    "ai/index.html",
    "ai/tools/website-audit.html",
    "ai/tools/seo-brief.html",
    "ai/tools/ad-copy-studio.html",
    "ai/tools/readiness-twin.html",
    "ai/tools/decision-risk.html",
    "ai/tools/trust-label.html",
)


def contains(page: str, pattern: str) -> bool:
    return re.search(pattern, (ROOT / page).read_text(encoding="utf-8"), re.I) is not None


def site_path(location: str) -> Path:
    path = location.removeprefix("https://panoskhan.github.io/").split("#", 1)[0]
    if not path or path.endswith("/"):
        return ROOT / path / "index.html"
    return ROOT / path


def main() -> int:
    failures = []
    for page in PAGES:
        for name, pattern in (
            ("title", r"<title>[^<]+</title>"),
            ("description", r'<meta\s+name="description"\s+content="[^"]+"'),
            ("canonical", r'<link\s+rel="canonical"\s+href="https://panoskhan\.github\.io/[^"]*"'),
            ("Open Graph title", r'<meta\s+property="og:title"\s+content="[^"]+"'),
        ):
            if not contains(page, pattern):
                failures.append(f"{page}: missing {name}")

    # Ecosystem hubs should reference capability explorer or products
    for page in ("index.html", "ai/index.html", "capabilities/index.html"):
        if not contains(page, r"/capabilities/"):
            failures.append(f"{page}: missing capabilities link")

    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap = ET.parse(ROOT / "sitemap.xml")
    for location in sitemap.findall("sm:url/sm:loc", namespace):
        if not site_path(location.text or "").is_file():
            failures.append(f"sitemap.xml: missing target for {location.text}")

    # Capability data must list live tools
    data = (ROOT / "assets/data/capabilities.json").read_text(encoding="utf-8")
    for tool in (
        "website-audit",
        "seo-brief",
        "ad-copy-studio",
        "readiness-twin",
        "decision-risk",
        "trust-label",
    ):
        if tool not in data:
            failures.append(f"capabilities.json: missing live tool id {tool}")

    if failures:
        print("\n".join(f"FAIL: {failure}" for failure in failures))
        return 1
    print(f"PASS: metadata and sitemap checks completed for {len(PAGES)} critical pages.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
