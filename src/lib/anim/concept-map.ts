import type { Week } from '@/lib/types'
import { ANIM_LIBRARY, type AnimSpec } from '@/lib/anim'
import { conceptWebAnim } from '@/lib/anim/concept-web'

type WeekLike = Pick<Week, 'topic' | 'div' | 'subtopics' | 'week'>
const cleanName = (s: string) => s.replace(/\s*\((Beginner|Intermediate|Advanced|Expert)\)/, '').trim()

// Map a week to the best-fit concept animation by matching keywords in its topic.
// Rules are ordered most-specific first; the division animation is the fallback.
type Rule = { id: string; keywords: string[] }

// Ordered most-specific → most-general. Keyword substrings are matched against the lowercased text;
// traps like "storage"⊃"rag", "image generation"⊃"image", "data pipeline"⊃"pipeline",
// "batch norm"⊃"batch", "precision/recall"⊃"precision" are avoided by using specific phrases.
const RULES: Rule[] = [
  { id: 'A_mcp', keywords: ['mcp', 'model context protocol', 'model-tool', 'tool connectivity', 'tool integration'] },
  { id: 'A_a2a', keywords: ['a2a', 'agent-to-agent', 'agent to agent', 'task card', 'agent communication', 'agent protocol'] },
  { id: 'A_cnn', keywords: ['cnn', 'convolution', 'pooling', 'feature map', 'image classif', 'object detection', 'segmentation', 'computer vision'] },
  { id: 'A_backprop', keywords: ['backprop', 'back-propagation', 'back propagation', 'backward pass', 'chain rule'] },
  { id: 'A_quantization', keywords: ['quantiz', 'int8', 'int4', 'distill', 'pruning', 'model compression', 'compression'] },
  { id: 'A_cache', keywords: ['caching', 'cache', 'semantic cache', 'redis'] },
  { id: 'A_guardrail', keywords: ['guardrail', 'jailbreak', 'prompt injection', 'injection', 'moderation', 'content filter', 'alignment', 'red team', 'responsible', 'ethic', 'governance', 'safety', 'secret', 'vault', 'credential', 'rbac', 'access control'] },
  { id: 'A_container', keywords: ['docker', 'container', 'dockerfile', 'containeriz', 'podman'] },
  { id: 'A_iac', keywords: ['terraform', 'infrastructure as code', 'cloudformation', 'pulumi', 'ansible', 'provision'] },
  // inference runtimes / hardware — keep ahead of the generic "attention" rule (PagedAttention etc.)
  { id: 'A_serving', keywords: ['vllm', 'tensorrt', 'onnx', 'triton', 'tgi', 'paged attention', 'pagedattention', 'gpu'] },
  { id: 'A_diffusion', keywords: ['diffusion', 'stable diffusion', 'image generation', 'text-to-image', 'gan', 'vae', 'multimodal'] },
  { id: 'A_finetune', keywords: ['fine-tun', 'fine tun', 'finetun', 'lora', 'peft', 'transfer learning', 'instruction tun', 'adapter', 'rlhf', 'dpo', 'sft'] },
  { id: 'A_rag', keywords: ['retrieval-augmented', 'retrieval augmented', 'retrieval', ' rag', 'rag '] },
  { id: 'A_vectorsearch', keywords: ['vector db', 'vector database', 'vector store', 'vector search', 'similarity search', 'nearest neighbor', 'embedding search', 'reranking', 'qdrant', 'pinecone', 'faiss', 'pgvector'] },
  { id: 'A_embeddings', keywords: ['embedding', 'word2vec', 'vector representation', 'semantic'] },
  { id: 'A_tokenization', keywords: ['token', 'bpe', 'byte-pair', 'byte pair', 'tokeniz', 'vocabulary'] },
  { id: 'A_transformer', keywords: ['attention', 'transformer', 'self-attention', 'positional encoding', 'gpt architecture'] },
  { id: 'A_cot', keywords: ['prompt', 'chain-of-thought', 'chain of thought', 'reasoning', 'few-shot', 'in-context', 'tree of thought'] },
  { id: 'A_multiagent', keywords: ['multi-agent', 'multi agent', 'orchestrat', 'supervisor', 'crew', 'swarm', 'handoff', 'collaborat', 'interplay', 'interoperab', 'delegation'] },
  { id: 'A_agentloop', keywords: ['agent', 'react', 'autonomous', 'tool use', 'tool calling', 'function calling', 'planning', 'memory', 'reflexion'] },
  { id: 'A_neuralnet', keywords: ['neural net', 'perceptron', 'mlp', 'feedforward', 'activation', 'rnn', 'lstm', 'recurrent', 'gru', 'batch normaliz', 'deep learning'] },
  { id: 'A_gradient', keywords: ['gradient', 'descent', 'learning rate', 'loss function', 'optimizer', 'sgd', 'adam', 'overfit', 'regulariz', 'regression'] },
  { id: 'A_supervised', keywords: ['supervised', 'classification', 'clustering', 'unsupervised', 'scikit', 'xgboost', 'random forest', 'svm', 'decision tree', 'knn', 'machine learning', 'feature engineer'] },
  { id: 'A_canary', keywords: ['canary', 'rollout', 'blue-green', 'blue green', 'a/b test', 'ab test', 'shadow deploy', 'deployment strateg'] },
  { id: 'A_k8s', keywords: ['kubernetes', 'k8s', 'pod', 'helm', 'cluster', 'scheduler'] },
  { id: 'A_autoscale', keywords: ['autoscal', 'auto-scal', 'scaling', 'load balanc', 'hpa', 'replica', 'horizontal scal', 'elastic'] },
  { id: 'A_cicd', keywords: ['ci/cd', 'cicd', 'ci cd', 'continuous integration', 'continuous deploy', 'github actions', 'argocd', 'gitops', 'deployment pipeline', 'build pipeline'] },
  { id: 'A_monitoring', keywords: ['monitor', 'observ', 'logging', 'tracing', 'metric', 'prometheus', 'grafana', 'slo', 'sli', 'alert', 'eval', 'benchmark', 'drift', 'dashboard'] },
  { id: 'A_serving', keywords: ['inference', 'serving', 'vllm', 'tgi', 'batching', 'batch inference', 'throughput', 'latency', 'kv cache', 'speculative'] },
  { id: 'A_pipeline', keywords: ['data pipeline', 'data engineering', 'etl', 'ingest', 'pandas', 'eda', 'preprocess', 'data collection', 'feature store', 'airflow'] },
]

