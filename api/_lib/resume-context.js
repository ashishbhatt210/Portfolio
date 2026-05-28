// Resume context used as grounding for every AI feature.
// Keep this in sync with src/data/resume.js (or import & build it from there in a future refactor).

export const RESUME_CONTEXT = `
ASHISH BHATT — Software Engineer
Location: Ghaziabad, Uttar Pradesh, India
Email: bhattashish210@gmail.com | LinkedIn: /in/ashishbhatt210/ | Phone: +91 8448706390

CURRENT ROLE — Clearwater Analytics (March 2026 – Present)
Software Development Engineer III | Project: Alternative Assets & MLx
- Spearheaded end-to-end Unitization feature for Limited Partnerships (LPs) — a previously unsupported capability. Designed data model, schema changes, Java/Spring Boot backend, and React/TypeScript UI. Shipped to production and unlocked the European market segment.
- Backend services for Alternative Assets & MLx platform using Java + Spring Boot, supporting investment accounting and reporting workflows for institutional clients.
- Full-stack features: Java microservices integrated with React/TypeScript front-end for portfolio analysts.
- REST APIs and Kafka-based event-driven pipelines for high-volume asset data ingestion.
- AWS Lambda + S3 for serverless data processing.
- Integrated GenAI (OpenAI and Azure OpenAI APIs) into the MLx platform for asset classification, data extraction, and analyst productivity.
- Optimized PostgreSQL queries and JPA data access patterns.

PREVIOUS — athenahealth (July 2023 – March 2026)
Member of Technical Staff | Secondary Team Lead & Scrum Master

GenAI & ML Initiatives:
- Automated BKM (Business Knowledge Model) document generation using GenAI — saved 40-50 hours per sprint.
- Built AI-driven Rulespec Generator (Python + Azure GenAI + NLP) — cut manual analyst effort by 70%, achieved 90% accuracy on simple rules, 75% on complex rules. Boosted LLM inference accuracy 70% → 85% and reduced validation time from 8 hours to 1 hour using an ontology-based AI pipeline.
- AI-powered BKM Doc Generator using OpenAI LLMs and embeddings — reduced documentation time from 30-60 minutes to 5 minutes. Processing speed: 50 → 200 documents/day.
- Automated rule creation framework: 2-3 day manual process → 1-hour AI-powered workflow.
- Fine-tuned LLaMA 3.1 on AWS SageMaker using 48x-large GPU clusters for rulespec generation.
- Anomaly detection POC for athenaOne system health — Linear/Polynomial Regression, Random Forest, time-series statistical models.

athenaOne Project:
- Led POCs to detect and eliminate performance bottlenecks.
- Migrated business rules from monolithic Perl system to Java microservices; built custom rule engine plugins.
- Built internal developer productivity tools.
- Java + Spring Boot + REST APIs for business logic; DB query optimization.
- UI Testing & Claim Overrides with automated testing workflows.
- Scrum Master: sprint planning, stand-ups, grooming, retros. Mentored team members.

PREVIOUS — Compro Technologies (April 2022 – July 2023)
Associate Software Engineer | Project: CambridgeOne
- End-to-end development with Angular, Vue, Node.js.
- Node.js + Express.js for FrontEnd-backend integration with DLS, AWS, GetStream, PubNub, Heroku.
- Event-driven solutions with AWS Lambda + S3 + API Gateway.
- Performance optimization and security hardening.

INTERNSHIP — PepCoding Education (Sep 2021 – March 2022)
Product Engineer Intern | NADOS Platform
- Created video solutions for 200+ DSA problems.
- Reviewed code and mentored 1000+ students in Java and C++.

EDUCATION
Guru Tegh Bahadur Institute of Technology, New Delhi (2018-2022)
BTech, Electronics and Communication Engineering | CGPA: 8.116

SKILLS
Languages: Java, JavaScript, TypeScript, Python, Perl, C++, SQL, PostgreSQL
Frameworks & Cloud: Spring Boot, React, Angular, Node.js, Express.js, AWS (Lambda, S3, SageMaker), Azure OpenAI, Kafka, REST APIs, Microservices, Firebase
GenAI/LLM/ML: OpenAI GPT, Azure OpenAI, LLaMA 3.1, Hugging Face, LangChain, RAG, Fine-tuning LLMs, Vector Databases (FAISS, Pinecone), Ontology-based AI, Linear/Polynomial Regression, Random Forest, Time-Series Anomaly Detection
Tools: Git, Perforce, Linux/Unix, JIRA, Grafana, Graylog

ACHIEVEMENTS
- Rising Star of Zone Award — honored by Engineering Director for technical innovation.
- Standing Ovation Recognition — Sep'24-Nov'24 Release Quarter.
- Applause Award — Jun'24-Aug'24 Release Quarter.
- Top 4.39% on LeetCode globally — 4-star Coder, 1000+ problems solved, Max Contest Rating 1902 (Knight Badge).
- 4-star Coder on CodeChef, Max Rating 1858, Global Rank-1 in CodeChef May Long Two.
- All India Rank 41, Global Rank 577 in LeetCode Weekly Contest 295 (23k+ participants).
- Winner of NeuraHacks 2022 on Devpost.
- 1000+ DSA problems solved across coding platforms.
`;
