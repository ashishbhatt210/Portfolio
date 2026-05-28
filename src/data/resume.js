// Single source of truth for all portfolio content.
// Edit this file to update the site.

export const PROFILE = {
  name: "Ashish Bhatt",
  initials: "AB",
  title: "Software Engineer",
  tagline: "Software engineer building with AI.",
  location: "Ghaziabad, IN",
  email: "bhattashish210@gmail.com",
  phone: "+91 8448706390",
  currentRole: "SDE-III @ Clearwater Analytics",
  currentlyShipping: "AI-augmented platforms",
  social: {
    linkedin: "https://linkedin.com/in/ashishbhatt210",
    github: "https://github.com/ashishbhatt210",
    leetcode: "https://leetcode.com/bhattashish210",
    codechef: "https://codechef.com/users/sobersoul",
    codeforces: "https://codeforces.com/profile/bhattbhai",
  },
};

export const STATS = [
  { label: "Experience", value: "5+ yrs" },
  { label: "LeetCode", value: "Top 4.39%" },
  { label: "DSA Solved", value: "1000+" },
  { label: "LLM Work", value: "In Prod" },
];

export const EXPERIENCE = [
  {
    id: "clearwater",
    company: "Clearwater Analytics",
    role: "Software Development Engineer III",
    period: "Mar 2026 — Present",
    yearLabel: "2026",
    location: "Current",
    project: "Alternative Assets & MLx",
    summary: "Building investment-accounting workflows for institutional clients, with GenAI integrated into the platform.",
    highlights: [
      "Spearheaded the end-to-end Unitization feature for Limited Partnerships (LPs) — designed schema, Java/Spring Boot backend, React/TypeScript UI. Shipped to production and unlocked the European market.",
      "Integrated Azure OpenAI into the MLx platform for asset classification, document data extraction, and analyst productivity automation.",
      "Built Kafka-based event-driven pipelines and AWS Lambda functions for high-volume asset data ingestion.",
      "Optimized PostgreSQL queries and JPA data access patterns to cut endpoint latency.",
    ],
    stack: ["Java", "Spring Boot", "React", "TypeScript", "Kafka", "AWS Lambda", "Azure OpenAI", "PostgreSQL"],
  },
  {
    id: "athenahealth",
    company: "athenahealth",
    role: "Member of Technical Staff · Scrum Master",
    period: "Jul 2023 — Mar 2026",
    yearLabel: "2023",
    location: "Bengaluru",
    project: "GenAI Initiatives + athenaOne",
    summary: "Shipped GenAI systems that saved hundreds of analyst-hours per sprint; led an agile team as Scrum Master.",
    highlights: [
      "Fine-tuned LLaMA 3.1 on AWS SageMaker 48x-large GPUs; boosted LLM inference accuracy from 70% → 85% via an ontology-based AI pipeline.",
      "Built AI-driven Rulespec Generator (Python + Azure OpenAI + NLP) — cut analyst effort 70%, achieved 90% accuracy on simple rules.",
      "Engineered BKM Doc Generator with OpenAI LLMs + embeddings — doc time dropped from 30-60 min to 5 min; throughput 50 → 200 docs/day.",
      "Migrated business rules from monolithic Perl to Java microservices; built custom rule-engine plugins.",
      "Drove sprint planning, grooming, retros as Scrum Master; mentored team members on design and best practices.",
    ],
    stack: ["Python", "LLaMA 3.1", "SageMaker", "Azure OpenAI", "LangChain", "Java", "Spring Boot", "Perl"],
  },
  {
    id: "compro",
    company: "Compro Technologies",
    role: "Associate Software Engineer",
    period: "Apr 2022 — Jul 2023",
    yearLabel: "2022",
    location: "Delhi NCR",
    project: "CambridgeOne",
    summary: "Full-stack development across Angular, Vue, and Node.js with event-driven AWS integrations.",
    highlights: [
      "End-to-end development with Angular, Vue, and Node.js using Agile + TDD.",
      "AWS Lambda + S3 + API Gateway event-driven integrations with PubNub, GetStream, Heroku.",
      "Performance optimization and security hardening across the platform.",
    ],
    stack: ["Angular", "Vue", "Node.js", "Express", "AWS Lambda", "S3"],
  },
  {
    id: "pepcoding",
    company: "PepCoding Education",
    role: "Product Engineer Intern",
    period: "Sep 2021 — Mar 2022",
    yearLabel: "2021",
    location: "Remote",
    project: "NADOS Platform",
    summary: "Created educational content and mentored 1000+ students on DSA fundamentals.",
    highlights: [
      "Authored video solutions for 200+ DSA problems across the difficulty spectrum.",
      "Provided code review and mentorship to 1000+ students in Java and C++.",
    ],
    stack: ["Java", "C++", "Data Structures"],
  },
];