/** Resolve the animation id for a topic string (lowercased match), or null if none matched. */
export function conceptAnimId(topic: string): string | null {
  const t = topic.toLowerCase()
  for (const rule of RULES) {
    if (rule.keywords.some((k) => t.includes(k))) return rule.id
  }
  return null
}

const webCaption = (topic: string) => `The core parts of ${topic} and how they connect — pick a step to focus it.`

/** Content-driven fallback: a node graph of this week's own subtopics (optionally highlighting one). */
function webForWeek(week: WeekLike, highlight: number): AnimSpec {
  const nodes = (week.subtopics ?? []).map((s) => cleanName(s.name))
  return conceptWebAnim({
    id: `web_w${week.week}${highlight >= 0 ? `_${highlight}` : ''}`,
    title: week.topic,
    nodes: nodes.length ? nodes : [week.topic],
    caption: webCaption(week.topic),
    highlight,
  })
}

/** Best-fit animation for a week: a matching archetype, else its own content-driven concept web. */
export function conceptAnimForWeek(week: WeekLike): AnimSpec {
  const id = conceptAnimId(week.topic)
  return (id && ANIM_LIBRARY[id]) || webForWeek(week, -1)
}

/**
 * Animation for a subtopic: its own matching archetype if any, otherwise this week's concept web
 * with the active subtopic highlighted — so every subtopic shows a relevant, on-topic visual.
 */
export function conceptAnimForSubtopic(subtopicName: string, week: WeekLike): AnimSpec {
  const id = conceptAnimId(subtopicName)
  if (id && ANIM_LIBRARY[id]) return ANIM_LIBRARY[id]
  const idx = (week.subtopics ?? []).findIndex((s) => s.name === subtopicName)
  return webForWeek(week, idx)
}
