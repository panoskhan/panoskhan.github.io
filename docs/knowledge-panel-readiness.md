# Panos Khan: knowledge panel preparation

Checked 29 October 2026. Google decides whether to display a knowledge panel. This work improves public identity information; it does not guarantee a panel.

## Prepared website changes

PR #117 adds ProfilePage → Person markup to `/about/`, including a portrait and seven visible public-profile links. It preserves the existing shared person identifier. The homepage uses WebPage markup alongside its existing Person and WebSite records. Unsupported historical profile dates, automatic VERIFIED badges and labels implying that directories are independent recognition have been replaced. The two changed pages have updated sitemap modification dates.

The JSON-LD parses, required person fields and visible profile links pass checks, JavaScript syntax passes, and the diff has no whitespace errors. The existing release checker reports four missing local sitemap targets on both the base and changed revisions: `/ai-universe/`, `/thumbnail-truth/`, `/free-ai-academy-greece/` and `/greece-life-admin/`. All four live URLs returned HTTP 200. The checker assumes every sitemap URL is a file in this repository; that existing limitation remains unresolved.

## Remaining actions, in order

1. **Deploy and validate the website changes.** Review PR #117, resolve repository checks or conflicts, and deploy. Test the live About page with Google's Rich Results Test and confirm the new markup and reference labels are visible.
2. **Check the correct Search Console property.** Windsor.ai currently lists `https://panoskhan.github.io/` and `https://panoskhan.github.io/ai/`, not `panoskhan.online`. This does not prove the custom domain is absent from Search Console itself. Select or add the custom-domain property and complete Google's verification. A verification HTML file exists in this repository, but that alone does not prove successful verification.
3. **Submit and inspect.** Submit `https://panoskhan.online/sitemap.xml`. Inspect the homepage and `/about/`, check Google's selected canonical, run live tests and request indexing. Keep the actual results. The live pages, portrait, robots.txt and sitemap returned HTTP 200; robots.txt permits crawling.
4. **Confirm facts before changing profiles.** Clarify whether the current base is Greece, Switzerland or both, and distinguish residence from work locations. Confirm what professional activity began in 2002. The reply “yes” to a bundled question did not identify a location choice; no location or career facts were changed.
5. **Align public profiles.** Check LinkedIn, GitHub, ORCID, Crunchbase, About.me and Medium for accurate name, role and website links. Use `https://panoskhan.online/` as the website where appropriate. Link credentials to issuer records. The website currently presents Greece, while Crunchbase lists Geneva and describes work between Greece and Switzerland; explain the relationship consistently.
6. **Build substantive public evidence.** The limited search reviewed mostly the personal website, directories and self-published work. No substantial independent editorial coverage was identified in that search. Maintain a dated list of actual projects, publications, credentials, interviews and speaker biographies. Seek independent coverage when the work merits it. Keep first-party material clearly distinguished from independent reporting.
7. **Review existing reference records.** Wikidata Q141592296 exists and many statements cite the personal website. Correct demonstrable errors with appropriate sources. A Wikidata entry does not establish Google approval.
8. **Monitor and claim if offered.** Track actual name-related Search Console queries using consistent periods. Periodically search for Panos Khan. If a panel appears with “Claim this knowledge panel,” follow Google's verification process through an official associated account. There is no fixed date for panel creation.

## Access and data limitations

Remote Desktop Commander lists the Mac as offline. No local-browser or Search Console UI actions were performed. Third-party profiles and DNS records were not edited.

Windsor.ai blocked search-data reads because two connected properties exceed the current one-property plan allowance. Its returned zeros were explicitly placeholders, not real metrics. No performance figures are inferred, no accounts were disconnected and no billing changes were made. Resolve the connection allowance before relying on this reporting route.

Google's Search profile route currently requires at least 10,000 followers on one supported platform (Instagram, TikTok, YouTube or X), with availability listed for the US, Canada and India. Eligibility has not been established for this account. A Greece-based presence should not assume that route is available; use Google's eligibility check for the current result.

## Official guidance

- [ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Search profiles and eligibility](https://creators.google/profile)
- [Claim an existing knowledge panel](https://support.google.com/knowledgepanel/answer/7534902?hl=en)
- [How Google knowledge panels work](https://blog.google/products-and-platforms/products/search/about-knowledge-graph-and-knowledge-panels/)

## Public records reviewed

- [Website](https://panoskhan.online/) and [About page](https://panoskhan.online/about/)
- [Crunchbase](https://www.crunchbase.com/person/panos-khan)
- [Wikidata](https://www.wikidata.org/wiki/Q141592296)
- [LinkedIn](https://www.linkedin.com/in/panos-khan-pk)
- [About.me](https://about.me/panoskhan)
