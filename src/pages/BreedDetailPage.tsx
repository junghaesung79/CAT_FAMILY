import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSimilarBreeds, type Breed } from "../breed/breed";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { useBreedContext } from "../context/BreedContext";
import { useFavorites } from "../context/FavoritesContext";

export default function BreedDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { status, byId, breeds } = useBreedContext();
  const { isFavorite, toggleFavorite } = useFavorites();

  const breed = id ? byId[id] : undefined;
  const favorite = breed ? isFavorite(breed.id) : false;

  const primarySrc = breed ? `/breeds/${breed.id}.jpg` : undefined;
  const fallbackSrc = breed
    ? `https://placehold.co/800x480/F8F5F0/3B3129?text=${encodeURIComponent(breed.breed_en)}`
    : undefined;

  const similar = useMemo(
    () => (breed ? getSimilarBreeds(breeds, breed.id) : []),
    [breed, breeds],
  );

  const metricChips = breed ? buildMetricChips(breed) : [];

  const handleCopy = async () => {
    if (!breed) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        window.alert("링크가 복사되었습니다.");
      } else {
        window.alert("링크 복사에 실패했습니다.");
      }
    } catch {
      window.alert("링크 복사에 실패했습니다.");
    }
  };

  if (status !== "ready") {
    return (
      <div className="space-y-6">
        <Skeleton className="h-72" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!breed) {
    return (
      <div className="rounded-soft border border-dashed border-coffee/30 p-8 text-center">
        <p className="text-lg font-semibold text-coffee">
          해당 품종을 찾을 수 없습니다.
        </p>
        <p className="mt-2 text-sm text-coffee/70">
          목록에서 다시 선택해 주세요.
        </p>
        <Button asChild className="mt-6">
          <Link to="/breeds">품종 목록으로 이동</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <button
        className="text-sm text-forest underline decoration-dotted underline-offset-4"
        onClick={() => navigate(-1)}
      >
        ← 이전 화면으로 돌아가기
      </button>

      <section className="rounded-soft border border-coffee/10 bg-white/80 p-4 shadow-card sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          <div className="overflow-hidden rounded-soft border border-white/60 bg-sand">
            <img
              src={primarySrc}
              alt={`${breed.breed_kr} 대표 이미지`}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== fallbackSrc) img.src = fallbackSrc ?? "";
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-coffee/50">
                  {breed.breed_en}
                </p>
                <h1 className="text-3xl font-bold text-coffee">
                  {breed.breed_kr}
                </h1>
                {breed.aliases.length > 0 && (
                  <p className="text-sm text-coffee/70">
                    별칭: {breed.aliases.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  aria-label="즐겨찾기 토글"
                  onClick={() => toggleFavorite(breed.id)}
                >
                  {favorite ? "♥" : "♡"}
                </Button>
                <Button
                  variant="ghost"
                  aria-label="품종 정보 링크 복사"
                  onClick={handleCopy}
                >
                  링크 복사
                </Button>
              </div>
            </div>
            <p className="text-base text-coffee/80">{breed.summary}</p>
            <div className="flex flex-wrap gap-2">
              {metricChips.map((chip) => (
                <Badge
                  key={chip.label}
                  className="bg-beige/60 text-xs uppercase tracking-wide text-coffee"
                >
                  <span className="font-semibold text-coffee/80">
                    {chip.label}
                  </span>
                  <span className="ml-2 text-coffee">{chip.value}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title="개요">
          <dl className="grid gap-4 text-sm text-coffee/80">
            <div>
              <dt className="font-semibold text-coffee">출신 지역</dt>
              <dd>{breed.status.origin_region}</dd>
            </div>
            <div>
              <dt className="font-semibold text-coffee">자연 발생 품종 여부</dt>
              <dd>{breed.status.natural_breed ? "자연 발생" : "계획 교배"}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {breed.status.recognized_by.map((org) => (
              <Badge key={org}>{org}</Badge>
            ))}
          </div>
        </InfoCard>
        <InfoCard title="성격 & 적합도">
          <div className="flex flex-wrap gap-2">
            {breed.temperament.traits.map((trait) => (
              <span key={trait} className="chip text-xs">
                {trait}
              </span>
            ))}
          </div>
          <table className="mt-4 w-full text-left text-sm text-coffee/80">
            <tbody>
              <SuitabilityRow
                label="아이와"
                value={breed.temperament.suitability.with_children}
              />
              <SuitabilityRow
                label="다른 반려동물과"
                value={breed.temperament.suitability.with_pets}
              />
              <SuitabilityRow
                label="처음 반려인"
                value={breed.temperament.suitability.first_time_owner}
              />
            </tbody>
          </table>
        </InfoCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard title="건강 리스크">
          <TwoColumnList title="유전 질환" items={breed.health.genetic_risks} />
          <TwoColumnList title="기타 주의" items={breed.health.other_risks} />
          <div className="mt-4">
            <p className="text-sm font-semibold text-coffee">필수 스크리닝</p>
            <ul className="mt-2 space-y-1 text-sm text-coffee/80">
              {breed.health.screenings.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-forest">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </InfoCard>
        <InfoCard title="관리 가이드">
          <div className="space-y-4">
            <CareBlock
              title="그루밍"
              entries={formatCareEntries(breed.care.grooming)}
            />
            <CareBlock
              title="환경"
              entries={formatCareEntries(breed.care.environment)}
            />
          </div>
        </InfoCard>
      </section>

      <section className="rounded-soft border border-coffee/10 bg-sand/50 p-4 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-title">유사 품종 추천</h2>
          <span className="text-xs text-coffee/60">총 {similar.length}개</span>
        </div>
        {similar.length === 0 ? (
          <p className="text-sm text-coffee/70">
            준비된 유사 품종 정보가 없습니다.
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {similar.map(({ breed: similarBreed, reason }) => (
              <Card
                key={similarBreed.id}
                className="min-w-[220px] snap-start bg-white/80 p-4 text-sm"
                aria-label={`${similarBreed.breed_kr} 유사 이유`}
                title={reason}
              >
                <p className="text-xs uppercase tracking-widest text-coffee/60">
                  {similarBreed.breed_en}
                </p>
                <h3 className="text-lg font-semibold text-coffee">
                  {similarBreed.breed_kr}
                </h3>
                <p className="mt-2 line-clamp-3 text-coffee/70">
                  {similarBreed.summary}
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 border-coffee/20 text-xs"
                >
                  <Link to={`/breeds/${similarBreed.id}`}>자세히 보기</Link>
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-ivory/95 p-3 shadow-[0_-4px_20px_rgba(59,49,41,0.15)] md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => toggleFavorite(breed.id)}
            aria-label="모바일에서 즐겨찾기 토글"
          >
            {favorite ? "즐겨찾기 해제" : "♡ 담기"}
          </Button>
          <Button asChild variant="ghost" className="flex-1 border-coffee/20">
            <Link to="/breeds">목록 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function buildMetricChips(breed: Breed) {
  const chips: { label: string; value: string }[] = [];
  chips.push({
    label: "평균 수명",
    value: formatRange(breed.metrics.lifespan_years, "년"),
  });
  if (breed.metrics.female_weight_kg) {
    chips.push({
      label: "체중 ♀",
      value: formatRange(breed.metrics.female_weight_kg, "kg"),
    });
  }
  if (breed.metrics.male_weight_kg) {
    chips.push({
      label: "체중 ♂",
      value: formatRange(breed.metrics.male_weight_kg, "kg"),
    });
  }
  chips.push({ label: "체형", value: breed.metrics.size_class });
  if (breed.appearance.coat_length) {
    chips.push({ label: "털 길이", value: breed.appearance.coat_length });
  }
  return chips;
}

function formatRange(range?: { min: number; max: number }, unit?: string) {
  if (!range) return "정보 없음";
  return `${range.min}–${range.max}${unit ?? ""}`;
}

function formatCareEntries(
  input: Record<string, string | number | boolean | undefined> | undefined,
) {
  if (!input) return [];
  return Object.entries(input)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => {
      if (typeof value === "boolean") {
        return `${translateCareKey(key)}: ${value ? "필수" : "선택"}`;
      }
      return `${translateCareKey(key)}: ${value}`;
    });
}

function translateCareKey(key: string) {
  const map: Record<string, string> = {
    brushing_per_week: "주간 브러싱",
    seasonal_increase: "환절기 추가 케어",
    bathing_note: "목욕 노트",
    bathing_per_week: "주간 목욕",
    brushing_note: "브러싱 참고",
    skin_moisturizing: "피부 보습",
    vertical_space: "수직 공간",
    daily_play: "놀이 루틴",
    temperature_note: "실내 온도",
  };
  return map[key] ?? key;
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-white/80 p-5">
      <h2 className="section-title mb-3">{title}</h2>
      {children}
    </Card>
  );
}

function SuitabilityRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th
        scope="row"
        className="w-32 py-2 pr-4 text-coffee text-xs font-semibold"
      >
        {label}
      </th>
      <td className="py-2 text-coffee/80">{value}</td>
    </tr>
  );
}

function TwoColumnList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-2">
      <p className="text-sm font-semibold text-coffee">{title}</p>
      <ul className="mt-2 grid gap-2 text-sm text-coffee/80">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span aria-hidden className="text-terracotta">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CareBlock({ title, entries }: { title: string; entries: string[] }) {
  return (
    <div className="rounded-soft border border-coffee/10 bg-white/60 p-3">
      <p className="text-sm font-semibold text-coffee">{title}</p>
      {entries.length === 0 ? (
        <p className="mt-2 text-xs text-coffee/60">추가 지침 없음</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm text-coffee/80">
          {entries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
