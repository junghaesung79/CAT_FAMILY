import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Breed, BreedCard } from "../breed/breed";
import { breedById, toBreedCard } from "../breed/breed";
import { fetchBreeds } from "../data/breed-source";

type BreedContextValue = {
  status: "idle" | "loading" | "ready" | "error";
  breeds: Breed[];
  cards: BreedCard[];
  byId: Record<string, Breed>;
  error?: string;
  refresh: () => Promise<void>;
};

const BreedContext = createContext<BreedContextValue | null>(null);

export function BreedProvider({ children }: { children: ReactNode }) {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [status, setStatus] = useState<BreedContextValue["status"]>("idle");
  const [error, setError] = useState<string>();

  const loadBreeds = useCallback(async () => {
    try {
      setStatus("loading");
      setError(undefined);
      const data = await fetchBreeds();
      setBreeds(data);
      setStatus("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류입니다.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadBreeds();
  }, [loadBreeds]);

  const cards = useMemo(() => breeds.map(toBreedCard), [breeds]);
  const byId = useMemo(() => breedById(breeds), [breeds]);

  const value: BreedContextValue = {
    status,
    breeds,
    cards,
    byId,
    error,
    refresh: loadBreeds,
  };

  return (
    <BreedContext.Provider value={value}>{children}</BreedContext.Provider>
  );
}

export function useBreedContext() {
  const ctx = useContext(BreedContext);
  if (!ctx) {
    throw new Error("BreedContext가 초기화되지 않았습니다.");
  }
  return ctx;
}
