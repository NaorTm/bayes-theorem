import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/tutorial", label: "Tutorial" },
  { to: "/labs", label: "Visual Labs" },
  { to: "/examples", label: "Example Library" },
  { to: "/practice", label: "Practice" },
  { to: "/glossary", label: "Glossary" },
  { to: "/references", label: "References" }
];

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = window.localStorage.getItem("bayes-theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Layout() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("bayes-theme", theme);
  }, [theme]);

  const themeLabel = useMemo(() => (theme === "light" ? "Dark" : "Light"), [theme]);

  return (
    <div className="app-shell">
      <header className="top-nav" aria-label="Primary">
        <div className="brand-block">
          <p className="brand-kicker">Bayesian Learning Lab</p>
          <h1>Bayes&apos; Theorem</h1>
        </div>
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
          aria-label={`Switch to ${themeLabel} mode`}
        >
          {themeLabel} mode
        </button>
      </header>
      <main className="page-shell">
        <Outlet />
      </main>
    </div>
  );
}
