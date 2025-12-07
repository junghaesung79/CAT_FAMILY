export type WeightRange = {
  min: number;
  max: number;
};

export type RangeYears = {
  min: number;
  max: number;
};

export type Grooming =
  | {
        brushing_per_week?: number;
        seasonal_increase?: boolean;
        daily_face_cleaning?: boolean;
        bathing_note?: string;
        brushing_note?: string;
        skin_moisturizing?: boolean;
        bathing_per_week?: number;
    }
  | Record<string, never>;

export type EnvironmentCare = {
  vertical_space?: string;
  daily_play?: string;
  temperature_note?: string;
};

export type Care = {
  grooming?: Grooming;
  environment?: EnvironmentCare;
};

export type Health = {
  genetic_risks: string[];
  other_risks: string[];
  screenings: string[];
};

export type Appearance = {
  coat_length?: string;
  coat_structure?: string;
  seasonal_shedding?: boolean;
  head_shape?: string;
  signature_features?: string[];
};

export type Temperament = {
  traits: string[];
  suitability: {
      with_children: string;
      with_pets: string;
      first_time_owner: string;
  };
};

export type Metrics = {
  size_class: string;
  male_weight_kg?: WeightRange;
  female_weight_kg?: WeightRange;
  maturity_age_years?: RangeYears;
  lifespan_years: RangeYears;
};

export type Status = {
  recognized_by: string[];
  origin_region: string;
  natural_breed: boolean;
};

export type SimilarBreed = {
  id: string;
  reason: string;
};

export type Breed = {
  id: string;
  species: "Cat";
  breed_kr: string;
  breed_en: string;
  aliases: string[];
  summary: string;
  status: Status;
  appearance: Appearance;
  metrics: Metrics;
  health: Health;
  care: Care;
  temperament: Temperament;
  similar_breeds: SimilarBreed[];
};

export function breedById(breeds: Breed[]): Record<string, Breed> {
  return Object.fromEntries(breeds.map(b => [b.id, b]));
}

export function getSimilarBreeds(
  breeds: Breed[],
  id: string
): { breed: Breed; reason: string }[] {
  const byId = breedById(breeds);
  const b = byId[id];
  if (!b) return [];
  return b.similar_breeds
    .map((s) => {
      const match = byId[s.id];
      return match ? { breed: match, reason: s.reason } : undefined;
    })
    .filter((x): x is { breed: Breed; reason: string } => Boolean(x));
}

export type BreedCard = {
  id: string;
  name_kr: string;
  name_en: string;
  size: string;
  coat: string | undefined;
  summary: string;
  badges: string[];
};

export function toBreedCard(b: Breed): BreedCard {
  const badges: string[] = [];
  if (b.appearance.coat_length) badges.push(b.appearance.coat_length);
  if (b.metrics.size_class) badges.push(b.metrics.size_class);
  const activityHint = b.temperament.traits.find(t => t.includes("활동"));
  if (activityHint) badges.push("활동적");
  return {
      id: b.id,
      name_kr: b.breed_kr,
      name_en: b.breed_en,
      size: b.metrics.size_class,
      coat: b.appearance.coat_length,
      summary: b.summary,
      badges
  };
}
