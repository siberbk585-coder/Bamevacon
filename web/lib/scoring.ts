import type {
  ContentPack,
  PillarCode,
  PillarScores,
  QuestionResponse,
} from "./types";

export function computePillarScores(
  pack: ContentPack,
  responses: Record<string, QuestionResponse>
): PillarScores {
  const pillars: PillarCode[] = ["A", "B", "C", "D"];
  const scores: PillarScores = { A: null, B: null, C: null, D: null };

  for (const pillar of pillars) {
    const questions = pack.cau_hoi.filter((q) => q.nhom === pillar);
    const points: number[] = [];

    for (const q of questions) {
      const response = responses[q.ma_cau];
      if (response?.diem !== undefined) {
        points.push(response.diem);
      }
    }

    if (points.length > 0) {
      const avg =
        points.reduce((sum, p) => sum + p, 0) / points.length;
      scores[pillar] = Math.round(avg * 10) / 10;
    }
  }

  return scores;
}

export function getOverallProgress(
  sessions: Record<number, { status: string }>,
  totalAvailable: number
): number {
  const done = Object.values(sessions).filter((s) => s.status === "done").length;
  return Math.round((done / totalAvailable) * 100);
}

export function formatScore(score: number | null): string {
  if (score === null) return "—";
  return score.toFixed(1);
}
