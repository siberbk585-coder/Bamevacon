"use client";

import { JOURNEY_WEEKS } from "@/lib/content";
import { formatScore } from "@/lib/scoring";
import type { AppState, PillarScores } from "@/lib/types";

interface PillarChartProps {
  state: AppState;
}

function BarChart({ scores, label }: { scores: PillarScores; label: string }) {
  const pillars = [
    { code: "A" as const, icon: "🌈", color: "#FF8A3D", name: "Sở thích" },
    { code: "B" as const, icon: "📚", color: "#4D8DFF", name: "Học tập" },
    { code: "C" as const, icon: "❤️", color: "#FF5C8A", name: "Cảm xúc" },
    { code: "D" as const, icon: "🚀", color: "#9B6DFF", name: "Tương lai" },
  ];

  return (
    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
      <h3 className="mb-4 font-heading text-lg font-bold text-on-surface">
        {label}
      </h3>
      <div className="flex flex-col gap-3">
        {pillars.map((p) => {
          const score = scores[p.code];
          const pct = score !== null ? (score / 5) * 100 : 0;
          return (
            <div key={p.code}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>
                  {p.icon} {p.name}
                </span>
                <span className="font-semibold" style={{ color: p.color }}>
                  {formatScore(score)}/5
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-surface-variant">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: p.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-on-surface-variant">
        Điểm phản ánh mức độ tự nhận thức, không phải xếp hạng tốt/xấu.
      </p>
    </div>
  );
}

export function PillarChart({ state }: PillarChartProps) {
  const completedSessions = JOURNEY_WEEKS.filter(
    (w) => w.hasContent && state.sessions[w.buoi]?.status === "done"
  );

  if (completedSessions.length === 0) {
    return (
      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-8 text-center">
        <span className="text-4xl">📊</span>
        <p className="mt-3 font-heading text-lg font-bold text-on-surface">
          Chưa có dữ liệu tiến trình
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">
          Hoàn thành ít nhất một buổi học để xem biểu đồ 4 trụ.
        </p>
      </div>
    );
  }

  const latest = completedSessions[completedSessions.length - 1];
  const latestScores = state.sessions[latest.buoi]?.pillarScores;
  const baselineScores = state.sessions[1]?.pillarScores;

  return (
    <div className="flex flex-col gap-6">
      {latestScores && (
        <BarChart
          scores={latestScores}
          label={`Buổi ${latest.buoi} — ${latest.title}`}
        />
      )}

      {baselineScores && latest.buoi !== 1 && (
        <BarChart scores={baselineScores} label="Baseline — Buổi 1" />
      )}

      <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
        <h3 className="mb-3 font-heading text-lg font-bold">Buổi đã hoàn thành</h3>
        <div className="flex flex-wrap gap-2">
          {completedSessions.map((w) => (
            <span
              key={w.buoi}
              className="rounded-full bg-primary-fixed px-3 py-1 text-sm font-semibold text-on-primary-fixed"
            >
              Buổi {w.buoi}: {w.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