export const PROJECTS = [
  {
    tag: "GenAI / RAG",
    title: "AI BKM Doc Generator",
    desc: "OpenAI LLMs + embeddings transform a 30-60 minute documentation task into 5 minutes. Throughput jumped from 50 to 200 documents/day.",
    tech: ["OpenAI", "Embeddings", "RAG", "Python"],
    metric: "4× throughput",
    accent: "lime",
  },
  {
    tag: "LLM Fine-Tuning",
    title: "Rulespec Gen + LLaMA 3.1",
    desc: "Fine-tuned LLaMA 3.1 on 48x-large SageMaker GPUs. Ontology-based AI pipeline boosted inference accuracy 70% → 85% and cut validation from 8 hours to 1.",
    tech: ["LLaMA 3.1", "SageMaker", "Ontology AI", "Azure OpenAI"],
    metric: "85% accuracy",
    accent: "lime",
  },
  {
    tag: "Full-Stack + GenAI",
    title: "LP Unitization Feature",
    desc: "End-to-end build at Clearwater: schema design, Java/Spring Boot backend, React/TypeScript UI. Unlocked an entire market segment in Europe.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL"],
    metric: "New market unlocked",
    accent: "warm",
  },
  {
    tag: "ML / Anomaly Detection",
    title: "athenaOne Health POC",
    desc: "Time-series anomaly detection across system metrics — Linear/Polynomial Regression, Random Forest, and statistical models to reduce mean-time-to-detect.",
    tech: ["Python", "Time-Series", "Random Forest"],
    metric: "Proactive detection",
    accent: "warm",
  },
];

export const SKILL_GROUPS = [
  {
    name: "Languages",
    items: [
      { name: "Java", weight: 3 },
      { name: "Python", weight: 3 },
      { name: "TypeScript", weight: 3 },
      { name: "JavaScript", weight: 3 },
      { name: "SQL", weight: 2 },
      { name: "PostgreSQL", weight: 2 },
      { name: "Perl", weight: 1 },
      { name: "C++", weight: 2 },
    ],
  },
  {
    name: "Frameworks & Cloud",
    items: [
      { name: "Spring Boot", weight: 3 },
      { name: "React", weight: 3 },
      { name: "Node.js", weight: 2 },
      { name: "Kafka", weight: 2 },
      { name: "AWS Lambda", weight: 3 },
      { name: "S3", weight: 2 },
      { name: "SageMaker", weight: 3 },
      { name: "Microservices", weight: 3 },
      { name: "Angular", weight: 2 },
      { name: "Express.js", weight: 2 },
    ],
  },
  {
    name: "GenAI / LLM / ML",
    items: [
      { name: "OpenAI GPT", weight: 3 },
      { name: "Azure OpenAI", weight: 3 },
      { name: "LLaMA 3.1", weight: 3 },
      { name: "Fine-tuning", weight: 3 },
      { name: "RAG", weight: 3 },
      { name: "LangChain", weight: 2 },
      { name: "FAISS", weight: 2 },
      { name: "Pinecone", weight: 2 },
      { name: "Hugging Face", weight: 2 },
      { name: "Ontology AI", weight: 3 },
      { name: "Random Forest", weight: 2 },
      { name: "Time-Series", weight: 2 },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Git", weight: 3 },
      { name: "Perforce", weight: 2 },
      { name: "Linux", weight: 2 },
      { name: "JIRA", weight: 2 },
      { name: "Grafana", weight: 2 },
      { name: "Graylog", weight: 1 },
    ],
  },
];

