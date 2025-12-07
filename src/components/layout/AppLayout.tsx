import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "홈" },
  { to: "/breeds", label: "품종 찾아보기" },
  { to: "/favorites", label: "즐겨찾기" },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-ivory text-coffee">
      <header className="sticky top-0 z-20 border-b border-coffee/5 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-content-lg items-center justify-between px-4 py-3">
          <NavLink
            to="/"
            className="text-lg font-semibold tracking-tight text-forest"
          >
            CAT FAMILY
          </NavLink>
          <nav className="gap-4 flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-forest"
                      : "text-coffee/70 hover:text-coffee"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-content-lg px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-coffee/10 bg-ivory/80 py-6 text-center text-sm text-coffee/70">
        CAT FAMILY
      </footer>
    </div>
  );
}
