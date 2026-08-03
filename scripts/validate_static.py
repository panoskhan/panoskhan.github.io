"""Dependency-free release checks for the public static-site entry points."""
from __future__ import annotations

from pathlib import Path
import json
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
    "platform/index.html",
    "intelligence/index.html",
    "intelligence/website-health/index.html",
    "open-source/index.html",
    "docs/index.html",
    "docs/architecture/index.html",
    "docs/guides/components.html",
    "docs/guides/product-hub-template.html",
    "labs/index.html",
    "templates/index.html",
    "ai/index.html",
    "ai/tools/website-audit.html",
    "ai/tools/seo-brief.html",
    "ai/tools/ad-copy-studio.html",
    "ai/tools/readiness-twin.html",
    "ai/tools/decision-risk.html",
    "ai/tools/trust-label.html",
    "contact.html",
    "services.html",
    "credentials.html",
    "quality-dashboard.html",
)


def contains(page: str, pattern: str) -> bool:
    return re.search(pattern, (ROOT / page).read_text(encoding="utf-8"), re.I) is not None


def site_path(location: str) -> Path:
    path = (location or "").removeprefix("https://panoskhan.github.io/")
    path = path.split("#", 1)[0].split("?", 1)[0].lstrip("/")
    if not path or path.endswith("/"):
        return ROOT / path / "index.html"
    return ROOT / path


def resolve_local(url: str) -> Path | None:
    if not url:
        return None
    if url.startswith(("mailto:", "tel:", "data:", "//")):
        return None
    if url.startswith(("http://", "https://")):
        if not url.startswith("https://panoskhan.github.io/"):
            return None
        url = url[len("https://panoskhan.github.io") :]
    path = url.split("#", 1)[0].split("?", 1)[0]
    if path and not path.startswith("/"):
        # Registry URLs are site-root absolute; ignore relative unknowns.
        if "://" in path:
            return None
        path = "/" + path
    return site_path(path)


def page_ids(path: Path) -> set[str]:
    if not path.is_file():
        return set()
    text = path.read_text(encoding="utf-8")
    return set(re.findall(r'\bid=["\']([^"\']+)["\']', text))


def collect_urls(node, out: list[str]) -> None:
    if isinstance(node, dict):
        for key, value in node.items():
            if key in {"url", "path", "href"} and isinstance(value, str):
                out.append(value)
            else:
                collect_urls(value, out)
    elif isinstance(node, list):
        for item in node:
            collect_urls(item, out)


def main() -> int:
    failures = []
    for page in PAGES:
        if not (ROOT / page).is_file():
            failures.append(f"{page}: missing file")
            continue
        for name, pattern in (
            ("title", r"<title>[^<]+</title>"),
            ("description", r'<meta\s+name="description"\s+content="[^"]+"'),
            ("canonical", r'<link\s+rel="canonical"\s+href="https://panoskhan\.github\.io/[^"]*"'),
            ("Open Graph title", r'<meta\s+property="og:title"\s+content="[^"]+"'),
        ):
            if not contains(page, pattern):
                failures.append(f"{page}: missing {name}")

    # Ecosystem hubs should reference capability explorer or products
    for page in ("index.html", "ai/index.html", "capabilities/index.html", "intelligence/index.html"):
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

    # Phase 2 registries must exist and stay non-empty
    for rel in (
        "assets/data/products.json",
        "assets/data/search-index.json",
        "assets/data/downloads.json",
        "assets/data/capabilities.json",
        "assets/data/platform-registry.json",
        "assets/data/knowledge-graph.json",
    ):
        target = ROOT / rel
        if not target.is_file() or target.stat().st_size < 20:
            failures.append(f"{rel}: missing or empty registry")

    for page in ("docs/index.html", "labs/index.html", "index.html", "platform/index.html"):
        if not contains(page, r"/docs/") and page != "platform/index.html":
            failures.append(f"{page}: missing docs link")

    # Favicon assets must exist for browser default requests
    for rel in ("favicon.ico", "favicon.svg"):
        if not (ROOT / rel).is_file():
            failures.append(f"{rel}: missing favicon asset")

    # Planned future product slots are intentional placeholders.
    planned_paths = set()
    products_payload = json.loads((ROOT / "assets/data/products.json").read_text(encoding="utf-8"))
    for item in products_payload.get("future", []):
        if isinstance(item, dict) and item.get("path"):
            planned_paths.add(item["path"].rstrip("/") + "/")
            planned_paths.add(item["path"])

    cap_data = json.loads((ROOT / "assets/data/capabilities.json").read_text(encoding="utf-8"))
    DYNAMIC_ANCHOR_PAGES = {"downloads/index.html", "research/index.html", "projects/index.html", "services.html"}
    capability_ids = {
        c.get("id")
        for c in cap_data.get("capabilities", [])
        if isinstance(c, dict) and c.get("id")
    }

    # Registry URLs must resolve; fragment targets must exist on static pages
    # (capabilities explorer ids are rendered client-side from the same JSON).
    for rel in (
        "assets/data/products.json",
        "assets/data/search-index.json",
        "assets/data/downloads.json",
        "assets/data/capabilities.json",
        "assets/data/platform-registry.json",
    ):
        payload = json.loads((ROOT / rel).read_text(encoding="utf-8"))
        urls: list[str] = []
        collect_urls(payload, urls)
        for url in urls:
            if "#" in url:
                page_part, frag = url.split("#", 1)
            else:
                page_part, frag = url, ""
            normalized = page_part or url
            if normalized in planned_paths or normalized.rstrip("/") + "/" in planned_paths:
                continue
            target = resolve_local(normalized)
            if target is None:
                continue
            if not target.is_file():
                failures.append(f"{rel}: missing target for {url}")
                continue
            if not frag:
                continue
            rel_page = str(target.relative_to(ROOT)).replace("\\", "/")
            if rel_page.startswith("capabilities/") and frag in capability_ids:
                continue
            ids = page_ids(target)
            if frag not in ids:
                if rel_page in DYNAMIC_ANCHOR_PAGES:
                    continue
                failures.append(f"{rel}: missing anchor {url}")

    # Core JS assets must exist
    for rel in (
        "assets/js/site.js",
        "assets/js/ai-platform.js",
        "assets/js/capabilities.js",
        "assets/js/tools.js",
        "assets/js/platform.js",
        "assets/js/search-engine.js",
        "assets/js/knowledge-engine.js",
        "assets/js/recommendation-engine.js",
        "assets/js/health-engine.js",
        "assets/js/report-engine.js",
    ):
        target = ROOT / rel
        if not target.is_file():
            failures.append(f"{rel}: missing script")
        elif rel.endswith("ai-platform.js"):
            text = target.read_text(encoding="utf-8")
            if "setupMobileNav" in text and "PhoenixSite" not in text:
                failures.append(f"{rel}: expected PhoenixSite guard for mobile nav")
            if "if (!window.PhoenixSite)" not in text:
                failures.append(f"{rel}: mobile nav must defer to PhoenixSite when present")
    if failures:
        print("\n".join(f"FAIL: {failure}" for failure in failures))
        return 1
    print(f"PASS: metadata, registry, and sitemap checks completed for {len(PAGES)} critical pages.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
