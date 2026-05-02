import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DIVISIONS } from '@/lib/data/divisions'

export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

export function getDivisionColor(divId: number): string {
  return DIVISIONS.find((d) => d.id === divId)?.color ?? '#7C6AF7'
}

export function getDivisionName(divId: number): string {
  return DIVISIONS.find((d) => d.id === divId)?.name ?? 'Unknown Division'
}

export function getPriorityColor(priority: string): string {
  if (priority === 'CRITICAL') return '#F97316'
  if (priority === 'IMPORTANT') return '#F59E0B'
  return '#22C55E'
}

export function getDifficultyColor(difficulty: string): { bg: string; text: string; label: string } {
  switch (difficulty) {
    case 'beginner': return { bg: '#D1FAE5', text: '#065F46', label: 'Beginner' }
    case 'intermediate': return { bg: '#DBEAFE', text: '#1E40AF', label: 'Intermediate' }
    case 'advanced': return { bg: '#FEE2E2', text: '#991B1B', label: 'Advanced' }
    case 'expert': return { bg: '#F3E8FF', text: '#6B21A8', label: 'Expert' }
    default: return { bg: '#F3F4F6', text: '#374151', label: difficulty }
  }
}
