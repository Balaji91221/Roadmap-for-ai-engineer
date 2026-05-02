import { Gap } from '@/lib/types'

export const GAPS: Gap[] = [
  { area: 'Python for AI', priority: 'CRITICAL', time: '4-6 weeks', items: ['Python OOP, generators, decorators', 'NumPy vectorized ops and broadcasting', 'Pandas DataFrames, merge, groupby', 'You already know programming, so this is mostly ecosystem fluency.'], color: '#C0392B' },
  { area: 'Mathematics for ML', priority: 'CRITICAL', time: '6-8 weeks', items: ['Linear algebra essentials', 'Probability and statistics foundations', 'Calculus intuition for optimization', 'Focus on intuition and application over proofs.'], color: '#C0392B' },
  { area: 'Machine Learning Core', priority: 'CRITICAL', time: '8-12 weeks', items: ['Scikit-learn regression/classification/clustering', 'Model evaluation and error analysis', 'Feature engineering and pipelines', 'Build baseline models before chasing complexity.'], color: '#C17E3A' },
  { area: 'Deep Learning & NLP', priority: 'IMPORTANT', time: '10-14 weeks', items: ['PyTorch fundamentals', 'Transformer architecture', 'HuggingFace ecosystem', 'Practice with real datasets and realistic objectives.'], color: '#C17E3A' },
  { area: 'Generative AI & LLMs', priority: 'HIGH VALUE', time: '8-12 weeks', items: ['Prompt engineering', 'RAG architecture and evaluation', 'LangGraph and agent workflows', 'Treat this as product engineering, not toy demos.'], color: '#2D6A4F' },
  { area: "MLOps - you're 50% there", priority: 'IMPORTANT', time: '4-6 weeks', items: ['Docker and deployment basics', 'FastAPI model serving', 'MLflow and experiment tracking', 'Your backend experience accelerates this phase heavily.'], color: '#1E2B4A' },
]
