// Registry of all AI features rendered in the AI Lab section.
// To add a new feature:
//   1. Create src/features/<your-feature>/<Component>.jsx and config.js
//   2. Create api/<your-endpoint>.js using api/_lib/claude.js
//   3. Register it here
//
// Each feature renders inside the AI Lab grid, so it should be self-contained.
import JobFitAnalyzer from "./job-fit/JobFitAnalyzer.jsx";
import { JOB_FIT_CONFIG } from "./job-fit/config.js";
import AskAshish from "./ask-ashish/AskAshish.jsx";
import { ASK_ASHISH_CONFIG } from "./ask-ashish/config.js";

export const FEATURES = [
  {
    ...JOB_FIT_CONFIG,
    Component: JobFitAnalyzer,
  },
  {
    ...ASK_ASHISH_CONFIG,
    Component: AskAshish,
  },
];
