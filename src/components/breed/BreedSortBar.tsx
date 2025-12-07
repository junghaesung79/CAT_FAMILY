import type { SortKey } from "../../hooks/useBreedFilters";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "lifespan", label: "수명 순" },
  { value: "weight", label: "체중 순" },
  { value: "alphabetic", label: "알파벳 순" },
  { value: "activity", label: "활동성 순" },
];

export function BreedSortBar({
  value,
  onChange,
  onFilterClick,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
  onFilterClick: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-soft border border-coffee/10 bg-white/60 p-3">
      <label className="flex items-center gap-2 text-sm text-coffee/70">
        정렬
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as SortKey)}
          className="rounded-soft border border-coffee/20 bg-white w-[110px] py-2 text-sm focus:border-forest focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <button
        className="ml-auto rounded-soft border border-coffee/20 px-4 py-2 text-sm font-medium text-coffee hover:border-forest"
        onClick={onFilterClick}
      >
        필터 열기
      </button>
    </div>
  );
}
