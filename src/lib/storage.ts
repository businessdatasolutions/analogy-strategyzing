import type { Position, UserSelection } from './strategic-pairs'

const STORAGE_KEY_SELECTIONS = 'strategy-selections'
const STORAGE_KEY_WORKSHEETS = 'strategy-worksheets'
const STORAGE_KEY_USER_CONTEXT = 'strategy-user-context'

export interface Worksheet {
  pairId: string
  targetDescription: string
  positivePremises: string[]
  negativePremises: { text: string; relevance: 'low' | 'medium' | 'high' }[]
  causalTheory: string
  evaluation: string
}

// Selections
export function loadSelections(): UserSelection[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY_SELECTIONS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveSelection(pairId: string, position: Position): void {
  if (typeof window === 'undefined') return

  const selections = loadSelections()
  const existingIndex = selections.findIndex(s => s.pairId === pairId)

  const newSelection: UserSelection = {
    pairId,
    position,
    timestamp: Date.now(),
  }

  if (existingIndex >= 0) {
    selections[existingIndex] = newSelection
  } else {
    selections.push(newSelection)
  }

  localStorage.setItem(STORAGE_KEY_SELECTIONS, JSON.stringify(selections))
}

export function clearSelections(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY_SELECTIONS)
}

// Worksheets
export function loadWorksheets(): Worksheet[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY_WORKSHEETS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function loadWorksheet(pairId: string): Worksheet | null {
  const worksheets = loadWorksheets()
  return worksheets.find(w => w.pairId === pairId) || null
}

export function saveWorksheet(worksheet: Worksheet): void {
  if (typeof window === 'undefined') return

  const worksheets = loadWorksheets()
  const existingIndex = worksheets.findIndex(w => w.pairId === worksheet.pairId)

  if (existingIndex >= 0) {
    worksheets[existingIndex] = worksheet
  } else {
    worksheets.push(worksheet)
  }

  localStorage.setItem(STORAGE_KEY_WORKSHEETS, JSON.stringify(worksheets))
}

// User context (shared across all worksheets)
export function loadUserContext(): string {
  if (typeof window === 'undefined') return ''
  try {
    return localStorage.getItem(STORAGE_KEY_USER_CONTEXT) || ''
  } catch {
    return ''
  }
}

export function saveUserContext(context: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY_USER_CONTEXT, context)
}

export function clearAll(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY_SELECTIONS)
  localStorage.removeItem(STORAGE_KEY_WORKSHEETS)
  localStorage.removeItem(STORAGE_KEY_USER_CONTEXT)
}
