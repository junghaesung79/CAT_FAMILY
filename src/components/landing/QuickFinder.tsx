import { useNavigate } from "react-router-dom";

const presets = [
  { label: "장모 + 활동적", query: { coat: "장모", activity: "active" } },
  { label: "단모 + 초보 친화", query: { coat: "단모", temperament: "gentle" } },
  { label: "중형 + 조용함", query: { size: "중형", temperament: "calm" } },
  { label: "대형 + 사교적", query: { size: "대형", temperament: "social" } },
] satisfies { label: string; query: Record<string, string> }[];

export function QuickFinder() {
  const navigate = useNavigate();

  const handleClick = (query: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });
    navigate(`/breeds?${params.toString()}`);
  };

  return (
    <section className="mt-8 rounded-soft border border-coffee/10 bg-white/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-coffee">Quick Finder</h3>
        <p className="text-xs text-coffee/60">장/단모 · 크기 · 활동성 프리셋</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            className="chip hover:border-forest/40 hover:text-forest"
            onClick={() => handleClick(preset.query)}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </section>
  );
}
