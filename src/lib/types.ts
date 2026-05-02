export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type Resource = { type: 'course' | 'docs' | 'video' | 'book' | 'tool' | 'paper'; title: string; url?: string }
export type Subtopic = { name: string; detail: string }
export type CapstoneProject = { name: string; description: string; stack: string[]; outcomes: string[] }
export type Division = { id: number; name: string; use: string; color: string; topics: number; capstone?: CapstoneProject }
export type Role = { title: string; desc: string; highlights?: string[] }
export type LiveExampleTab = { label: string; content: string }
export type LiveExample = { title: string; tabs: LiveExampleTab[] }
export type CodeTab = { label: string; language: string; code: string }
export type CodeExample = { title: string; description: string; tabs: CodeTab[] }
export type FullstackContext = { scenario: string; where: string[]; tip: string; stack: string[] }

export type Week = {
  week: number
  div: number
  topic: string
  icon: string
  difficulty: Difficulty
  effort: number
  prereqs: number[]
  intro: string
  subtopics: Subtopic[]
  hook: string
  angle: string
  keyConcepts: string[]
  resources: Resource[]
  miniProject: string
  interviewQs: string[]
  postTypes: string[]
  hashtags: string[]
  followUp: string
  roles?: Role[]
  liveExample?: LiveExample
  roi?: string
}
export type TrendingTopic = { id: string; label: string; icon: string; color: string; tagline: string; what: string; vs: string; vsDetail: string; hooks: string[]; hashtags: string; resources: string[]; postIdea: string }
export type SkillItem = { label: string; desc: string }
export type Skill = { skill: string; icon: string; color: string; colorLight: string; colorBorder: string; have: string[]; aiUse: SkillItem[]; advantage: 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM'; note: string }
export type Gap = { area: string; priority: 'CRITICAL' | 'IMPORTANT' | 'HIGH VALUE'; time: string; items: string[]; color: string }
export type PhaseItem = { name: string; tag: string; depth: string; why: string; resources: string[] }
export type PhaseSection = { title: string; items: PhaseItem[] }
export type Project = { name: string; desc: string; stack: string; impact: string }
export type Phase = { id: string; title: string; sub: string; duration: string; level: string; salary: string; color: string; note: string; sections: PhaseSection[]; projects: Project[]; roles: string[] }
export type LadderStep = { title: string; years: string; salary: string; note: string; color: string }
export type DailyTheme = { day: string; label: string; emoji: string; desc: string }
export type ContentPillar = { name: string; pct: number; desc: string; color: string }
export type HookTemplate = { pattern: string; template: string; examples: string[]; why: string }
