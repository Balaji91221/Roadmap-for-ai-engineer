'use client'

import { useState } from 'react'

export function useFilter(initial = 'all') {
  return useState(initial)
}
