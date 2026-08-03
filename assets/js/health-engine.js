(function () {
  "use strict";

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function wordCount(value) {
    return String(value || "").trim().split(/\s+/).filter(Boolean).length;
  }

  function includesAny(text, terms) {
    const haystack = String(text || "").toLowerCase();
    return terms.some((term) => haystack.includes(term));
  }

  function normalizeDomain(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (_) {
      return String(url || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    }
  }

  function buildWebsiteHealthReport(input) {
    const businessName = String(input.businessName || "").trim();
    const websiteUrl = String(input.websiteUrl || "").trim();
    const industry = String(input.industry || "").trim();
    const audience = String(input.audience || "").trim();
    const goals = String(input.goals || "").trim();
    const domain = normalizeDomain(websiteUrl);

    const audienceWords = wordCount(audience);
    const goalWords = wordCount(goals);
    const hasConversionGoal = includesAny(goals, ["lead", "contact", "book", "quote", "sale", "demo", "conversion"]);
    const hasDiscoverabilityGoal = includesAny(goals, ["seo", "search", "rank", "organic", "metadata", "schema"]);
    const hasTrustGoal = includesAny(goals, ["trust", "credibility", "authority", "proof", "testimonial"]);

    const clarityScore = clamp(58 + audienceWords * 7 + Math.min(goalWords, 20), 55, 96);
    const discoverabilityScore = clamp(60 + (hasDiscoverabilityGoal ? 24 : 8) + Math.min(wordCount(industry) * 6, 12), 52, 95);
    const trustScore = clamp(62 + (hasTrustGoal ? 18 : 6) + Math.min(goalWords, 15), 56, 96);
    const conversionScore = clamp(61 + (hasConversionGoal ? 22 : 8) + Math.min(audienceWords * 5, 12), 55, 95);
    const score = Math.round((clarityScore + discoverabilityScore + trustScore + conversionScore) / 4);

    const criticalIssues = [];
    const warnings = [];
    const passedChecks = [];

    if (goalWords < 8) {
      criticalIssues.push("The goal statement is too short to reliably prioritise technical, content, and conversion fixes.");
    } else {
      passedChecks.push("The improvement goal is specific enough to anchor a focused health plan.");
    }

    if (audienceWords < 2) {
      criticalIssues.push("The target audience is too broad; messaging and CTA recommendations will stay generic without a sharper audience definition.");
    } else {
      passedChecks.push("The target audience is defined clearly enough to shape messaging and conversion recommendations.");
    }

    if (!hasDiscoverabilityGoal) {
      warnings.push("Search visibility is not explicitly named in the goals, so discoverability improvements may be under-prioritised.");
    } else {
      passedChecks.push("Search and discoverability outcomes are explicitly represented in the stated goals.");
    }

    if (!hasConversionGoal) {
      warnings.push("Conversion intent is not explicit; primary CTA and form recommendations should be validated against the business funnel.");
    } else {
      passedChecks.push("Conversion intent is clear enough to support action-plan prioritisation.");
    }

    if (!hasTrustGoal) {
      warnings.push("Trust-building assets are not mentioned; proof, authority, and reassurance signals should be reviewed in the first pass.");
    } else {
      passedChecks.push("Trust and credibility improvements are already part of the expected outcome.");
    }

    const recommendations = [
      {
        priority: "critical",
        title: "Clarify the first-screen value proposition",
        summary: `Rewrite the hero message so ${audience || "your audience"} immediately understands why ${businessName || "the business"} is the right ${industry || "industry"} partner.`,
        effort: "60–90 minutes"
      },
      {
        priority: hasDiscoverabilityGoal ? "high" : "medium",
        title: "Build one high-intent discoverability page",
        summary: `Publish or refresh a page for ${domain || "the target site"} that aligns title tags, H1s, metadata, and supporting copy with a commercial-intent search topic.`,
        effort: "Half day"
      },
      {
        priority: "high",
        title: "Surface trust evidence earlier",
        summary: "Move testimonials, proof points, delivery promises, or credentials closer to the first major CTA to reduce early hesitation.",
        effort: "2–3 hours"
      },
      {
        priority: hasConversionGoal ? "high" : "medium",
        title: "Reduce CTA and form friction",
        summary: "Keep one primary CTA per page, remove unnecessary fields, and add a response-time expectation near the action point.",
        effort: "2–4 hours"
      }
    ];

    return {
      id: "tool-website-audit",
      pillar: "website-health",
      reportType: "health-report",
      title: `Website Health Report for ${businessName || domain || "your website"}`,
      subject: domain,
      score,
      executiveSummary: `${businessName || "This website"} shows ${score >= 90 ? "strong" : score >= 75 ? "promising" : "foundational"} website-health readiness across messaging, discoverability, trust, and conversion. The fastest gains come from clarifying the offer for ${audience || "the target audience"}, aligning SEO structure to ${industry || "core"} intent, and tightening CTA flow around the stated goals.`,
      summary: `Shared Health Engine assessment for ${domain || "the submitted site"}.`,
      categories: [
        { label: "Messaging", score: clarityScore },
        { label: "Discoverability", score: discoverabilityScore },
        { label: "Trust", score: trustScore },
        { label: "Conversion", score: conversionScore }
      ],
      criticalIssues,
      warnings,
      passedChecks,
      recommendations,
      estimatedTimeToImprove: "2–4 weeks"
    };
  }

  function evaluate(pillar, input) {
    if (pillar === "website-health") return buildWebsiteHealthReport(input || {});
    throw new Error(`Unsupported health pillar: ${pillar}`);
  }

  window.PlatformHealthEngine = {
    evaluate
  };
})();
