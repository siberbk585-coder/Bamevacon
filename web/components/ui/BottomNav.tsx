"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/journey", icon: "map", label: "Hành trình" },
  { href: "/progress", icon: "insights", label: "Tiến trình" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-xl border-t border-outline-variant bg-surface-container-lowest shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <ul className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex h-12 w-16 flex-col items-center justify-center transition-transform active:scale-90 ${
                  active
                    ? "text-secondary-container"
                    : "text-on-surface-variant hover:opacity-80"
                }`}
              >
                <span
                  className={`material-symbols-rounded ${active ? "filled" : ""}`}
                >
                  {item.icon}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
