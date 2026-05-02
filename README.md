# AI Engineering Mastery — Zero to Hero

![Agentic AI Roadmap](agentic%20ai.jpeg)

> **84 weeks · 8 divisions · From ML foundations to production-grade agent systems & DevOps**

---

## The 8 Divisions

| # | Division | Weeks | What You'll Master |
|---|---|---|---|
| 1 | **ML Foundations** | W1–W5 | NLP, supervised/unsupervised learning, RLHF |
| 2 | **Deep Learning** | W6–W12 | CNNs, RNNs, Transformers, transfer learning, pretraining |
| 3 | **Generative AI** | W13–W28 | Prompt engineering, RAG, fine-tuning (LoRA/QLoRA/PEFT), multimodal AI |
| 4 | **Agentic AI** | W29–W41 | Agent frameworks, planning, memory, multi-agent collaboration |
| 5 | **Advanced Agents** | W42–W56 | MCP/A2A protocols, governance, self-improving agents |
| 6 | **Production AI** | W57–W64 | LLM inference/serving, vector DBs, system design, security |
| 7 | **Agent Deployment** | W65–W72 | Containerization, scaling, monitoring, reliability engineering |
| 8 | **DevOps & Infra** | W73–W84 | Docker, K8s, CI/CD, Terraform, cloud, SRE |

---

## What Each Week Includes

Every topic in the roadmap is enriched with:

- **Difficulty Level** — Beginner → Intermediate → Advanced → Expert
- **Effort Estimate** — How many hours/days this topic demands
- **Prerequisites** — Which prior weeks you should complete first
- **5 Key Concepts** — The core ideas you must understand
- **3-4 Learning Resources** — Curated courses, docs, videos, papers, and tools with URLs
- **Mini Project** — A hands-on build project with measurable outcomes
- **3 Interview Questions** — Real questions you'd face in AI engineering interviews
- **Content Hook** — A LinkedIn/Twitter post hook for building in public
- **Post Formats** — Carousel, thread, demo, or infographic suggestions
- **Hashtags** — Platform-specific tags per division
- **Follow-up Action** — What to implement after studying

---

## Division 3 — Generative AI (New: Fine-tuning Track)

The GenAI division now includes a dedicated **Fine-tuning & Adaptation** track:

| Week | Topic | Difficulty |
|------|-------|-----------|
| W20 | Fine-tuning Fundamentals (Full FT vs PEFT) | Intermediate |
| W21 | LoRA, QLoRA & PEFT Techniques | Advanced |
| W22 | Dataset Curation & Preprocessing | Intermediate |
| W23 | Evaluation & Benchmarking Fine-tuned Models | Advanced |

---

## Division 7 — Agent Deployment (NEW)

Bridges the gap between "I built an agent" and "it's running in production reliably":

| Week | Topic | Difficulty |
|------|-------|-----------|
| W65 | Agent Packaging & Containerization | Intermediate |
| W66 | Agent API Design & Gateway Patterns | Advanced |
| W67 | Agent State Management in Production | Advanced |
| W68 | Agent Scaling — Horizontal, Vertical & Serverless | Advanced |
| W69 | Agent Monitoring, Logging & Alerting | Advanced |
| W70 | Agent Versioning, Rollouts & Canary Deployments | Advanced |
| W71 | Multi-Agent System Deployment Architectures | Expert |
| W72 | Agent Reliability Engineering (SLOs, Chaos Testing) | Expert |

---

## Division 8 — DevOps & Infrastructure (NEW)

The full DevOps toolkit from zero:

| Week | Topic | Difficulty |
|------|-------|-----------|
| W73 | Linux Fundamentals & Shell Scripting | Beginner |
| W74 | Git Advanced (Branching, Monorepos, Hooks) | Intermediate |
| W75 | Docker Deep Dive (Multi-stage, Compose) | Intermediate |
| W76 | Kubernetes (Pods, Deployments, Services) | Advanced |
| W77 | Helm, Kustomize & K8s Package Management | Advanced |
| W78 | CI/CD Pipelines (GitHub Actions, ArgoCD) | Intermediate |
| W79 | Infrastructure as Code (Terraform, Pulumi) | Advanced |
| W80 | Cloud Platforms (AWS / GCP / Azure) | Intermediate |
| W81 | Networking & Security (VPC, IAM, TLS) | Advanced |
| W82 | Monitoring & Observability (Prometheus, Grafana) | Advanced |
| W83 | Serverless & Edge Computing | Intermediate |
| W84 | Site Reliability Engineering (SLOs, Runbooks) | Advanced |

---

## Project Structure

```
learn-everything/
├── src/
│   ├── app/                    # Next.js pages
│   ├── components/
│   │   ├── layout/             # Sidebar, Topbar, PageWrapper
│   │   ├── pages/              # Page-level client components
│   │   └── shared/             # WeekCard, DetailPanel, FilterTabs, etc.
│   ├── hooks/                  # useFilter, useSelectedWeek
│   └── lib/
│       ├── types.ts            # TypeScript type definitions
│       ├── utils.ts            # Utility functions
│       └── data/               # All roadmap data
│           ├── weeks.ts        # 84 enriched week entries
│           ├── divisions.ts    # 8 division definitions
│           ├── phases.ts       # Career phase progression
│           ├── content.ts      # Daily themes, pillars, hooks
│           ├── skills.ts       # Skill assessment data
│           ├── gaps.ts         # Gap analysis data
│           ├── ladder.ts       # Career ladder steps
│           └── trending.ts     # Trending AI topics
├── content/
│   └── colab-notebooks/        # Generated Jupyter notebooks per week
├── scripts/
│   └── generate-topic-notebooks.mjs
└── package.json
```

---

## Getting Started

```bash
npm install
npm run dev
```

Generate Colab notebooks:
```bash
node scripts/generate-topic-notebooks.mjs
```

---

## Target Roles

- **AI Engineer** · **ML Engineer** · **GenAI Engineer**
- **AI Platform Engineer** · **MLOps Engineer**
- **Senior AI Engineer** · **AI Architect**
- **Full-Stack AI Developer** · **DevOps/SRE for AI**
