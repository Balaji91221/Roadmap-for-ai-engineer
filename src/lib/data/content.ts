import { ContentPillar, DailyTheme, HookTemplate } from '@/lib/types'

export const DAILY_THEMES: DailyTheme[] = [
  { day: 'Monday', label: 'Build in Public', emoji: '🛠️', desc: 'Share what you shipped and what changed.' },
  { day: 'Tuesday', label: 'Concept Deep Dive', emoji: '🧠', desc: 'Teach one topic with practical context.' },
  { day: 'Wednesday', label: 'Tool Breakdown', emoji: '🔧', desc: 'Review one tool feature with tradeoffs.' },
  { day: 'Thursday', label: 'System Design', emoji: '🏗️', desc: 'Explain architecture and decisions.' },
  { day: 'Friday', label: 'Career Signal', emoji: '🚀', desc: 'Post growth and salary positioning insights.' },
  { day: 'Saturday', label: 'Quickfire', emoji: '⚡', desc: 'Short tactical ideas and templates.' },
  { day: 'Sunday', label: 'Reflection', emoji: '📓', desc: 'Summarize lessons and next sprint plan.' },
]

export const PILLARS: ContentPillar[] = [
  { name: 'Technical Explainers', pct: 30, desc: 'High-signal implementation content.', color: '#7C6AF7' },
  { name: 'Build Logs', pct: 20, desc: 'In-public systems progress posts.', color: '#2DD4BF' },
  { name: 'Career Strategy', pct: 15, desc: 'Role ladder and salary positioning.', color: '#F59E0B' },
  { name: 'Tooling & Workflow', pct: 20, desc: 'IDEs, protocols, and productivity systems.', color: '#EC4899' },
  { name: 'Trends & POV', pct: 15, desc: 'Opinionated takes on market direction.', color: '#22C55E' },
]

export const HOOKS: HookTemplate[] = [
  { pattern: 'Contrarian', template: 'Most people think [x]. In practice, [y].', examples: ['Most teams optimize prompts first. You should optimize evals first.', 'Most people blame models. Retrieval design is often the issue.'], why: 'Strong pattern interrupt and curiosity.' },
  { pattern: 'Experiment', template: 'I tested [method] for [time]. Here are the results.', examples: ['I tested spec-first prompting for 14 days.', 'I replaced one manual step with an agent loop.'], why: 'Data-backed storytelling performs well.' },
  { pattern: 'Breakdown', template: '[Topic] explained in [n] practical layers.', examples: ['RAG in 4 layers.', 'Agent reliability in 3 loops.'], why: 'Structure boosts retention.' },
  { pattern: 'Mistake', template: 'I made [mistake]. It cost [impact]. Here is the fix.', examples: ['I skipped evals and shipped regressions.', 'I overused one model tier and doubled cost.'], why: 'Vulnerability plus specificity drives saves.' },
  { pattern: 'Comparison', template: '[A] vs [B] for [use case]. Winner: [result].', examples: ['RAG vs fine-tuning for policy QA.', 'Single-agent vs multi-agent for research.'], why: 'Decision framing increases shares.' },
  { pattern: 'Framework', template: 'Use this [N-step] framework to [outcome].', examples: ['Use this 5-step framework to ship agents.', 'Use this 4-step eval loop weekly.'], why: 'Actionability increases adoption.' },
  { pattern: 'Future Signal', template: '[Trend] will reshape [domain] sooner than expected.', examples: ['MCP will reshape internal tool ecosystems.', 'A2A will reshape automation teams.'], why: 'Strategic content attracts senior audience.' },
  { pattern: 'Micro Tutorial', template: 'Steal this: [specific tactic] for [specific result].', examples: ['Steal this prompt contract for safer tool calls.', 'Steal this trace checklist for debugging.'], why: 'Quick value improves completion rate.' },
]

export const QUICKFIRE: string[] = [
  '5 signs your RAG stack is under-indexed', 'Why your agent needs explicit stop conditions', 'One prompt refactor that improved factuality', 'How to score output quality quickly', 'Why evals beat vibes in production', '3 schema mistakes in function calling', 'When reranking is mandatory', 'Cheap wins to lower token spend', 'What to log for every model request', 'A practical guardrail checklist', 'Minimum viable memory architecture', 'How to choose between major LLMs', 'A rollout plan for new AI features', 'How to write tighter system prompts', 'What teams miss in tool orchestration', 'My weekly AI learning sprint template', 'Why long context still needs structure', 'Demo quality vs production quality', 'Fallback model tier strategy', 'Simple A/B design for prompt testing', 'What makes a good handoff payload', 'How to write acceptance tests for agents', 'A useful AI PR review checklist', 'Web dev to ML roadmap in one chart', 'Weekly AI progress scorecard', 'How to reduce citation hallucinations', 'Better format for technical posts', 'My 30-minute daily AI routine', 'What to automate first', 'How to explain MCP to non-AI teams'
]
