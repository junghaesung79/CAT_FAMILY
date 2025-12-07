import { useEffect, useMemo, useState } from "react";
import { BreedCard } from "../components/breed/BreedCard";
import { BreedFilterDrawer } from "../components/breed/BreedFilterDrawer";
import { BreedSortBar } from "../components/breed/BreedSortBar";
import { useBreedContext } from "../context/BreedContext";
import { useBreedFilters } from "../hooks/useBreedFilters";
import { toBreedCard } from "../breed/breed";
import { Skeleton } from "../components/ui/Skeleton";
import { filterBreedByState, sortBreeds } from "../utils/breed-listing";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const PAGE_SIZE = 12;

export default function BreedsPage() {
  const { breeds, status } = useBreedContext();
  const { filters, sort, setFilters, setSort } = useBreedFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, sort]);

  const filtered = useMemo(
    () => breeds.filter((breed) => filterBreedByState(breed, filters)),
    [breeds, filters],
  );

  const sorted = useMemo(() => sortBreeds(filtered, sort), [filtered, sort]);

  const cards = useMemo(() => sorted.map(toBreedCard), [sorted]);

  const sentinelRef = useInfiniteScroll(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, cards.length));
  });

  const visibleCards = cards.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-coffee/60">총 {filtered.length}개 품종</p>
        <h1 className="text-3xl font-bold text-coffee">품종 라이브러리</h1>
        <p className="text-base text-coffee/70">
          필터 · 정렬을 조합해 수명, 침착함, 활동성과 같은 조건에 맞는 고양이를
          찾아보세요.
        </p>
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCards.map((card) => (
              <BreedCard key={card.id} card={card} />
            ))}
          </div>
          <div ref={sentinelRef} className="h-12" />
          {visibleCards.length === 0 && (
            <div className="rounded-soft border border-dashed border-coffee/20 p-6 text-center text-coffee/70">
              조건에 맞는 품종이 없습니다. 필터를 완화해 보세요.
            </div>
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
