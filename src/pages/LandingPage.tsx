import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { QuickFinder } from "../components/landing/QuickFinder";
import { BreedSpotlight } from "../components/landing/BreedSpotlight";
import { useBreedContext } from "../context/BreedContext";

export default function LandingPage() {
  const { breeds } = useBreedContext();

  return (
    <div className="space-y-10">
      <section className="rounded-soft border border-coffee/10 bg-gradient-to-br from-sand via-ivory to-beige p-8 shadow-card">
        <p className="text-sm uppercase tracking-widest text-coffee/60">
          Cat Breed Archive
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-coffee sm:text-4xl">
          세상 모든 고양이
        </h1>
        <p className="mt-4 max-w-2xl text-base text-coffee/80">
          대표 품종의 기원, 성격, 건강 리스크, 케어 팁을 탐색해보세요!
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/breeds">품종 찾아보기</Link>
          </Button>
        </div>
        <dl className="mt-8 grid gap-4 text-sm text-coffee/70 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wide text-coffee/50">
              데이터 수
            </dt>
            <dd className="text-2xl font-semibold text-coffee">
              {breeds.length}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-coffee/50">
              관련 고양이협회
            </dt>
            <dd className="text-lg font-semibold text-coffee">
              TICA · CFA · FIFe · WCF
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-coffee/50">
              주요 기능
            </dt>
            <dd>탐색, 추천, 필터/정렬, 즐겨찾기</dd>
          </div>
        </dl>
      </section>

      <QuickFinder />
      <BreedSpotlight />
    </div>
  );
}
