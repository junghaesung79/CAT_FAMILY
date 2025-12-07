import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useBreedContext } from "../../context/BreedContext";
import { hasTrait } from "../../utils/breed-utils";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const spotlightDefinitions = [
  {
    key: "active",
    title: "활동적인 친구",
    description: "하루 2회 이상 사냥 놀이가 필요한 에너지형 품종",
    predicate: (breed: Parameters<typeof hasTrait>[0]) =>
      hasTrait(breed, "active"),
  },
  {
    key: "gentle",
    title: "온화한 성향",
    description: "차분하고 가족과 조화를 이루는 품종",
    predicate: (breed: Parameters<typeof hasTrait>[0]) =>
      hasTrait(breed, "gentle"),
  },
  {
    key: "first-time",
    title: "초보 친화",
    description: "성향 설명에 처음 반려인도 적합하다고 명시된 품종",
    predicate: (breed: Parameters<typeof hasTrait>[0]) =>
      breed.temperament.suitability.first_time_owner.includes("적합"),
  },
];

export function BreedSpotlight() {
  const { breeds, status } = useBreedContext();

  const cards = useMemo(() => {
    if (!breeds.length) return [];
    return spotlightDefinitions
      .map((spotlight) => {
        const matches = breeds.filter(spotlight.predicate);
        if (!matches.length) return null;
        const pick = matches[Math.floor(Math.random() * matches.length)];
        return { ...spotlight, breed: pick };
      })
      .filter(Boolean);
  }, [breeds]);

  if (status !== "ready") {
    return (
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <Card key={key} className="h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h3 className="section-title mb-4">Spotlight</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(
          (card) =>
            card && (
              <Card key={card.key} className="flex h-full flex-col gap-3">
                <p className="text-xs uppercase tracking-wide text-coffee/60">
                  {card.title}
                </p>
                <h4 className="text-xl font-semibold text-coffee">
                  {card.breed.breed_kr}
                </h4>
                <p className="text-sm text-coffee/70">{card.description}</p>
                <p className="text-sm text-coffee/80 line-clamp-3">
                  {card.breed.summary}
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-auto border-coffee/20"
                >
                  <Link to={`/breeds/${card.breed.id}`}>자세히 보기</Link>
                </Button>
              </Card>
            ),
        )}
      </div>
    </section>
  );
}
