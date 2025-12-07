import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FavoritesValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
};

const STORAGE_KEY = "cat-family:favorites";

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore write errors
    }
  }, [favorites]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const value: FavoritesValue = {
    favorites,
    isFavorite: (id) => favoriteSet.has(id),
    toggleFavorite: (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    },
    clearFavorites: () => setFavorites([]),
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("FavoritesContext가 초기화되지 않았습니다.");
  }
  return ctx;
}
