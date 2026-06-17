"use client";

import Link from "next/link";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export function AppHeader({
  title = "Ba mẹ & Con",
  showBack = false,
  backHref = "/journey",
}: AppHeaderProps) {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-surface-bright px-container-margin shadow-sm">
      <div className="flex items-center gap-2">
        {showBack && (
          <Link
            href={backHref}
            className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container-high active:scale-95"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </Link>
        )}
        <div className="font-heading text-xl font-bold text-primary">{title}</div>
      </div>
      <div className="flex gap-2">
        <Link
          href="/progress"
          className="rounded-full p-2 text-primary transition-colors hover:bg-surface-container-high active:scale-95"
        >
          <span className="material-symbols-rounded">insights</span>
        </Link>
      </div>
    </header>
  );
}
