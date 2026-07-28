(function(){
  function getText(formData, key){
    return String(formData.get(key) || "").trim().replace(/\s+/g, " ");
  }

  function getNumber(formData, key){
    const value = Number(formData.get(key) || 0);
    return Number.isFinite(value) ? value : 0;
  }

  function joinLines(lines){
    return lines.filter(Boolean).join("\n");
  }

  function levelFromScore(score){
    if (score >= 8) return "High";
    if (score >= 5) return "Moderate";
    return "Low";
  }

  const generators = {
    readinessTwin(formData){
      const industry = getText(formData, "industry");
      const challenge = getText(formData, "challenge");
      return joinLines([
        "Quick Wins (30 Days)",
        `• Map one ${industry} workflow linked to "${challenge}" and baseline cycle time.`,
        "• Pilot one AI assistant for drafting/research and track weekly usage quality.",
        "• Set a weekly leadership checkpoint with one adoption KPI and one business KPI.",
        "",
        "Strategic Transformation (12 Months)",
        "• Build a prioritized AI use-case roadmap by impact, risk, and implementation effort.",
        "• Establish governance: data policy, approval gates, and model usage standards.",
        "• Scale from pilot to cross-team rollout with training and quarterly ROI reviews."
      ]);
    },
    shadowAutomation(formData){
      const workflow = getText(formData, "workflow");
      const teamSize = getNumber(formData, "teamSize");
      const repetitiveLoad = Math.max(2, Math.round(teamSize * 1.5));
      return joinLines([
        "Shadow-Automation Signals",
        `• Workflow scanned: ${workflow}`,
        `• Estimated hidden repetitive tasks/week: ~${repetitiveLoad}`,
        "• Likely hotspots: spreadsheet updates, status follow-ups, copy-paste reporting.",
        "",
        "Action Plan",
        "• Standardize inputs with one shared intake form.",
        "• Automate update handoffs and reminder loops.",
        "• Assign one owner to measure time recovered per week."
      ]);
    },
    decisionRisk(formData){
      const useCase = getText(formData, "useCase");
      const sensitivity = getText(formData, "sensitivity").toLowerCase();
      const riskBase = sensitivity === "high" ? 8 : sensitivity === "medium" ? 6 : 4;
      return joinLines([
        `Decision Risk Snapshot: ${useCase}`,
        `• Legal/Compliance Risk: ${levelFromScore(riskBase)}`,
        `• Bias/Fairness Risk: ${levelFromScore(riskBase - 1)}`,
        `• Security/Privacy Risk: ${levelFromScore(riskBase + 1)}`,
        `• Adoption/Change Risk: ${levelFromScore(riskBase - 2)}`,
        `• Brand/Reputation Risk: ${levelFromScore(riskBase)}`,
        "",
        "Mitigation Priority",
        "• Define acceptable outputs and red lines before rollout.",
        "• Add human review on high-impact decisions.",
        "• Log decisions and exceptions for audit visibility."
      ]);
    },
    promptProcess(formData){
      const prompt = getText(formData, "prompt");
      const owner = getText(formData, "owner");
      return joinLines([
        "Prompt-to-Process Blueprint",
        `Input Prompt: "${prompt}"`,
        "",
        "SOP Steps",
        "1) Intake request and validate context.",
        "2) Run prompt with approved template and constraints.",
        "3) Review output quality against acceptance criteria.",
        "4) Publish/share final output and archive version.",
        "",
        `Process Owner: ${owner}`,
        "Primary KPI: First-pass acceptance rate (%)",
        "Secondary KPI: Time-to-delivery per request"
      ]);
    },
    vendorFit(formData){
      const companySize = getText(formData, "companySize");
      const budget = getNumber(formData, "budget");
      const recommendation = budget < 1200 ? "Buy (SMB SaaS stack)" : budget < 5000 ? "Hybrid (buy core + light customization)" : "Hybrid-to-Build (platform plus internal capability)";
      return joinLines([
        "AI Vendor Fit Recommendation",
        `• Company profile: ${companySize}`,
        `• Monthly budget: €${budget.toLocaleString()}`,
        `• Recommended path: ${recommendation}`,
        "",
        "Suggested Vendor Categories",
        "• Workflow orchestration & automation",
        "• Knowledge assistant / enterprise search",
        "• Analytics + governance monitoring",
        "",
        "Procurement Note",
        "• Run a 2-week proof-of-value before annual commitments."
      ]);
    },
    frictionScanner(formData){
      const alignment = getNumber(formData, "alignment");
      const resistance = getNumber(formData, "resistance");
      const frictionScore = Math.max(1, Math.min(10, 11 - alignment + resistance));
      return joinLines([
        "Transformation Friction Heatmap",
        `• Leadership alignment score: ${alignment}/5`,
        `• Change resistance score: ${resistance}/5`,
        `• Friction index (1-10): ${frictionScore}`,
        "",
        frictionScore >= 7
          ? "High friction detected: start with one low-risk quick win and executive sponsorship."
          : "Manageable friction: proceed with staged rollout and role-based training.",
        "• Next step: define one transformation owner and weekly unblock review."
      ]);
    },
    valueLeakage(formData){
      const journey = getText(formData, "journey");
      const dealValue = getNumber(formData, "dealValue");
      const recoverable = Math.round(dealValue * 0.18);
      return joinLines([
        "Value Leakage Scan",
        `• Journey mapped: ${journey}`,
        `• Estimated value recoverable per deal: €${recoverable.toLocaleString()}`,
        "",
        "Leakage Zones",
        "• Slow response timing between inquiry and first contact.",
        "• Repetitive qualification steps with inconsistent data capture.",
        "• Manual proposal follow-up without prioritization scoring.",
        "",
        "AI Recovery Actions",
        "• Add instant qualification assistant.",
        "• Auto-summarize CRM notes into next-best actions.",
        "• Trigger risk-based follow-up sequences."
      ]);
    },
    trustLabel(formData){
      const business = getText(formData, "business");
      const usage = getText(formData, "usage");
      return joinLines([
        `${business} AI Trust Label`,
        "",
        `We use AI for: ${usage}.`,
        "We keep human oversight on high-impact decisions.",
        "We minimize personal data and apply security controls.",
        "We document model limitations and allow escalation to human support.",
        "We continuously monitor quality, fairness, and customer impact."
      ]);
    },
    meetingDrift(formData){
      const goal = getText(formData, "goal");
      const notes = getText(formData, "notes").toLowerCase();
      const driftTerms = ["later", "unclear", "tbd", "follow up", "postpone"];
      const driftCount = driftTerms.reduce(function(total, term){
        return total + (notes.includes(term) ? 1 : 0);
      }, 0);
      const score = Math.max(0, 100 - driftCount * 15);
      return joinLines([
        "Meeting Drift Analysis",
        `• Strategic goal: ${goal}`,
        `• Alignment score: ${score}/100`,
        `• Drift signals found: ${driftCount}`,
        "",
        "Recommendations",
        "• Convert each discussion point into an owner + deadline action line.",
        "• Flag unresolved decisions before meeting close.",
        "• Start next meeting by reviewing previous commitments."
      ]);
    },
    officeArchitect(formData){
      const businessType = getText(formData, "businessType");
      const goal = getText(formData, "goal");
      return joinLines([
        "One-Person AI Office Blueprint",
        `• Business type: ${businessType}`,
        `• Primary objective: ${goal}`,
        "",
        "Recommended AI Roles",
        "1) AI Analyst: weekly KPI summaries + trend alerts.",
        "2) AI Marketer: content drafts, campaign briefs, and CTA tests.",
        "3) AI Operations Assistant: inbox triage and task prioritization.",
        "4) AI Client Success Assistant: follow-up and meeting prep notes.",
        "",
        "Weekly Rhythm",
        "• Monday: strategy + KPI review",
        "• Mid-week: execution automation checks",
        "• Friday: performance recap + next-week plan"
      ]);
    }
  };

  function copyText(text){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error("Clipboard unavailable"));
  }

  document.querySelectorAll("form[data-tool]").forEach(function(form){
    form.addEventListener("submit", function(event){
      event.preventDefault();
      const toolId = form.getAttribute("data-tool");
      const resultEl = document.getElementById("result-" + toolId);
      const submitBtn = form.querySelector("button[type=submit]");

      // Loading state
      resultEl.textContent = "⚡ Generating…";
      if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = "Generating…"; }

      setTimeout(function(){
        try {
          const output = generators[toolId](new FormData(form)) || "No output generated.";
          resultEl.textContent = output;
        } catch(err) {
          resultEl.textContent = "Error generating output. Please check your inputs and try again.";
        } finally {
          if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = "Generate"; }
        }
        resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 220);
    });
  });

  document.querySelectorAll(".copy-btn").forEach(function(button){
    button.addEventListener("click", function(){
      const targetId = button.getAttribute("data-copy-target");
      const target = document.getElementById(targetId);
      copyText((target && target.textContent || "").trim())
        .then(function(){
          button.textContent = "Copied";
          setTimeout(function(){ button.textContent = "Copy Result"; }, 1500);
        })
        .catch(function(){
          button.textContent = "Copy failed";
          setTimeout(function(){ button.textContent = "Copy Result"; }, 1500);
        });
    });
  });
})();
