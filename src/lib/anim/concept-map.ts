import type { Week } from '@/lib/types'
import { ANIM, ANIM_LIBRARY, type AnimSpec } from '@/lib/anim'

// Map a week to the best-fit concept animation by matching keywords in its topic.
// Rules are ordered most-specific first; the division animation is the fallback.
type Rule = { id: string; keywords: string[] }

const RULES: Rule[] = [
  { id: 'A_rag', keywords: ['rag', 'retrieval-augmented', 'retrieval augmented'] },
  { id: 'A_vectorsearch', keywords: ['vector db', 'vector database', 'vector store', 'vector search', 'similarity search', 'nearest neighbor', 'embedding search', 'qdrant', 'pinecone', 'faiss', 'pgvector', 'ann '] },
  { id: 'A_embeddings', keywords: ['embedding', 'word2vec', 'vector representation', 'semantic'] },
  { id: 'A_tokenization', keywords: ['token', 'bpe', 'byte-pair', 'byte pair', 'tokeniz'] },
  { id: 'A_transformer', keywords: ['attention', 'transformer', 'self-attention', 'positional encoding'] },
  { id: 'A_diffusion', keywords: ['diffusion', 'stable diffusion', 'image generation', 'text-to-image', 'gan', 'vae', 'multimodal', 'computer vision', 'vision'] },
  { id: 'A_finetune', keywords: ['fine-tun', 'fine tun', 'finetun', 'lora', 'peft', 'transfer learning', 'instruction tun', 'adapter', 'rlhf', 'dpo'] },
  { id: 'A_cot', keywords: ['prompt', 'chain-of-thought', 'chain of thought', 'reasoning', 'few-shot', 'in-context', 'cot'] },
  { id: 'A_multiagent', keywords: ['multi-agent', 'multi agent', 'orchestrat', 'a2a', 'mcp', 'supervisor', 'crew', 'swarm', 'handoff', 'collaborat'] },
  { id: 'A_agentloop', keywords: ['agent', 'react', 'autonomous', 'tool use', 'tool calling', 'function calling', 'planning', 'memory'] },
  { id: 'A_neuralnet', keywords: ['neural net', 'backprop', 'perceptron', 'mlp', 'feedforward', 'activation', 'cnn', 'rnn', 'lstm', 'deep learning'] },
  { id: 'A_gradient', keywords: ['gradient', 'optimiz', 'loss function', 'regression', 'descent', 'overfit', 'regulariz'] },
  { id: 'A_supervised', keywords: ['supervised', 'classification', 'clustering', 'unsupervised', 'scikit', 'xgboost', 'random forest', 'svm', 'decision tree', 'knn', 'machine learning', 'feature'] },
  { id: 'A_vectorsearch', keywords: ['cache', 'semantic cache'] },
  { id: 'A_canary', keywords: ['canary', 'rollout', 'blue-green', 'blue green', 'a/b test', 'ab test', 'shadow', 'deployment strateg'] },
  { id: 'A_k8s', keywords: ['kubernetes', 'k8s', 'pod', 'helm', 'docker', 'container', 'cluster', 'orchestration'] },
  { id: 'A_autoscale', keywords: ['autoscal', 'auto-scal', 'scaling', 'load balanc', 'hpa', 'replica', 'horizontal scal'] },
  { id: 'A_cicd', keywords: ['ci/cd', 'cicd', 'ci cd', 'continuous integration', 'continuous deploy', 'github actions', 'argocd', 'gitops', 'pipeline', 'terraform', 'infrastructure as code'] },
  { id: 'A_monitoring', keywords: ['monitor', 'observ', 'logging', 'tracing', 'metric', 'prometheus', 'grafana', 'slo', 'alert', 'eval', 'benchmark', 'guardrail', 'governance', 'safety', 'security', 'injection', 'red team', 'drift'] },
  { id: 'A_serving', keywords: ['serv', 'inference', 'vllm', 'batch', 'throughput', 'latency', 'quantiz', 'kv cache', 'distill', 'optimization'] },
  { id: 'A_pipeline', keywords: ['data pipeline', 'data engineering', 'etl', 'ingest', 'pandas', 'eda', 'preprocess', 'data collection'] },
]

/** Resolve the animation id for a topic string (lowercased match), or null if none matched. */
export function conceptAnimId(topic: string): string | null {
  const t = topic.toLowerCase()
  for (const rule of RULES) {
    if (rule.keywords.some((k) => t.includes(k))) return rule.id
  }
  return null
}

/** Best-fit concept animation for a week, falling back to its division explainer. */
export function conceptAnimForWeek(week: Pick<Week, 'topic' | 'div'>): AnimSpec {
  const id = conceptAnimId(week.topic)
  return (id && ANIM_LIBRARY[id]) || ANIM[week.div]
}
