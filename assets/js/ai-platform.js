/* ============================================================
   Panos Khan AI Platform — ai-platform.js
   Dynamic Layout Wrapping, Tools Registry, and Interactive UI
   ============================================================ */

const AIPlatform = (function() {
  // ── 1. Tools Registry (The Heart of the Platform) ─────────
  const toolsRegistry = {
    "website-audit": {
      id: "website-audit",
      name: "Website Health",
      category: "Health",
      description: "Generate a shared Platform Intelligence report for messaging, discoverability, trust, and conversion readiness.",
      featured: true,
      url: "/intelligence/website-health/",
      icon: "🌐",
      docs: {
        overview: "Website Health is the Platform Intelligence capability for reviewing messaging, discoverability, trust, and conversion readiness through one shared report contract.",
        how_it_works: "Input your business details, target URL, and primary digital growth objective. The shared runtime applies deterministic diagnostic heuristics and produces a canonical Platform Intelligence health report.",
        best_practices: "For high-fidelity recommendations, ensure that the target audience is described with specific attributes (e.g., 'Enterprise CTOs' rather than just 'business people') and specify concrete commercial objectives."
      },
      faqs: [
        { q: "Does this tool actually scan my live website?", a: "No, this is a diagnostic model that uses client-side heuristics. It analyzes the specific business parameters, positioning gaps, and industry characteristics you provide to produce an optimization plan matching actual consultant outputs." },
        { q: "What is AI-agent crawlability?", a: "It refers to how easily LLM-based crawlers (like GPTBot, ClaudeBot, or Perplexity) can parse, index, and reference your site content when answering user prompts. Our audit highlights gaps such as missing schema or lack of AI agent directives." }
      ],
      changelog: [
        { version: "v2.0.0", date: "2026-08-03", changes: ["Migrated to /intelligence/website-health/", "Moved output to the shared Platform Intelligence runtime"] },
        { version: "v1.2.0", date: "2026-07-20", changes: ["Added explicit schema markup checks", "Enriched conversion optimization priority outputs"] }
      ],
      related: ["seo-brief", "readiness-twin"]
    },
    "seo-brief": {
      id: "seo-brief",
      name: "AI SEO Brief Generator",
      category: "Growth",
      description: "Generates deterministic, client-ready SEO content briefs with strategic consultant framing.",
      featured: false,
      url: "/ai/tools/seo-brief.html",
      icon: "✍️",
      docs: {
        overview: "The SEO Brief Generator streamlines content marketing workflows by transforming raw target keywords into comprehensive, search-optimized publishing blueprints. It designs optimal article structures, semantic headings, and search-intent angles that rank.",
        how_it_works: "Provide a primary focus keyword, target audience, business type, and geographic market. The tool models intent signals and search engine optimization patterns to generate a fully structured brief containing title options, headers, and outline guidelines.",
        best_practices: "Always input a specific primary keyword (e.g., 'AI customer support automation') instead of a broad topic (e.g., 'customer service') to get a highly precise content outline."
      },
      faqs: [
        { q: "Is the brief layout compatible with standard writing teams?", a: "Yes. The generated brief matches the standard format used by premium marketing agencies worldwide, including primary keyword placement, outline headers, search intent framing, and content-length suggestions." },
        { q: "Can this be used for localized SEO?", a: "Absolutely. By entering a specific location / market (such as 'Greece' or 'Athens, Greece'), the generator shapes title angles and search intent points tailored for regional audiences." }
      ],
      changelog: [
        { version: "v1.1.0", date: "2026-07-10", changes: ["Added local market optimization factors", "Refined search intent categorization"] },
        { version: "v1.0.0", date: "2026-06-01", changes: ["Initial release of the SEO Brief Generator tool"] }
      ],
      related: ["website-audit", "ad-copy-studio"]
    },
    "ad-copy-studio": {
      id: "ad-copy-studio",
      name: "AI Ad Copy Studio",
      category: "Growth",
      description: "Generates deterministic ad headlines, descriptions, CTA ideas, and testing angles.",
      featured: false,
      url: "/ai/tools/ad-copy-studio.html",
      icon: "📢",
      docs: {
        overview: "The AI Ad Copy Studio generates multi-angle paid media assets for Google, LinkedIn, and Meta campaigns. It translates product benefits and core offers into structured copy variations designed to capture attention and lower customer acquisition costs.",
        how_it_works: "Input your core offer, primary customer pain points, target audience, and brand tone. The tool maps these parameters to high-performance ad-copy architectures (e.g., benefit-driven, pain-point, social proof, direct-action) to generate structured testing sets.",
        best_practices: "Test at least two different brand tones (e.g., 'Professional' vs 'Direct & Bold') to see how the conversion angles shift."
      },
      faqs: [
        { q: "What copy architectures does the tool support?", a: "It utilizes several proven copy frameworks, including direct-response benefits, pain-point mitigation, social proof reinforcement, and curiosity-driven hooks." },
        { q: "Are the generated lengths compliant with ad platform constraints?", a: "Yes, headlines and descriptions are structured to align with standard platform specifications (e.g., Google's 30-character headline / 90-character description boundaries)." }
      ],
      changelog: [
        { version: "v1.0.5", date: "2026-07-15", changes: ["Added social-proof copy frameworks", "Updated character limit guardrails"] },
        { version: "v1.0.0", date: "2026-06-12", changes: ["Initial launch of the Ad Copy Studio"] }
      ],
      related: ["seo-brief", "website-audit"]
    },
    "readiness-twin": {
      id: "readiness-twin",
      name: "AI Readiness Twin",
      category: "Strategy",
      description: "Builds dual tracks: immediate 30-day quick wins and strategic 12-month transformation priorities.",
      featured: true,
      url: "/ai/tools/readiness-twin.html",
      icon: "🧠",
      docs: {
        overview: "The AI Readiness Twin helps organizations transition from experimental AI usage to structured, high-value capabilities. It creates dual-track roadmaps consisting of low-barrier 30-day proof-of-value wins and long-term 12-month strategic priorities.",
        how_it_works: "Specify your industry and top operational challenge. The system models industry-specific baseline workflows to structure instant quick wins and build robust governance, pilot testing, and scalability frameworks.",
        best_practices: "Focus on a narrow, high-friction operational challenge (e.g., 'slow response to RFPs' or 'high customer-service triage load') to get highly contextual and practical steps."
      },
      faqs: [
        { q: "What are 'dual tracks'?", a: "To succeed in AI, companies must show immediate traction while planning durable infrastructure. Track 1 (Quick Wins) delivers speed and team momentum; Track 2 (Strategic Transformation) outlines the governance, data integration, and systems architecture needed to sustain growth." },
        { q: "Do I need technical expertise to use this?", a: "Not at all. The recommendations are designed for team leads, directors, and executives who need to plan digital transformation initiatives with clear KPIs and roles." }
      ],
      changelog: [
        { version: "v1.1.2", date: "2026-07-28", changes: ["Added industry-specific baseline KPIs", "Enriched governance checklists"] },
        { version: "v1.0.0", date: "2026-04-20", changes: ["Initial release of the AI Readiness Twin"] }
      ],
      related: ["website-audit", "decision-risk"]
    },
    "decision-risk": {
      id: "decision-risk",
      name: "AI Decision Risk Simulator",
      category: "Risk",
      description: "Simulates legal, bias, security, adoption, and brand risk levels for any planned AI initiative.",
      featured: false,
      url: "/ai/tools/decision-risk.html",
      icon: "⚖️",
      docs: {
        overview: "The AI Decision Risk Simulator evaluates critical risk dimensions (Legal, Security, Bias, Adoption, Reputation) before deploying AI initiatives. It provides risk mitigation strategies to ensure governance and alignment.",
        how_it_works: "Submit your planned use-case and the sensitivity level of the underlying customer or company data. The simulator models risk distribution scores and outlines crucial human-in-the-loop review steps and audit gates.",
        best_practices: "When reviewing high-sensitivity initiatives, combine this simulation with the AI Trust Label Generator to create a dual-front transparency and risk management protocol."
      },
      faqs: [
        { q: "How is the risk index calculated?", a: "It uses data sensitivity levels and use-case parameters to estimate baseline operational vulnerabilities across five separate risk dimensions based on current global regulatory standards." },
        { q: "How do I mitigate high security/privacy risks?", a: "The simulator generates customized rules, such as establishing human approval gates, scrubbing personal data, and logging all automated decisions for transparency." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-06-25", changes: ["Initial launch of the Decision Risk Simulator"] }
      ],
      related: ["trust-label", "readiness-twin"]
    },
    "trust-label": {
      id: "trust-label",
      name: "AI Trust Label Generator",
      category: "Risk",
      description: "Creates a publishable transparency statement on responsible AI usage for your clients and visitors.",
      featured: false,
      url: "/ai/tools/trust-label.html",
      icon: "🛡️",
      docs: {
        overview: "The AI Trust Label Generator helps modern businesses establish client credibility by generating clear, publishable statements of responsible AI stewardship. This helps address consumer concern over data usage and model boundaries.",
        how_it_works: "Provide your business name and detail how you utilize AI in your workflows. The tool constructs a structured, five-part transparency declaration confirming human oversight, data privacy, and model validation.",
        best_practices: "Publish the generated text directly on your privacy policy page, about section, or custom footer trust-link to build maximum brand credibility."
      },
      faqs: [
        { q: "Why do I need an AI Trust Label?", a: "In an era of rising concern over data scraping and black-box automation, establishing transparency about where AI is (and is not) used builds durable competitive trust with customers." },
        { q: "Can I customize the generated label?", a: "Yes. The generated output serves as a high-quality consultant-drafted baseline that you can copy, edit, and expand as your organization's specific policies grow." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-07-02", changes: ["Initial release of the AI Trust Label Generator"] }
      ],
      related: ["decision-risk", "website-audit"]
    },
    "meta-tag-generator": {
      id: "meta-tag-generator",
      name: "Meta Tag Generator",
      category: "SEO",
      description: "Generate complete HTML meta tags for SEO, Open Graph, and Twitter Cards with live preview.",
      featured: true,
      url: "/ai/tools/meta-tag-generator.html",
      icon: "🏷️",
      docs: {
        overview: "The Meta Tag Generator creates complete, standards-compliant HTML meta tags including basic SEO tags, Open Graph tags for social sharing, and Twitter Card tags. Every tag follows current best practices for search engine optimization and social media previews.",
        how_it_works: "Enter your page title, description, URL, content type, author, and keywords. The tool generates all required meta tags in a copy-ready HTML format.",
        best_practices: "Keep titles under 60 characters and descriptions between 150-160 characters for optimal display in search results. Always include Open Graph tags for better social media sharing."
      },
      faqs: [
        { q: "Which meta tags are most important for SEO?", a: "Title and description are the most critical. They directly influence click-through rates from search results. Open Graph tags are essential for social media sharing visibility." },
        { q: "Do I need both OG and Twitter Card tags?", a: "Twitter will fall back to OG tags if Twitter-specific tags are missing, but including both ensures optimal display across all platforms." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with SEO, OG, and Twitter Card tag generation"] }
      ],
      related: ["og-generator", "schema-generator"]
    },
    "robots-txt-generator": {
      id: "robots-txt-generator",
      name: "Robots.txt Generator",
      category: "SEO",
      description: "Create a properly formatted robots.txt file with user-agent rules, disallow paths, and sitemap directives.",
      featured: true,
      url: "/ai/tools/robots-txt-generator.html",
      icon: "🤖",
      docs: {
        overview: "The Robots.txt Generator creates correctly formatted robots.txt files that control how search engine crawlers interact with your website. It supports multiple user-agent configurations, disallow rules, and sitemap declarations.",
        how_it_works: "Specify your sitemap URL, paths to disallow, crawl delay preference, and which search engines to allow. The tool generates a standards-compliant robots.txt file ready to deploy.",
        best_practices: "Always include your sitemap URL in robots.txt. Be careful with disallow rules — overly restrictive rules can prevent important pages from being indexed."
      },
      faqs: [
        { q: "Where do I place the robots.txt file?", a: "It must be placed at the root of your domain, e.g., https://example.com/robots.txt. Search engines will not find it in subdirectories." },
        { q: "Can robots.txt block all crawlers?", a: "Yes, using 'User-agent: * / Disallow: /' will request all crawlers to avoid your entire site. Note that this is a directive, not a security measure — malicious bots may ignore it." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with multi-agent and sitemap support"] }
      ],
      related: ["sitemap-generator", "canonical-checker"]
    },
    "sitemap-generator": {
      id: "sitemap-generator",
      name: "Sitemap Generator",
      category: "SEO",
      description: "Create a valid XML sitemap from a list of URLs with configurable priority and change frequency.",
      featured: true,
      url: "/ai/tools/sitemap-generator.html",
      icon: "🗺️",
      docs: {
        overview: "The Sitemap Generator creates valid XML sitemaps from a list of URLs. Sitemaps help search engines discover and index your pages more efficiently, improving your site's visibility in search results.",
        how_it_works: "Paste your URLs (one per line), select a default priority and change frequency. The tool generates a complete XML sitemap with proper formatting and today's date as the last modification timestamp.",
        best_practices: "Include all important pages but exclude utility pages like login or admin URLs. Set higher priority (0.8-1.0) for key landing pages and lower priority (0.3-0.5) for less important content."
      },
      faqs: [
        { q: "How many URLs can a sitemap contain?", a: "A single sitemap can contain up to 50,000 URLs and must not exceed 50MB uncompressed. For larger sites, use a sitemap index file." },
        { q: "How do I submit my sitemap to Google?", a: "Submit it through Google Search Console, or reference it in your robots.txt file with a Sitemap: directive." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with bulk URL support"] }
      ],
      related: ["robots-txt-generator", "meta-tag-generator"]
    },
    "schema-generator": {
      id: "schema-generator",
      name: "Schema Markup Generator",
      category: "SEO",
      description: "Generate JSON-LD structured data for Organization, Article, Product, FAQ, and LocalBusiness schema types.",
      featured: true,
      url: "/ai/tools/schema-generator.html",
      icon: "📋",
      docs: {
        overview: "The Schema Markup Generator creates valid JSON-LD structured data that helps search engines understand your content. It supports the most commonly used schema types including Organization, Article, Product, FAQPage, and LocalBusiness.",
        how_it_works: "Select a schema type, fill in the required fields (name, description, URL), and the tool generates a complete JSON-LD script ready to paste into your HTML head section.",
        best_practices: "Use the Google Rich Results Test to validate your schema after implementation. Choose the schema type that most accurately represents your page content."
      },
      faqs: [
        { q: "Does schema markup improve rankings?", a: "Schema doesn't directly boost rankings, but it enables rich results (star ratings, FAQ dropdowns, product prices) that significantly improve click-through rates." },
        { q: "Where should I place the JSON-LD script?", a: "Google recommends placing JSON-LD in the <head> section, though it also works in the <body>. The <head> placement is considered best practice." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with 5 schema types"] }
      ],
      related: ["meta-tag-generator", "og-generator"]
    },
    "og-generator": {
      id: "og-generator",
      name: "Open Graph Generator",
      category: "SEO",
      description: "Generate Open Graph meta tags for Facebook, LinkedIn, and social media sharing with live preview.",
      featured: false,
      url: "/ai/tools/og-generator.html",
      icon: "🔗",
      docs: {
        overview: "The Open Graph Generator creates the meta tags that control how your links appear when shared on Facebook, LinkedIn, Twitter, and other social platforms. Proper OG tags ensure your content looks professional and engaging when shared.",
        how_it_works: "Enter your content title, description, URL, type, image URL, and site name. The tool generates both Open Graph and Twitter Card tags, plus a preview of how the share card will appear.",
        best_practices: "Always use an image with 1200×630 pixel dimensions for optimal display across platforms. Keep OG titles under 60 characters and descriptions under 200 characters."
      },
      faqs: [
        { q: "What image size works best for OG tags?", a: "The recommended size is 1200×630 pixels (1.91:1 ratio). This works well across Facebook, LinkedIn, and Twitter." },
        { q: "How can I test my OG tags?", a: "Use Facebook's Sharing Debugger, Twitter's Card Validator, or LinkedIn's Post Inspector to preview how your links will appear." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with OG and Twitter Card generation"] }
      ],
      related: ["meta-tag-generator", "schema-generator"]
    },
    "canonical-checker": {
      id: "canonical-checker",
      name: "Canonical Tag Checker",
      category: "SEO",
      description: "Validate canonical tag implementation with best practices analysis and common issue detection.",
      featured: false,
      url: "/ai/tools/canonical-checker.html",
      icon: "🔍",
      docs: {
        overview: "The Canonical Tag Checker validates your canonical tag implementation to prevent duplicate content issues. It detects common mistakes like HTTP/HTTPS mismatches, trailing slash inconsistencies, and redirect chain conflicts.",
        how_it_works: "Enter the page URL and its canonical URL. The tool compares them for consistency, checks for protocol and trailing slash issues, and provides a compliance score with specific recommendations.",
        best_practices: "Every indexable page should have a self-referencing canonical tag. Ensure canonical URLs use HTTPS and include or exclude trailing slashes consistently across your site."
      },
      faqs: [
        { q: "What is a canonical tag?", a: "A canonical tag (rel=canonical) tells search engines which version of a page is the 'primary' one when similar or duplicate content exists at multiple URLs." },
        { q: "Should canonical tags be self-referencing?", a: "Yes. Google recommends every page includes a canonical tag pointing to itself. This prevents issues when URLs are accessed with query parameters or other variations." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with multi-factor canonical validation"] }
      ],
      related: ["meta-tag-generator", "robots-txt-generator"]
    },
    "keyword-density": {
      id: "keyword-density",
      name: "Keyword Density Analyzer",
      category: "SEO",
      description: "Analyze keyword frequency and density in your content to optimize for search engines without over-optimization.",
      featured: false,
      url: "/ai/tools/keyword-density.html",
      icon: "📊",
      docs: {
        overview: "The Keyword Density Analyzer helps you find the right balance of keyword usage in your content. It measures how often your target keyword appears relative to total word count, helping you avoid both under-optimization and keyword stuffing.",
        how_it_works: "Enter your target keyword and paste your content. The tool counts occurrences, calculates density percentage, checks keyword placement in key positions, and provides optimization recommendations.",
        best_practices: "Aim for 1-2% keyword density. Focus on natural language rather than hitting a specific number. Ensure your keyword appears in the first 100 words and is distributed evenly throughout the content."
      },
      faqs: [
        { q: "What is the ideal keyword density?", a: "Most SEO experts recommend 1-2% density. Below 1% may signal weak relevance, while above 3% risks being flagged as keyword stuffing." },
        { q: "Does keyword density still matter?", a: "While modern search engines use semantic understanding, keyword density remains a useful baseline metric. Focus on natural usage, topical relevance, and user intent alongside density." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with density analysis and distribution checks"] }
      ],
      related: ["seo-brief", "content-outline"]
    },
    "prompt-optimizer": {
      id: "prompt-optimizer",
      name: "AI Prompt Optimizer",
      category: "AI",
      description: "Optimize AI prompts for clarity, specificity, and effectiveness with actionable improvement suggestions.",
      featured: true,
      url: "/ai/tools/prompt-optimizer.html",
      icon: "⚡",
      docs: {
        overview: "The AI Prompt Optimizer analyzes your prompts and suggests improvements to get better results from AI models. It evaluates role assignment, specificity, output format instructions, and constraints to produce a scored assessment and optimized version.",
        how_it_works: "Paste your prompt, select the target AI model and use case. The tool scores your prompt across multiple dimensions and generates an improved version with clear role definitions, format instructions, and constraint boundaries.",
        best_practices: "Always include a role (e.g., 'You are a senior marketing strategist'), specify the desired output format, and add constraints to keep responses focused and relevant."
      },
      faqs: [
        { q: "Does this work for all AI models?", a: "The optimization principles apply universally, but the tool tailors suggestions based on model-specific strengths. GPT-4 handles longer context well, Claude excels with nuanced instructions, and Gemini benefits from structured formatting." },
        { q: "How is the prompt score calculated?", a: "The score evaluates five dimensions: length adequacy, specificity indicators, role assignment, output format instructions, and constraint definitions. Each contributes to a 0-100 composite score." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with multi-model optimization"] }
      ],
      related: ["prompt-library", "content-outline"]
    },
    "prompt-library": {
      id: "prompt-library",
      name: "AI Prompt Library",
      category: "AI",
      description: "Browse curated, ready-to-use AI prompts for content, coding, business, marketing, and analysis tasks.",
      featured: true,
      url: "/ai/tools/prompt-library.html",
      icon: "📚",
      docs: {
        overview: "The AI Prompt Library provides a curated collection of 20+ ready-to-use prompts organized by category and difficulty. Each prompt is designed to produce high-quality, consistent results across popular AI models.",
        how_it_works: "Filter by category (Content, Code, Business, Marketing, Analysis, Creative) and difficulty level. Search by keyword to find relevant prompts. Each result includes the full prompt text and usage guidance.",
        best_practices: "Use prompts as starting templates and customize them with your specific context. Combine multiple prompts for complex workflows — for example, use the persona builder prompt before the email campaign prompt."
      },
      faqs: [
        { q: "Can I modify these prompts?", a: "Absolutely. These prompts are templates designed to be customized. Add your specific industry, audience, and constraints to get more relevant outputs." },
        { q: "Which AI models work best with these prompts?", a: "All prompts are tested for compatibility with GPT-4, Claude, and Gemini. They use clear, structured instructions that work well across all major models." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with 20+ curated prompts across 6 categories"] }
      ],
      related: ["prompt-optimizer", "content-outline"]
    },
    "content-outline": {
      id: "content-outline",
      name: "AI Content Outline Generator",
      category: "AI",
      description: "Generate structured content outlines with headings, subheadings, key points, and word count targets.",
      featured: true,
      url: "/ai/tools/content-outline.html",
      icon: "📝",
      docs: {
        overview: "The AI Content Outline Generator creates detailed content structures for blog posts, white papers, tutorials, case studies, and landing pages. Each outline includes heading hierarchy, key points, word count allocations, and SEO recommendations.",
        how_it_works: "Enter your topic, select the content type, define your audience, choose a target word count, and pick a tone. The tool generates a complete structural blueprint with section-by-section guidance.",
        best_practices: "Select the content type that best matches your publishing goal. Blog posts work well for regular content, white papers for thought leadership, and tutorials for product documentation."
      },
      faqs: [
        { q: "How accurate are the word count targets?", a: "Word counts are allocated proportionally based on content type best practices. They serve as guidelines — adjust based on how much depth each section requires for your specific topic." },
        { q: "Can I use this for academic writing?", a: "The tool is optimized for digital content marketing. For academic papers, the white paper template provides the closest structural match." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with 5 content types"] }
      ],
      related: ["seo-brief", "keyword-density"]
    },
    "persona-builder": {
      id: "persona-builder",
      name: "AI Persona Builder",
      category: "AI",
      description: "Create detailed user personas with demographics, behaviors, pain points, and journey mapping.",
      featured: false,
      url: "/ai/tools/persona-builder.html",
      icon: "👤",
      docs: {
        overview: "The AI Persona Builder generates comprehensive user personas for marketing, product development, and UX design. Each persona includes demographics, psychographics, pain points, goals, buying behavior, and a complete customer journey map.",
        how_it_works: "Describe your product or service, industry, target segment, age range, and primary goal. The tool constructs a detailed persona profile with actionable insights for marketing and product teams.",
        best_practices: "Create 3-5 distinct personas for your product. Use different target segments and age ranges to capture the full spectrum of your audience. Reference personas in your content strategy and ad targeting."
      },
      faqs: [
        { q: "How many personas should I create?", a: "Most businesses benefit from 3-5 personas. Too few may miss important segments, while too many can dilute focus. Start with your highest-value customer segment." },
        { q: "Can I use this for B2B personas?", a: "Yes. Enter the job title or role as the target segment (e.g., 'VP of Engineering') and the tool will generate professional demographics, business pain points, and B2B buying journey stages." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with journey mapping"] }
      ],
      related: ["ad-copy-studio", "content-outline"]
    },
    "json-formatter": {
      id: "json-formatter",
      name: "JSON Formatter & Beautifier",
      category: "Web",
      description: "Format, validate, and beautify JSON data with syntax highlighting and error detection.",
      featured: true,
      url: "/ai/tools/json-formatter.html",
      icon: "{ }",
      docs: {
        overview: "The JSON Formatter validates and beautifies JSON data, making it readable and easy to debug. It detects syntax errors, shows structure summaries, and supports configurable indentation.",
        how_it_works: "Paste your JSON data and select an indent size. The tool parses the JSON, validates syntax, reformats it with proper indentation, and provides a structure summary including key counts and nesting depth.",
        best_practices: "Use 2-space indentation for compact output suitable for configuration files, or 4 spaces for more readable documentation. Always validate JSON before using it in API requests or configuration."
      },
      faqs: [
        { q: "What is the maximum JSON size this can handle?", a: "The tool runs entirely in your browser, so it depends on your device's memory. It comfortably handles files up to several megabytes." },
        { q: "Can this tool fix invalid JSON?", a: "It identifies the error location and type, but cannot automatically fix all issues. Common fixes include adding missing commas, closing brackets, or quoting keys." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with validation and structure analysis"] }
      ],
      related: ["json-validator", "schema-generator"]
    },
    "base64-tool": {
      id: "base64-tool",
      name: "Base64 Encoder & Decoder",
      category: "Web",
      description: "Encode text to Base64 or decode Base64 strings instantly in your browser.",
      featured: false,
      url: "/ai/tools/base64-tool.html",
      icon: "🔄",
      docs: {
        overview: "The Base64 Encoder & Decoder converts text to Base64 encoding and back. All processing happens client-side — your data never leaves your browser.",
        how_it_works: "Enter your text and select Encode or Decode mode. The tool instantly converts the input and shows size statistics comparing original and encoded lengths.",
        best_practices: "Base64 increases data size by approximately 33%. Use it for embedding small data in URLs, emails, or JSON, but not for large binary files where the size overhead becomes significant."
      },
      faqs: [
        { q: "Is Base64 encryption?", a: "No. Base64 is an encoding scheme, not encryption. It is trivially reversible and provides no security. Use it only for data transport, not for protecting sensitive information." },
        { q: "Does this support binary data?", a: "This tool handles text-to-Base64 conversion. For binary files (images, documents), use a specialized file-to-Base64 converter." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with encode/decode and size statistics"] }
      ],
      related: ["jwt-decoder", "hash-generator"]
    },
    "uuid-generator": {
      id: "uuid-generator",
      name: "UUID Generator",
      category: "Web",
      description: "Generate RFC 4122 compliant UUIDs (v4) instantly for development and testing.",
      featured: false,
      url: "/ai/tools/uuid-generator.html",
      icon: "🆔",
      docs: {
        overview: "The UUID Generator creates cryptographically random version 4 UUIDs compliant with RFC 4122. Generate single or bulk UUIDs in standard, uppercase, no-dash, or braced formats.",
        how_it_works: "Select the quantity and output format. The tool uses the Web Crypto API (crypto.randomUUID) for high-quality random generation, with a Math.random fallback for older browsers.",
        best_practices: "Use UUIDs as primary keys in distributed systems where auto-increment IDs would cause conflicts. The standard lowercase format with dashes is the most widely compatible."
      },
      faqs: [
        { q: "Are these UUIDs truly unique?", a: "Version 4 UUIDs use 122 random bits, giving approximately 5.3×10³⁶ possible values. The probability of a collision is astronomically low — effectively zero for any practical use case." },
        { q: "Which UUID version should I use?", a: "Version 4 (random) is the most common choice for application-generated IDs. Use v1 (timestamp-based) only when you need time-ordering, and v5 (name-based) for deterministic generation from known inputs." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with bulk generation and format options"] }
      ],
      related: ["hash-generator", "json-formatter"]
    },
    "hash-generator": {
      id: "hash-generator",
      name: "Hash Generator",
      category: "Web",
      description: "Generate SHA-256, SHA-384, SHA-512, and SHA-1 hashes from text using the Web Crypto API.",
      featured: false,
      url: "/ai/tools/hash-generator.html",
      icon: "#️⃣",
      docs: {
        overview: "The Hash Generator creates cryptographic hashes using the browser's native Web Crypto API. It supports SHA-256, SHA-384, SHA-512, and SHA-1 algorithms with instant hex output.",
        how_it_works: "Enter your text and select a hash algorithm. The tool uses window.crypto.subtle.digest() to compute the hash, converting the result to a hexadecimal string.",
        best_practices: "Use SHA-256 or SHA-512 for security-sensitive applications. SHA-1 is deprecated for cryptographic purposes but still used in some legacy systems and checksums."
      },
      faqs: [
        { q: "Which algorithm should I choose?", a: "SHA-256 is the standard recommendation for most use cases. SHA-512 provides extra security for high-sensitivity applications. Avoid SHA-1 for anything security-related." },
        { q: "Is this suitable for password hashing?", a: "No. For password hashing, use specialized algorithms like bcrypt, scrypt, or Argon2 that include salting and are intentionally slow. SHA hashes are too fast for password security." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with Web Crypto API support"] }
      ],
      related: ["base64-tool", "uuid-generator"]
    },
    "color-converter": {
      id: "color-converter",
      name: "Color Converter",
      category: "Web",
      description: "Convert colors between HEX, RGB, HSL formats with WCAG contrast ratio and accessibility checks.",
      featured: false,
      url: "/ai/tools/color-converter.html",
      icon: "🎨",
      docs: {
        overview: "The Color Converter transforms colors between HEX, RGB, and HSL formats and evaluates WCAG accessibility compliance. It calculates contrast ratios against a background color and checks AA/AAA compliance for both normal and large text.",
        how_it_works: "Enter a color in any supported format (HEX, RGB, or HSL). Optionally provide a background color for contrast analysis. The tool converts to all formats and evaluates WCAG 2.1 contrast requirements.",
        best_practices: "Aim for a minimum contrast ratio of 4.5:1 for normal text (AA) and 7:1 for enhanced readability (AAA). Large text (18px+ bold or 24px+) requires only 3:1 for AA compliance."
      },
      faqs: [
        { q: "What is a good contrast ratio?", a: "WCAG 2.1 requires at least 4.5:1 for normal text (Level AA) and 7:1 for enhanced contrast (Level AAA). For large text, the thresholds are 3:1 and 4.5:1 respectively." },
        { q: "Does this support transparency?", a: "The converter handles opaque colors (HEX, RGB, HSL). For colors with alpha transparency, the effective contrast depends on the background, making ratio calculations more complex." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with WCAG contrast analysis"] }
      ],
      related: ["css-minifier", "meta-tag-generator"]
    },
    "css-minifier": {
      id: "css-minifier",
      name: "CSS Minifier",
      category: "Web",
      description: "Minify CSS code by removing whitespace, comments, and unnecessary characters to reduce file size.",
      featured: false,
      url: "/ai/tools/css-minifier.html",
      icon: "🗜️",
      docs: {
        overview: "The CSS Minifier reduces CSS file size by removing comments, whitespace, newlines, and unnecessary characters. It provides before/after size comparison and savings percentage.",
        how_it_works: "Paste your CSS code. The tool strips comments, collapses whitespace, removes spaces around selectors and properties, and eliminates trailing semicolons before closing braces.",
        best_practices: "Always keep your original unminified CSS as the source of truth. Use minified CSS only in production builds. For large projects, integrate minification into your build pipeline."
      },
      faqs: [
        { q: "How much size reduction can I expect?", a: "Typical savings range from 20-40% depending on how much whitespace and comments your CSS contains. Heavily commented stylesheets see the largest reductions." },
        { q: "Will minification break my CSS?", a: "Basic minification (whitespace and comment removal) is safe. This tool performs conservative minification — it does not rename classes or restructure selectors." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with comment and whitespace removal"] }
      ],
      related: ["js-minifier", "color-converter"]
    },
    "js-minifier": {
      id: "js-minifier",
      name: "JavaScript Minifier",
      category: "Web",
      description: "Minify JavaScript code by removing whitespace and comments to reduce file size for production.",
      featured: false,
      url: "/ai/tools/js-minifier.html",
      icon: "📦",
      docs: {
        overview: "The JavaScript Minifier reduces JS file size by removing comments, excess whitespace, and blank lines. It provides size comparison statistics to measure the impact.",
        how_it_works: "Paste your JavaScript code. The tool removes single-line and multi-line comments (preserving URLs), collapses whitespace, and removes empty lines while maintaining code functionality.",
        best_practices: "For production use, consider professional tools like Terser or esbuild that also perform dead code elimination and variable renaming. This tool is ideal for quick minification and size estimation."
      },
      faqs: [
        { q: "Does this rename variables?", a: "No. This tool performs safe whitespace and comment removal only. Variable renaming (mangling) requires more sophisticated tools like Terser that understand JavaScript syntax deeply." },
        { q: "Will this break my code?", a: "The minifier uses conservative rules that preserve code functionality. However, always test minified code before deploying to production." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with comment and whitespace removal"] }
      ],
      related: ["css-minifier", "json-formatter"]
    },
    "regex-tester": {
      id: "regex-tester",
      name: "Regex Tester",
      category: "Developer",
      description: "Test regular expressions against sample text with match highlighting, capture groups, and flag support.",
      featured: true,
      url: "/ai/tools/regex-tester.html",
      icon: "🔤",
      docs: {
        overview: "The Regex Tester validates regular expressions against sample text, showing all matches with their positions and capture groups. It supports all JavaScript regex flags and provides a reference of common patterns.",
        how_it_works: "Enter a regex pattern, optional flags, and test string. The tool creates a RegExp object, finds all matches using matchAll, and displays each match with its index position and any captured groups.",
        best_practices: "Use the 'g' flag for global matching to find all occurrences. Add 'i' for case-insensitive matching. Test with diverse sample data to ensure your pattern handles edge cases."
      },
      faqs: [
        { q: "Which regex flavor does this use?", a: "This tool uses JavaScript's built-in RegExp engine, which follows the ECMAScript specification. Most common regex features (groups, lookahead, character classes) are supported." },
        { q: "Can I use lookbehind assertions?", a: "Yes, lookbehind assertions (?<=...) are supported in modern browsers (Chrome 62+, Firefox 78+, Safari 16.4+). Older browsers may not support them." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with match highlighting and capture groups"] }
      ],
      related: ["json-validator", "http-status"]
    },
    "http-status": {
      id: "http-status",
      name: "HTTP Status Code Checker",
      category: "Developer",
      description: "Look up HTTP status codes with descriptions, use cases, and troubleshooting guidance.",
      featured: false,
      url: "/ai/tools/http-status.html",
      icon: "🌐",
      docs: {
        overview: "The HTTP Status Code Checker is a comprehensive reference for all standard HTTP status codes. Look up any code to get its official name, description, common causes, and troubleshooting steps.",
        how_it_works: "Enter a specific status code for detailed information, or browse by category (1xx-5xx). Each entry includes the code name, RFC reference, description, common causes, and recommended actions.",
        best_practices: "Familiarize yourself with the most common codes: 200 (OK), 301 (Permanent Redirect), 404 (Not Found), and 500 (Internal Server Error). Proper status code usage improves API design and SEO."
      },
      faqs: [
        { q: "What is the difference between 301 and 302 redirects?", a: "301 is a permanent redirect — search engines transfer ranking signals to the new URL. 302 is temporary — the original URL retains its ranking. Use 301 for permanent URL changes and 302 for temporary situations." },
        { q: "What does a 403 vs 401 mean?", a: "401 (Unauthorized) means the request lacks valid authentication credentials. 403 (Forbidden) means the server understood the request but refuses to authorize it — even with valid credentials." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with comprehensive status code database"] }
      ],
      related: ["regex-tester", "json-validator"]
    },
    "jwt-decoder": {
      id: "jwt-decoder",
      name: "JWT Decoder",
      category: "Developer",
      description: "Decode and inspect JSON Web Tokens to view header, payload, claims, and expiration details.",
      featured: false,
      url: "/ai/tools/jwt-decoder.html",
      icon: "🔐",
      docs: {
        overview: "The JWT Decoder splits and decodes JSON Web Tokens to reveal the header (algorithm, type), payload (claims, expiration, issuer), and signature information. It checks expiration status and calculates time-to-expiry.",
        how_it_works: "Paste a JWT token (the eyJ... string). The tool splits it into three parts, Base64-decodes the header and payload, parses them as JSON, and analyzes standard claims like exp, iat, iss, and sub.",
        best_practices: "Never share JWT tokens publicly — they may contain sensitive claims. This tool runs entirely in your browser; no data is transmitted. Always validate tokens server-side in production."
      },
      faqs: [
        { q: "Does this verify the signature?", a: "No. This is a decode-only tool. Signature verification requires the signing key, which should remain server-side. Use this tool for debugging and inspection, not for security validation." },
        { q: "What are standard JWT claims?", a: "Common claims include: iss (issuer), sub (subject), aud (audience), exp (expiration time), nbf (not before), iat (issued at), and jti (JWT ID)." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with expiration analysis"] }
      ],
      related: ["base64-tool", "json-validator"]
    },
    "json-validator": {
      id: "json-validator",
      name: "JSON Validator",
      category: "Developer",
      description: "Validate JSON syntax, check structure, and get detailed error messages with line and column numbers.",
      featured: false,
      url: "/ai/tools/json-validator.html",
      icon: "✅",
      docs: {
        overview: "The JSON Validator checks JSON syntax and provides detailed error messages when validation fails. For valid JSON, it performs deep structure analysis including type counts, nesting depth, and size estimation.",
        how_it_works: "Paste your JSON data. The tool attempts to parse it, reporting either a validation success with structure analysis or a failure with error location, message, and fix suggestions.",
        best_practices: "Validate JSON before using it in API calls, configuration files, or data imports. Common errors include trailing commas, unquoted keys, and single quotes instead of double quotes."
      },
      faqs: [
        { q: "What is the difference between this and the JSON Formatter?", a: "The JSON Validator focuses on syntax checking and error diagnosis. The JSON Formatter focuses on reformatting valid JSON for readability. Use the Validator to find errors, then the Formatter to clean up." },
        { q: "Can this validate against a JSON Schema?", a: "This tool validates JSON syntax only. For schema validation (checking if data matches a specific structure), you need a JSON Schema validator." }
      ],
      changelog: [
        { version: "v1.0.0", date: "2026-08-04", changes: ["Initial release with structure analysis"] }
      ],
      related: ["json-formatter", "regex-tester"]
    }
  };

  // ── 2. Common Layout Markup Blocks ───────────────────────
  const navigationMarkup = `
    <header class="site-header" data-site-nav role="banner"></header>
  `;

  const footerMarkup = `
    <footer class="site-footer" data-site-footer role="contentinfo"></footer>
  `;

  // ── 3. Page Building Orchestration ──────────────────────
  function init() {
    const toolId = document.body.getAttribute('data-tool-id');
    if (toolId && toolsRegistry[toolId]) {
      wrapToolPage(toolId);
    }
    // site.js owns nav binding via PhoenixSite.mountShell / bindNav.
    // Only fall back when the shared shell is unavailable.
    if (!window.PhoenixSite) {
      setupMobileNav();
    }
  }

  function wrapToolPage(toolId) {
    const tool = toolsRegistry[toolId];
    const originalContent = document.getElementById('ai-tool-content');
    
    if (!originalContent) return;

    // Preserve the original unique form and contents
    const formHtml = originalContent.innerHTML;

    // Create the full template wrapper
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'ai-page-wrapper';
    
    pageWrapper.innerHTML = `
      ${navigationMarkup}
      
      <div class="container" style="margin-top: 40px; padding-top: 10px;">
        <nav class="ai-breadcrumbs" aria-label="Breadcrumbs">
          <a href="/">Home</a>
          <span class="separator">/</span>
          <a href="/ai/">AI Platform</a>
          <span class="separator">/</span>
          <span class="current">${tool.name}</span>
        </nav>
      </div>

      <main class="container">
        <div class="ai-layout-grid">
          <!-- Left Column: Tool Form and Results -->
          <div class="ai-tool-column">
            <div class="ai-card ${tool.featured ? 'featured-card' : ''}">
              <div class="ai-tool-header" style="margin-bottom: 24px;">
                <span class="kicker">${tool.category}</span>
                <h1 style="margin: 4px 0 8px; font-size: clamp(1.8rem, 3.2vw, 2.3rem); line-height: 1.2;">${tool.name}</h1>
                <p class="muted" style="margin-bottom: 0; font-size: 1rem;">${tool.description}</p>
              </div>
              
              <!-- Injected original unique tool input interface -->
              <div id="ai-injected-container">
                ${formHtml}
              </div>

              <!-- Made by Panos Khan Badge -->
              <div style="display:flex; justify-content:center; margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--border-soft);">
                <a href="/" class="made-by-badge" style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:rgba(7, 11, 20, 0.4); border:1px solid rgba(0, 229, 255, 0.15); border-radius:50px; text-decoration:none; transition:all var(--t);">
                  <span style="width:6px; height:6px; background:var(--neon); border-radius:50%; display:inline-block; box-shadow: 0 0 6px var(--neon);"></span>
                  <span style="color:var(--text); font-size:0.82rem; font-weight:600;">Made by Panos Khan</span>
                </a>
              </div>
              
              <!-- Shared output area -->
              <div class="ai-output-wrap" id="ai-platform-output-wrap">
                <div class="ai-output-header">
                  <h3>Generated Diagnostic Output</h3>
                  <button class="ai-btn" id="ai-platform-copy-btn" type="button" style="padding: 6px 12px; font-size: 0.85rem;">Copy Result</button>
                </div>
                <div id="ai-platform-output-target"></div>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Documentation, FAQs, Changelog -->
          <div class="ai-info-column">
            <!-- Documentation Tabs -->
            <div class="ai-card ai-docs-card">
              <div class="ai-tabs" role="tablist">
                <button class="ai-tab-btn active" data-tab="overview" role="tab" aria-selected="true" aria-controls="pane-overview">Overview</button>
                <button class="ai-tab-btn" data-tab="how" role="tab" aria-selected="false" aria-controls="pane-how">How It Works</button>
                <button class="ai-tab-btn" data-tab="practices" role="tab" aria-selected="false" aria-controls="pane-practices">Best Practices</button>
              </div>
              <div class="ai-tab-pane active" id="pane-overview" role="tabpanel">${tool.docs.overview}</div>
              <div class="ai-tab-pane" id="pane-how" role="tabpanel">${tool.docs.how_it_works}</div>
              <div class="ai-tab-pane" id="pane-practices" role="tabpanel">${tool.docs.best_practices}</div>
            </div>

            <div class="ai-card ai-example-card">
              <h3 style="margin-bottom: 10px; color: var(--text);">Example</h3>
              <p class="muted">Use a specific business context and desired outcome. Review the deterministic draft before applying it to a live decision or publication.</p>
            </div>
            
            <!-- FAQ Accordion -->
            <div class="ai-card ai-faq-card">
              <h3 style="margin-bottom: 18px; color: var(--text);">Frequently Asked Questions</h3>
              <div class="ai-faq-list">
                ${tool.faqs.map((faq, i) => `
                  <div class="ai-faq-item">
                    <button class="ai-faq-trigger" aria-expanded="false">
                      <span>${faq.q}</span>
                      <span class="ai-faq-icon">▼</span>
                    </button>
                    <div class="ai-faq-body" style="max-height: 0px;">
                      <div class="ai-faq-content">${faq.a}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <!-- Changelog/Version History -->
            <div class="ai-card ai-changelog-card">
              <h3 style="margin-bottom: 18px; color: var(--text);">Tool Version History</h3>
              <div class="ai-changelog-list">
                ${tool.changelog.map(item => `
                  <div class="ai-changelog-item">
                    <div class="ai-changelog-header">
                      <span class="ai-changelog-version">${item.version}</span>
                      <span class="ai-changelog-date">${item.date}</span>
                    </div>
                    <ul class="ai-changelog-changes">
                      ${item.changes.map(ch => `<li>${ch}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Tools Section -->
        <div class="ai-related-section">
          <h2>Related AI Core Tools</h2>
          <div class="ai-related-grid" id="ai-related-target"></div>
          <p class="ai-share-links"><strong>Share this tool:</strong> <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:?subject=${encodeURIComponent(tool.name)}&body=${encodeURIComponent(location.href)}">Email</a></p>
        </div>
      </main>
      
      ${footerMarkup}
    `;

    // Replace body contents while preserving attributes like data-tool-id
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    document.body.appendChild(pageWrapper);

    const mountShellAndSearch = () => {
      if (!window.PhoenixSite) return false;
      window.PhoenixSite.mountShell();
      window.PhoenixSite.mountGlobalSearch();
      window.PhoenixSite.trackRecent(toolId);
      return true;
    };

    if (!mountShellAndSearch()) {
      const existing = document.querySelector('script[src="/assets/js/site.js"]');
      if (existing) {
        existing.addEventListener('load', mountShellAndSearch);
        // If the script already executed, try on next tick.
        setTimeout(mountShellAndSearch, 0);
      } else {
        const searchScript = document.createElement('script');
        searchScript.src = '/assets/js/site.js';
        searchScript.onload = mountShellAndSearch;
        document.body.appendChild(searchScript);
      }
    }

    // Automatically inject a beautiful, glassmorphic, floating "Made by Panos Khan" badge
    const floatingBadge = document.createElement('a');
    floatingBadge.href = "/";
    floatingBadge.className = "floating-made-by-badge";
    floatingBadge.setAttribute('aria-label', 'Made by Panos Khan');
    floatingBadge.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background: rgba(10, 15, 30, 0.6);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 8px 32px rgba(0, 229, 255, 0.15);
      transition: all 0.3s ease;
      cursor: pointer;
    `;
    floatingBadge.innerHTML = `
      <span style="width: 8px; height: 8px; background: var(--neon, #00e5ff); border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--neon, #00e5ff);"></span>
      <span style="color: var(--text, #ffffff); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Made by Panos Khan</span>
    `;
    
    floatingBadge.addEventListener('mouseenter', () => {
      floatingBadge.style.transform = 'translateY(-4px) scale(1.05)';
      floatingBadge.style.borderColor = 'var(--purple, #9d4edd)';
      floatingBadge.style.boxShadow = '0 12px 40px rgba(157, 78, 221, 0.3)';
    });
    floatingBadge.addEventListener('mouseleave', () => {
      floatingBadge.style.transform = 'none';
      floatingBadge.style.borderColor = 'rgba(0, 229, 255, 0.3)';
      floatingBadge.style.boxShadow = '0 8px 32px rgba(0, 229, 255, 0.15)';
    });

    document.body.appendChild(floatingBadge);

    // Render related tools
    renderRelatedTools(tool.related);

    // Initialize interactive event listeners
    setupTabListeners();
    setupFaqListeners();
    setupCopyButton();
    
    // Set footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ── 4. UI Components Handlers ────────────────────────────
  function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.ai-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabContainer = btn.closest('.ai-docs-card');
        if (!tabContainer) return;
        
        // Deactivate other tabs
        tabContainer.querySelectorAll('.ai-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabContainer.querySelectorAll('.ai-tab-pane').forEach(p => p.classList.remove('active'));
        
        // Activate current tab
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetId = `pane-${btn.getAttribute('data-tab')}`;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  function setupFaqListeners() {
    const faqTriggers = document.querySelectorAll('.ai-faq-trigger');
    faqTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.ai-faq-item');
        const body = item.querySelector('.ai-faq-body');
        const isActive = item.classList.contains('active');
        
        // Close others
        document.querySelectorAll('.ai-faq-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.ai-faq-trigger').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.ai-faq-body').style.maxHeight = '0px';
          }
        });
        
        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          body.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  function setupCopyButton() {
    const copyBtn = document.getElementById('ai-platform-copy-btn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', async () => {
      const target = document.getElementById('ai-platform-output-target');
      if (!target) return;
      
      const textToCopy = target.innerText.trim();
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = 'Copied!';
      } catch {
        copyBtn.textContent = 'Copy failed';
      }
      setTimeout(() => { copyBtn.textContent = 'Copy Result'; }, 1800);
    });
  }

  function renderRelatedTools(relatedIds) {
    const target = document.getElementById('ai-related-target');
    if (!target) return;
    
    let html = '';
    relatedIds.forEach(id => {
      const relatedTool = toolsRegistry[id];
      if (relatedTool) {
        html += `
          <a href="${relatedTool.url}" class="ai-hub-card ${relatedTool.featured ? 'featured-hub-card' : ''}">
            <div class="ai-hub-card-header">
              <span class="ai-hub-card-icon">${relatedTool.icon}</span>
              <span class="ai-hub-card-tag">${relatedTool.category}</span>
            </div>
            <h3>${relatedTool.name}</h3>
            <p>${relatedTool.description}</p>
            <div class="ai-hub-card-footer">
              Open Tool <span>→</span>
            </div>
          </a>
        `;
      }
    });
    
    target.innerHTML = html;
  }

  // ── 5. Standard Helper methods for Tools ────────────────
  function showFormattedOutput(data) {
    const wrap = document.getElementById('ai-platform-output-wrap');
    const target = document.getElementById('ai-platform-output-target');
    if (!wrap || !target) return;
    
    if (typeof data === 'string') {
      target.innerHTML = `<pre class="ai-output-box">${data}</pre>`;
    } else if (data && data.sections) {
      // Build a beautiful formatted output
      let sectionsHtml = `<div class="ai-output-formatted">`;
      if (data.title) {
        sectionsHtml += `<h3 style="margin-top:0; margin-bottom: 20px; color: var(--neon); font-size:1.3rem; border-bottom: 1px solid var(--border); padding-bottom:12px;">${data.title}</h3>`;
      }
      data.sections.forEach(sec => {
        sectionsHtml += `
          <section>
            <h4>${sec.title}</h4>
            <div>${formatMarkdownStyle(sec.content)}</div>
          </section>
        `;
      });
      sectionsHtml += `</div>`;
      target.innerHTML = sectionsHtml;
    }
    
    wrap.classList.add('visible');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function formatMarkdownStyle(text) {
    // Simple markdown client-side formatter (bold lists, bullets, links)
    let formatted = String(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="mono" style="background:var(--surface-3); padding:2px 6px; border-radius:4px; font-size:0.9em; border:1px solid var(--border); color:#cde6ff;">$1</code>');
    
    // Bullet lists
    if (formatted.includes('\n* ')) {
      const lines = formatted.split('\n');
      let inList = false;
      let newText = '';
      lines.forEach(line => {
        if (line.trim().startsWith('* ')) {
          if (!inList) {
            newText += '<ul style="margin: 8px 0; padding-left: 20px;">';
            inList = true;
          }
          newText += `<li>${line.trim().substring(2)}</li>`;
        } else {
          if (inList) {
            newText += '</ul>';
            inList = false;
          }
          newText += line + '\n';
        }
      });
      if (inList) newText += '</ul>';
      formatted = newText;
    }
    
    // Ordered lists
    if (formatted.match(/\n\d+\.\s/)) {
      const lines = formatted.split('\n');
      let inList = false;
      let newText = '';
      lines.forEach(line => {
        const match = line.trim().match(/^(\d+)\.\s(.*)/);
        if (match) {
          if (!inList) {
            newText += '<ol style="margin: 8px 0; padding-left: 20px;">';
            inList = true;
          }
          newText += `<li>${match[2]}</li>`;
        } else {
          if (inList) {
            newText += '</ol>';
            inList = false;
          }
          newText += line + '\n';
        }
      });
      if (inList) newText += '</ol>';
      formatted = newText;
    }
    
    return formatted.replace(/\n/g, '<br>');
  }

  function setupMobileNav() {
    const hamburger = document.getElementById('navHamburger');
    const drawer    = document.getElementById('navDrawer');
    const overlay   = document.getElementById('navOverlay');
    const closeBtn  = document.getElementById('navClose');

    if (!hamburger || !drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  // ── 6. Public API ────────────────────────────────────────
  return {
    registry: toolsRegistry,
    init: init,
    showFormattedOutput: showFormattedOutput,
    escapeHtml: function(text) {
      return String(text).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
    },
    safeText: function(text) {
      return this.escapeHtml(String(text || '').trim().replace(/\s+/g, ' '));
    }
  };
})();

// Auto-run on DOM content loaded
document.addEventListener('DOMContentLoaded', AIPlatform.init);
