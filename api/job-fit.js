// POST /api/job-fit
// Body: { jobDescription: string }
// Returns: { analysis: string }
import { complete, setCors, handleError } from "./_lib/claude.js";
import { RESUME_CONTEXT } from "./_lib/resume-context.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { jobDescription } = req.body || {};
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        error: "Please provide a job description (at least 20 characters).",
      });
    }

    const system = `You are an expert technical recruiter writing a concise, honest pitch on why Ashish Bhatt fits a specific role. You have full access to his background below. Be specific — cite actual projects, technologies, and metrics from his resume. Do not invent things. If a required skill isn't in his background, acknowledge it briefly and pivot to nearest-adjacent strengths.

Format your response in this exact structure using markdown:

**Fit Score:** X/10 — (one-line justification)

**Why Ashish is a strong match**
(3-5 bullet points mapping specific JD requirements to his actual experience, with concrete metrics. Use "- " for bullets.)

**Areas to discuss**
(1-2 honest items where the JD asks for something not explicitly in his resume. Frame as "transferable" or "open to learning". Use "- " for bullets.)

**Suggested conversation starters**
(2 specific projects/topics the recruiter should ask Ashish about. Use "- " for bullets.)

Keep the total response under 380 words. Be direct, professional, no fluff.

ASHISH'S BACKGROUND:
${RESUME_CONTEXT}`;

    const analysis = await complete({
      system,
      messages: [{ role: "user", content: `Job Description:\n\n${jobDescription}` }],
      maxTokens: 1200,
      temperature: 0.6,
    });

    return res.status(200).json({ analysis });
  } catch (error) {
    return handleError(res, error);
  }
}
