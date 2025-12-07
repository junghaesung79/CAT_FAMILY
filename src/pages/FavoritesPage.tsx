import { useEffect, useMemo, useState } from "react";
import { BreedCard } from "../components/breed/BreedCard";
import { BreedFilterDrawer } from "../components/breed/BreedFilterDrawer";
import { BreedSortBar } from "../components/breed/BreedSortBar";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { toBreedCard } from "../breed/breed";
import { useBreedContext } from "../context/BreedContext";
import { useFavorites } from "../context/FavoritesContext";
import { useBreedFilters } from "../hooks/useBreedFilters";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { filterBreedByState, sortBreeds } from "../utils/breed-listing";

const PAGE_SIZE = 12;

export default function FavoritesPage() {
  const { breeds, status } = useBreedContext();
  const { favorites, clearFavorites } = useFavorites();
  const { filters, sort, setFilters, setSort } = useBreedFilters();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, sort, favorites]);

  const favoriteBreeds = useMemo(
    () => breeds.filter((breed) => favorites.includes(breed.id)),
    [breeds, favorites],
  );

  const filtered = useMemo(
    () => favoriteBreeds.filter((breed) => filterBreedByState(breed, filters)),
    [favoriteBreeds, filters],
  );

  const sorted = useMemo(() => sortBreeds(filtered, sort), [filtered, sort]);
  const cards = useMemo(() => sorted.map(toBreedCard), [sorted]);

  const sentinelRef = useInfiniteScroll(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, cards.length));
  });

  const visibleCards = cards.slice(0, visibleCount);

  const emptyState =
    favorites.length === 0 ? (
      <div className="rounded-soft border border-dashed border-coffee/30 p-4 text-center text-coffee/70">
        아직 즐겨찾기에 담은 품종이 없습니다.
        <br />♡ 버튼으로 관심 있는 품종을 모아 보세요.
      </div>
    ) : (
      <div className="rounded-soft border border-dashed border-coffee/30 p-4 text-center text-coffee/70">
        조건에 맞는 즐겨찾기가 없습니다.
        <br />
        필터를 조정하거나 전체 제거 후 다시 담아 보세요.
      </div>
    );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-coffee/60">즐겨찾기 {favorites.length}개</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-coffee">즐겨찾기 보관함</h1>
          <Button
            variant="ghost"
            className="text-sm"
            onClick={() => clearFavorites()}
            disabled={favorites.length === 0}
          >
            전체 제거
          </Button>
        </div>
      </header>

      <BreedSortBar
        value={sort}
        onChange={setSort}
        onFilterClick={() => setDrawerOpen(true)}
      />

      {status !== "ready" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <>
          {visibleCards.length === 0 ? (
            emptyState
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCards.map((card) => (
                  <BreedCard key={card.id} card={card} />
                ))}
              </div>
              <div ref={sentinelRef} className="h-12" aria-hidden />
            </>
          )}
        </>
      )}

      <BreedFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onApply={(next) => setFilters(next)}
      />
    </div>
  );
}
