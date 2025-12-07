import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

type SortKey = 'lifespan' | 'weight' | 'activity' | 'alphabetic'

export type BreedFilterState = {
  coat: string[]
  size: string[]
  activity: string[]
  temperament: string[]
  seasonal?: 'yes' | 'no'
}

const FILTER_KEYS = ['coat', 'size', 'activity', 'temperament'] as const

export function useBreedFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo<BreedFilterState>(() => {
    const state: BreedFilterState = {
      coat: [],
      size: [],
      activity: [],
      temperament: [],
      seasonal: undefined,
    }

    FILTER_KEYS.forEach((key) => {
      const value = params.get(key)
      state[key] = value ? value.split(',').filter(Boolean) : []
    })

    const seasonal = params.get('seasonal')
    state.seasonal =
      seasonal === 'yes' || seasonal === 'no' ? (seasonal as 'yes' | 'no') : undefined

    return state
  }, [params])

  const sort = (params.get('sort') as SortKey | null) ?? 'lifespan'

  const setFilters = (next: Partial<BreedFilterState>, nextSort?: SortKey) => {
    const updated = new URLSearchParams(params)

    FILTER_KEYS.forEach((key) => {
      if (next[key]) {
        if (next[key]?.length) {
          updated.set(key, next[key]!.join(','))
        } else {
          updated.delete(key)
        }
      } else if (next[key] === undefined) {
        updated.delete(key)
      }
    })

    if (next.seasonal) {
      updated.set('seasonal', next.seasonal)
    } else if (next.seasonal === undefined) {
      updated.delete('seasonal')
    }

    if (nextSort) {
      updated.set('sort', nextSort)
    } else if (!params.get('sort')) {
      updated.set('sort', sort)
    }

    setParams(updated, { replace: true })
  }

  const setSort = (nextSort: SortKey) => {
    const updated = new URLSearchParams(params)
    updated.set('sort', nextSort)
    setParams(updated, { replace: true })
  }

  return { filters, sort, setFilters, setSort, params }
}

export type { SortKey }

