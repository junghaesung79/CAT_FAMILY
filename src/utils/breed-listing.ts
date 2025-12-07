import type { Breed } from '../breed/breed'
import type { BreedFilterState, SortKey } from '../hooks/useBreedFilters'
import {
  getActivityScore,
  getAverageLifespan,
  getAverageWeight,
  matchesFilter,
} from './breed-utils'

export function filterBreedByState(breed: Breed, filters: BreedFilterState) {
  if (
    filters.coat.length &&
    (!breed.appearance.coat_length || !filters.coat.includes(breed.appearance.coat_length))
  ) {
    return false
  }

  if (filters.size.length && !filters.size.includes(breed.metrics.size_class)) {
    return false
  }

  if (filters.activity.includes('active') && !matchesFilter(breed, 'activity', 'active')) {
    return false
  }

  if (filters.temperament.length) {
    const matchesAllTemperaments = filters.temperament.every((code) =>
      matchesFilter(breed, 'temperament', code),
    )
    if (!matchesAllTemperaments) return false
  }

  if (filters.seasonal === 'yes' && !breed.appearance.seasonal_shedding) return false
  if (filters.seasonal === 'no' && breed.appearance.seasonal_shedding) return false

  return true
}

export function sortBreeds(list: Breed[], sort: SortKey) {
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'lifespan':
        return getAverageLifespan(b) - getAverageLifespan(a)
      case 'weight':
        return getAverageWeight(b) - getAverageWeight(a)
      case 'activity':
        return getActivityScore(b) - getActivityScore(a)
      case 'alphabetic':
      default:
        return a.breed_en.localeCompare(b.breed_en, 'en')
    }
  })
}

