"""Dependency-free release checks for the public static-site entry points."""
from __future__ import annotations

from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html", "tools.html", "research.html", "projects.html", "ai/index.html",
    "ai/tools/website-audit.html", "ai/tools/seo-brief.html",
    "ai/tools/ad-copy-studio.html", "ai/tools/readiness-twin.html",
    "ai/tools/decision-risk.html", "ai/tools/trust-label.html",
)


def contains(page: str, pattern: str) -> bool:
    return re.search(pattern, (ROOT / page).read_text(encoding="utf-8"), re.I) is not None


def site_path(location: str) -> Path:
    path = location.removeprefix("https://panoskhan.github.io/").split("#", 1)[0]
    return ROOT / (path + "index.html" if path.endswith("/") else path)


def main() -> int:
    failures = []
    for page in PAGES:
        for name, pattern in (
            ("title", r"<title>[^<]+</title>"),
            ("description", r'<meta\s+name="description"\s+content="[^"]+"'),
            ("canonical", r'<link\s+rel="canonical"\s+href="https://panoskhan\.github\.io/[^"]+"'),
            ("Open Graph title", r'<meta\s+property="og:title"\s+content="[^"]+"'),
        ):
            if not contains(page, pattern):
                failures.append(f"{page}: missing {name}")

    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap = ET.parse(ROOT / "sitemap.xml")
    for location in sitemap.findall("sm:url/sm:loc", namespace):
        if not site_path(location.text or "").is_file():
            failures.append(f"sitemap.xml: missing target for {location.text}")

    if failures:
        print("\n".join(f"FAIL: {failure}" for failure in failures))
        return 1
    print(f"PASS: metadata and sitemap checks completed for {len(PAGES)} critical pages.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
