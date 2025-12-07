import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { BreedProvider } from "./context/BreedContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import BreedsPage from "./pages/BreedsPage";
import BreedDetailPage from "./pages/BreedDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import LandingPage from "./pages/LandingPage";
import { Button } from "./components/ui/Button";

function App() {
  return (
    <BrowserRouter>
      <BreedProvider>
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="breeds" element={<BreedsPage />} />
              <Route path="breeds/:id" element={<BreedDetailPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </BreedProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold text-coffee">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="text-coffee/70">주소를 확인하거나 홈으로 이동해 주세요.</p>
      <Button asChild>
        <Link to="/">랜딩으로 돌아가기</Link>
      </Button>
    </div>
  );
}

export default App;
