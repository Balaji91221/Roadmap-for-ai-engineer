import type { ComponentType } from 'react'
import LinearRegressionLab from './LinearRegressionLab'
import GradientDescentLab from './GradientDescentLab'
import KMeansLab from './KMeansLab'
import PerceptronLab from './PerceptronLab'
import AttentionLab from './AttentionLab'

export type PlaygroundComponent = ComponentType<{ color: string }>

// Topic-keyword → playground, most specific first. Drives the most relevant hands-on lab.
const RULES: { keywords: string[]; comp: PlaygroundComponent }[] = [
  { keywords: ['attention', 'transformer', 'self-attention'], comp: AttentionLab },
  { keywords: ['perceptron', 'neural net', 'mlp', 'feedforward', 'activation', 'backprop', 'forward propagation', 'deep learning'], comp: PerceptronLab },
  { keywords: ['cluster', 'k-means', 'kmeans', 'unsupervised'], comp: KMeansLab },
  { keywords: ['gradient', 'descent', 'learning rate', 'loss function', 'optimizer', 'sgd', 'adam', 'convergence'], comp: GradientDescentLab },
  { keywords: ['regression', 'least squares', 'linear model', 'classification', 'supervised'], comp: LinearRegressionLab },
]

// Concept-animation id → playground fallback when no keyword matches.
const BY_ANIM: Record<string, PlaygroundComponent> = {
  A_transformer: AttentionLab,
  A_neuralnet: PerceptronLab,
  A_gradient: GradientDescentLab,
  A_supervised: LinearRegressionLab,
}

/** Best-fit interactive playground for the active topic text, falling back to the concept id. */
export function getPlaygroundFor(text: string, animId: string): PlaygroundComponent | null {
  const t = text.toLowerCase()
  for (const r of RULES) {
    if (r.keywords.some((k) => t.includes(k))) return r.comp
  }
  return BY_ANIM[animId] ?? null
}
