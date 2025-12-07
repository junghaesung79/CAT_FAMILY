import type { Breed } from '../breed/breed'

const breedDataUrl = new URL('../breed/breed.json', import.meta.url)

export async function fetchBreeds(): Promise<Breed[]> {
  const response = await fetch(breedDataUrl.href)
  if (!response.ok) {
    throw new Error('품종 데이터를 불러오지 못했습니다.')
  }
  return response.json()
}