// Workplace + hackathon recognition. Platform-ranking achievements live inside
// the CODING_STATS platform cards (LeetCode, CodeChef, DSA Mastery) — kept
// separate to avoid duplication.
export const ACHIEVEMENTS = [
  { metric: "★", label: "Rising Star of Zone", sub: "Engineering Director recognition, athenahealth" },
  { metric: "★", label: "Standing Ovation", sub: "Release Quarter Sep '24 — Nov '24" },
  { metric: "★", label: "Applause Award", sub: "Release Quarter Jun '24 — Aug '24" },
  { metric: "🏆", label: "NeuraHacks 2022 Winner", sub: "Devpost hackathon · independent build" },
  { metric: "1000+", label: "Students Mentored", sub: "DSA code review at PepCoding" },
];

export const EDUCATION = {
  institution: "Guru Tegh Bahadur Institute of Technology",
  shortName: "GTBIT",
  location: "New Delhi",
  degree: "Bachelor of Technology",
  field: "Electronics and Communication Engineering",
  cgpa: "8.116",
  period: "2018 — 2022",
  yearLabel: "2018",
};

export const CODING_STATS = [
  {
    id: "leetcode",
    platform: "LeetCode",
    handle: "bhattashish210",
    url: "https://leetcode.com/bhattashish210",
    rating: 1902,
    ratingMax: 2400,
    badge: "Knight",
    colorVar: "--accent",
    stars: null,
    stats: [
      { label: "Problems Solved", value: "1000+" },
      { label: "Global Standing", value: "Top 4.39%" },
      { label: "Max Rating", value: "1902" },
      { label: "Best AIR", value: "41" },
    ],
    highlight: "AIR 41 & Global Rank 577 in Weekly Contest 295 out of 23k+ participants",
  },
  {
    id: "codechef",
    platform: "CodeChef",
    handle: "sobersoul",
    url: "https://codechef.com/users/sobersoul",
    rating: 1858,
    ratingMax: 2000,
    badge: "4★ Coder",
    colorVar: "--warm",
    stars: 4,
    stats: [
      { label: "Star Rating", value: "4 ★" },
      { label: "Max Rating", value: "1858" },
      { label: "Best Result", value: "Rank 1" },
      { label: "Division", value: "Div 1" },
    ],
    highlight: "Global Rank 1 in CodeChef May Long Two Challenge",
  },
  {
    id: "overall",
    platform: "DSA Mastery",
    handle: "All Platforms",
    url: "https://codeforces.com/profile/bhattbhai",
    rating: null,
    ratingMax: null,
    badge: "1000+ Solved",
    colorVar: "--violet",
    stars: null,
    stats: [
      { label: "Total Solved", value: "1000+" },
      { label: "LeetCode", value: "1000+" },
      { label: "Active Since", value: "2018" },
      { label: "Hackathon", value: "Winner" },
    ],
    highlight: "NeuraHacks 2022 winner on Devpost · Codeforces: bhattbhai",
  },
];

export const MARQUEE_ITEMS = [
  "Spring Boot",
  "OpenAI",
  "LLaMA 3.1",
  "React",
  "Kafka",
  "RAG",
  "LangChain",
  "AWS SageMaker",
  "Fine-tuning",
  "PostgreSQL",
  "TypeScript",
  "Ontology AI",
  "Vector DBs",
  "Microservices",
];
