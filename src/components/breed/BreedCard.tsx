import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import type { BreedCard as BreedCardModel } from "../../breed/breed";
import { useFavorites } from "../../context/FavoritesContext";

type Props = {
  card: BreedCardModel;
};

export function BreedCard({ card }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(card.id);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-coffee/60">
            {card.name_en}
          </p>
          <h3 className="text-xl font-semibold text-coffee">{card.name_kr}</h3>
        </div>
        <button
          aria-label="즐겨찾기 토글"
          onClick={() => toggleFavorite(card.id)}
          className={`text-2xl transition-colors ${
            favorite
              ? "text-terracotta"
              : "text-coffee/30 hover:text-terracotta"
          }`}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <p className="line-clamp-2 text-sm text-coffee/80">{card.summary}</p>
      <div className="flex flex-wrap gap-2">
        {card.badges.map((badge) => (
          <Badge key={badge}>{badge}</Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2">
        <Button asChild variant="ghost" className="flex-1 border-coffee/20">
          <Link to={`/breeds/${card.id}`}>자세히 보기</Link>
        </Button>
      </div>
    </Card>
  );
}
