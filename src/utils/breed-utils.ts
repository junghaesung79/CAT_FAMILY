import type { Breed } from '../breed/breed'

const TRAIT_KEYWORDS: Record<string, string[]> = {
  social: ['사교', '친화'],
  calm: ['차분', '조용'],
  gentle: ['온화'],
  intelligent: ['지적', '영리'],
  vocal: ['발성', '울음'],
  active: ['활동'],
}

export function hasTrait(breed: Breed, key: keyof typeof TRAIT_KEYWORDS) {
  return breed.temperament.traits.some((trait) =>
    TRAIT_KEYWORDS[key].some((keyword) => trait.includes(keyword)),
  )
}

export function getActivityScore(breed: Breed) {
  return breed.temperament.traits.filter((trait) => trait.includes('활동')).length
}

export function getAverageLifespan(breed: Breed) {
  const { min, max } = breed.metrics.lifespan_years
  return (min + max) / 2
}

export function getAverageWeight(breed: Breed) {
  const male = breed.metrics.male_weight_kg
  const female = breed.metrics.female_weight_kg
  const maleAvg = male ? (male.min + male.max) / 2 : 0
  const femaleAvg = female ? (female.min + female.max) / 2 : 0
  if (male && female) return (maleAvg + femaleAvg) / 2
  return maleAvg || femaleAvg
}

export function matchesFilter(
  breed: Breed,
  filterKey: 'coat' | 'size' | 'activity' | 'temperament',
  value: string,
) {
  switch (filterKey) {
    case 'coat':
      return breed.appearance.coat_length === value
    case 'size':
      return breed.metrics.size_class === value
    case 'activity':
      return value === 'active' ? hasTrait(breed, 'active') : false
    case 'temperament': {
      if (value === 'social') return hasTrait(breed, 'social')
      if (value === 'calm') return hasTrait(breed, 'calm')
      if (value === 'gentle') return hasTrait(breed, 'gentle')
      if (value === 'intelligent') return hasTrait(breed, 'intelligent')
      if (value === 'vocal') return hasTrait(breed, 'vocal')
      return false
    }
    default:
      return false
  }
}

