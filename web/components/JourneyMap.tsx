"use client";

import Link from "next/link";
import { JOURNEY_WEEKS } from "@/lib/content";
import { getSessionStatus } from "@/lib/storage";
import type { AppState, SessionStatus } from "@/lib/types";

interface JourneyMapProps {
  state: AppState;
}

function NodeIcon({ status }: { status: SessionStatus }) {
  if (status === "done") {
    return (
      <span className="material-symbols-rounded filled text-2xl">check_circle</span>
    );
  }
  if (status === "active") {
    return (
      <span className="material-symbols-rounded filled text-3xl">play_arrow</span>
    );
  }
  return <span className="material-symbols-rounded filled">lock</span>;
}

export function JourneyMap({ state }: JourneyMapProps) {
  const weeks = JOURNEY_WEEKS;

  return (
    <div className="relative flex flex-col items-center gap-y-10 py-8">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      >
        <path
          d="M 50% 40 Q 75% 120 50% 200 T 50% 360 T 50% 520 T 50% 680 T 50% 840"
          fill="none"
          stroke="#f3ded5"
          strokeDasharray="12 12"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>

      {weeks.map((week, index) => {
        const status = getSessionStatus(state, week.buoi, week.hasContent);
        const offset = index % 2 === 0 ? "translate-x-8" : "-translate-x-8";
        const isClickable = week.hasContent && status !== "locked";

        const nodeClasses =
          status === "done"
            ? "bg-primary-container text-on-primary-container w-16 h-16"
            : status === "active"
              ? "bg-secondary-container text-on-secondary-container w-20 h-20 animate-pulse shadow-lg"
              : "bg-surface-variant text-on-surface-variant w-16 h-16 opacity-60";

        const content = (
          <div className={`node relative z-10 flex flex-col items-center ${offset}`}>
            <div
              className={`relative flex items-center justify-center rounded-full border-4 border-surface-bright shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${nodeClasses}`}
            >
              <NodeIcon status={status} />
              {status === "active" && (
                <div className="absolute -inset-2 animate-ping rounded-full border-2 border-secondary-container opacity-20" />
              )}
            </div>
            <div
              className={`mt-2 rounded-full px-4 py-2 text-center shadow-sm ${
                status === "active"
                  ? "border-2 border-secondary-container bg-surface-container-lowest shadow-md"
                  : "bg-surface-container-lowest"
              } ${status === "done" ? "opacity-80" : ""}`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
                Buổi {week.buoi} · Tuần {week.tuan}
                {!week.hasContent && " · Sắp ra mắt"}
              </div>
              <div
                className={`text-sm ${status === "done" ? "line-through" : ""} ${
                  status === "active" ? "font-semibold" : ""
                }`}
              >
                {week.title}
              </div>
            </div>
          </div>
        );

        if (isClickable) {
          return (
            <Link
              key={week.buoi}
              href={`/session/${week.buoi}`}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              {content}
            </Link>
          );
        }

        return <div key={week.buoi}>{content}</div>;
      })}
    </div>
  );
}
