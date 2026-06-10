import type { AnimSpec } from './types'
import A_supervised from '@/components/anim/A_supervised'
import A_transformer from '@/components/anim/A_transformer'
import A_rag from '@/components/anim/A_rag'
import A_agentloop from '@/components/anim/A_agentloop'
import A_multiagent from '@/components/anim/A_multiagent'
import A_serving from '@/components/anim/A_serving'
import A_canary from '@/components/anim/A_canary'
import A_k8s from '@/components/anim/A_k8s'
import A_gradient from '@/components/anim/A_gradient'
import A_neuralnet from '@/components/anim/A_neuralnet'
import A_embeddings from '@/components/anim/A_embeddings'
import A_tokenization from '@/components/anim/A_tokenization'
import A_diffusion from '@/components/anim/A_diffusion'
import A_finetune from '@/components/anim/A_finetune'
import A_cot from '@/components/anim/A_cot'
import A_vectorsearch from '@/components/anim/A_vectorsearch'
import A_pipeline from '@/components/anim/A_pipeline'
import A_autoscale from '@/components/anim/A_autoscale'
import A_cicd from '@/components/anim/A_cicd'
import A_monitoring from '@/components/anim/A_monitoring'

/** One explainer animation per division, keyed by division id (1–8). */
export const ANIM: Record<number, AnimSpec> = {
  1: A_supervised,
  2: A_transformer,
  3: A_rag,
  4: A_agentloop,
  5: A_multiagent,
  6: A_serving,
  7: A_canary,
  8: A_k8s,
}

const ALL: AnimSpec[] = [
  A_supervised,
  A_transformer,
  A_rag,
  A_agentloop,
  A_multiagent,
  A_serving,
  A_canary,
  A_k8s,
  A_gradient,
  A_neuralnet,
  A_embeddings,
  A_tokenization,
  A_diffusion,
  A_finetune,
  A_cot,
  A_vectorsearch,
  A_pipeline,
  A_autoscale,
  A_cicd,
  A_monitoring,
]

/** Every concept animation in the library, keyed by its id. */
export const ANIM_LIBRARY: Record<string, AnimSpec> = Object.fromEntries(ALL.map((a) => [a.id, a]))

/** Stable display order for the catalog page. */
export const ANIM_LIST: AnimSpec[] = ALL

export type { AnimSpec }
