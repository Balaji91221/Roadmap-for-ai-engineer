import { Phase } from '@/lib/types'

const item = (name: string, tag: string) => ({
  name,
  tag,
  depth: `${name} starts with fundamentals, then moves into implementation patterns and production constraints. You will practice through guided mini-projects and measurable quality outcomes.`,
  why: `${name} increases both reliability and career leverage when combined with full-stack execution.`,
  resources: ['Official docs', 'Hands-on guides', 'Project templates'],
})

export const PHASES: Phase[] = [
  {
    id: '01',
    title: 'Python + Math Bootcamp',
    sub: 'Build the base layer for AI engineering',
    duration: '4-8 weeks',
    level: 'AI-Ready Developer',
    salary: 'Current salary +20-40%',
    color: '#7C6AF7',
    note: 'This phase is acceleration, not reset, because your engineering fundamentals already exist.',
    sections: [
      { title: 'Core Foundations', items: [item('Python Workflow Fluency', 'FAST TRACK'), item('Math Intuition for ML', 'CORE')] },
      { title: 'Applied Foundations', items: [item('NumPy + Pandas Patterns', 'ADVANTAGE'), item('Mini Portfolio Projects', 'SUPERPOWER')] },
    ],
    projects: [
      { name: 'Data Profiling CLI', desc: 'Build a Python CLI for dataset profiling and validation.', stack: 'Python, Pandas, Typer', impact: 'Demonstrates practical data engineering readiness.' },
      { name: 'Baseline Prediction API', desc: 'Train and serve a baseline model through an API.', stack: 'Scikit-learn, FastAPI', impact: 'Connects modeling to real application delivery.' },
    ],
    roles: ['AI-Ready Developer', 'Applied Software Engineer', 'Junior AI Engineer'],
  },
  {
    id: '02',
    title: 'Classical ML + Your Data Skills',
    sub: 'Turn SQL and APIs into ML systems',
    duration: '6-10 weeks',
    level: 'Junior ML Engineer',
    salary: 'INR 8-14 LPA',
    color: '#22C55E',
    note: 'Your SQL depth makes this phase highly leverageable.',
    sections: [
      { title: 'Modeling Systems', items: [item('Supervised Pipelines', 'CORE'), item('Feature Engineering with SQL', 'ADVANTAGE')] },
      { title: 'Evaluation Discipline', items: [item('Error Analysis Loop', 'FAST TRACK'), item('Experiment Tracking', 'CORE')] },
    ],
    projects: [
      { name: 'Churn Predictor', desc: 'Predict churn and explain key drivers.', stack: 'SQL, Scikit-learn, SHAP', impact: 'Shows business-aligned ML delivery.' },
      { name: 'Fraud Scoring API', desc: 'Serve risk predictions with thresholds.', stack: 'FastAPI, Python, Postgres', impact: 'Demonstrates practical inference architecture.' },
    ],
    roles: ['Junior ML Engineer', 'Applied Data Engineer', 'ML Associate'],
  },
  {
    id: '03',
    title: 'Deep Learning & Transformers',
    sub: 'Move into modern representation learning',
    duration: '8-12 weeks',
    level: 'AI/NLP Engineer',
    salary: 'INR 12-20 LPA',
    color: '#F59E0B',
    note: 'This phase unlocks transformer-native engineering skills.',
    sections: [
      { title: 'Neural Foundations', items: [item('PyTorch Fundamentals', 'CORE'), item('Transformer Internals', 'SUPERPOWER')] },
      { title: 'NLP Application Layer', items: [item('Fine-tuning Patterns', 'FAST TRACK'), item('NLP Evaluation Systems', 'CORE')] },
    ],
    projects: [
      { name: 'Document Intelligence Pipeline', desc: 'Summarize and classify documents with transformers.', stack: 'PyTorch, Transformers, FastAPI', impact: 'Shows advanced NLP capability.' },
      { name: 'Semantic Search Service', desc: 'Build embeddings and retrieval for technical corpora.', stack: 'Sentence Transformers, Vector DB', impact: 'Lays groundwork for enterprise RAG systems.' },
    ],
    roles: ['AI Engineer', 'NLP Engineer', 'Applied DL Engineer'],
  },
  {
    id: '04',
    title: 'Generative AI & LLM Engineering',
    sub: 'Build practical LLM and agent workflows',
    duration: '8-12 weeks',
    level: 'GenAI Engineer',
    salary: 'INR 18-35 LPA',
    color: '#EC4899',
    note: 'This phase turns AI capability into product systems.',
    sections: [
      { title: 'LLM Product Architecture', items: [item('Prompt Systems + Guardrails', 'CORE'), item('RAG End-to-End', 'ADVANTAGE')] },
      { title: 'Agentic Workflows', items: [item('Tool-Using Agents', 'SUPERPOWER'), item('Evaluation + Observability', 'CORE')] },
    ],
    projects: [
      { name: 'Enterprise RAG Assistant', desc: 'Grounded assistant for internal knowledge with citations.', stack: 'Next.js, FastAPI, Vector DB', impact: 'Demonstrates enterprise-grade GenAI architecture.' },
      { name: 'Agent Workflow Orchestrator', desc: 'Research -> draft -> review multi-agent pipeline.', stack: 'LangGraph, Redis, Postgres', impact: 'Shows reliable agent orchestration patterns.' },
    ],
    roles: ['GenAI Engineer', 'LLM Engineer', 'AI Product Engineer'],
  },
  {
    id: '05',
    title: 'MLOps & Production',
    sub: 'Operationalize reliability, governance, and cost control',
    duration: '4-6 weeks',
    level: 'Senior AI Engineer',
    salary: 'INR 22-35 LPA',
    color: '#F97316',
    note: 'Production maturity is what separates mid-level from senior AI engineers.',
    sections: [
      { title: 'Production Engineering', items: [item('Deployment + Runtime Ops', 'CORE'), item('Monitoring + Incident Response', 'ADVANTAGE')] },
      { title: 'Governance and Scale', items: [item('Safety + Governance', 'CORE'), item('Cost + Performance Optimization', 'FAST TRACK')] },
    ],
    projects: [
      { name: 'AI Reliability Control Plane', desc: 'Centralized quality, cost, and trace visibility for AI services.', stack: 'Next.js, OpenTelemetry, Postgres', impact: 'Shows senior-level operational ownership.' },
      { name: 'Governed Multi-Agent Platform', desc: 'Policy-aware orchestration with audit and rollback controls.', stack: 'LangGraph, MCP, Kubernetes', impact: 'Demonstrates architecture and governance maturity.' },
    ],
    roles: ['Senior AI Engineer', 'AI Platform Engineer', 'ML Systems Lead'],
  },
]
