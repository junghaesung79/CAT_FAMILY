import { useEffect, useState } from "react";
import type { BreedFilterState } from "../../hooks/useBreedFilters";
import { Button } from "../ui/Button";

const coatOptions = ["단모", "중장모", "장모"];
const sizeOptions = ["소형", "중소형", "중형", "중대형", "대형"];
const temperamentOptions = [
  { value: "social", label: "사교적" },
  { value: "calm", label: "조용함" },
  { value: "gentle", label: "온화함" },
  { value: "intelligent", label: "지적" },
  { value: "vocal", label: "수다스러움" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: BreedFilterState;
  onApply: (next: BreedFilterState) => void;
};

export function BreedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApply,
}: Props) {
  const [local, setLocal] = useState(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  const toggleValue = (key: keyof BreedFilterState, value: string) => {
    setLocal((prev) => {
      const list = new Set(prev[key] as string[]);
      if (list.has(value)) {
        list.delete(value);
      } else {
        list.add(value);
      }
      return { ...prev, [key]: Array.from(list) };
    });
  };

  const setSeasonal = (value?: "yes" | "no") => {
    setLocal((prev) => ({ ...prev, seasonal: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end bg-coffee/30 backdrop-blur-sm md:items-center md:justify-center">
      <section className="w-full max-w-xl rounded-t-3xl bg-ivory p-6 shadow-card md:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-coffee/60">필터</p>
            <h2 className="text-2xl font-semibold text-coffee">
              나에게 맞는 품종 찾기
            </h2>
          </div>
          <button className="text-sm text-coffee/60" onClick={onClose}>
            닫기
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto pb-4">
          <FilterGroup title="털 길이">
            <ChipList
              options={coatOptions}
              selected={local.coat}
              onSelect={(value) => toggleValue("coat", value)}
            />
          </FilterGroup>

          <FilterGroup title="체형">
            <ChipList
              options={sizeOptions}
              selected={local.size}
              onSelect={(value) => toggleValue("size", value)}
            />
          </FilterGroup>

          <FilterGroup title="활동성 트리거">
            <ChipList
              options={["활동적"]}
              selected={local.activity.includes("active") ? ["활동적"] : []}
              onSelect={() => toggleValue("activity", "active")}
            />
          </FilterGroup>

          <FilterGroup title="성향">
            <div className="flex flex-wrap gap-2">
              {temperamentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`chip cursor-pointer ${
                    local.temperament.includes(option.value)
                      ? "bg-forest/10 text-forest border-forest/50"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 hidden"
                    checked={local.temperament.includes(option.value)}
                    onChange={() => toggleValue("temperament", option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="계절 털갈이">
            <div className="flex gap-3">
              <button
                className={`chip flex-1 justify-center ${
                  local.seasonal === "yes" ? "bg-forest/10 text-forest" : ""
                }`}
                onClick={() => setSeasonal("yes")}
              >
                있음
              </button>
              <button
                className={`chip flex-1 justify-center ${
                  local.seasonal === "no" ? "bg-forest/10 text-forest" : ""
                }`}
                onClick={() => setSeasonal("no")}
              >
                없음
              </button>
              <button
                className="chip flex-1 justify-center"
                onClick={() => setSeasonal(undefined)}
              >
                전체
              </button>
            </div>
          </FilterGroup>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => setLocal(filters)}
          >
            재설정
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => {
              onApply(local);
              onClose();
            }}
          >
            적용하기
          </Button>
        </div>
      </section>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-coffee/80">{title}</p>
      {children}
    </div>
  );
}

function ChipList({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            className={`chip ${active ? "bg-forest/10 text-forest border-forest/60" : ""}`}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
