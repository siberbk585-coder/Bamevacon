"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getPillarByCode } from "@/lib/content";
import type {
  CauHoi,
  ContentPack,
  LikertScore,
  Pillar,
  QuestionResponse,
} from "@/lib/types";

interface QuestionFlowProps {
  pack: ContentPack;
  questions: CauHoi[];
  initialIndex?: number;
  savedResponses: Record<string, QuestionResponse>;
  onSave: (response: QuestionResponse) => void;
  onComplete: () => void;
}

export function QuestionFlow({
  pack,
  questions,
  initialIndex = 0,
  savedResponses,
  onSave,
  onComplete,
}: QuestionFlowProps) {
  const [index, setIndex] = useState(initialIndex);
  const question = questions[index];
  const saved = savedResponses[question.ma_cau];

  const [diem, setDiem] = useState<LikertScore | undefined>(saved?.diem);
  const [beNoiThem, setBeNoiThem] = useState(saved?.be_noi_them ?? "");
  const [tlTinhHuong, setTlTinhHuong] = useState(saved?.tl_tinh_huong ?? "");
  const [cauPhu, setCauPhu] = useState<Record<number, string>>(
    saved?.cau_phu ?? {}
  );
  const [showScenario, setShowScenario] = useState(false);

  const pillar: Pillar | undefined = getPillarByCode(pack, question.nhom);
  const likertEntries = Object.entries(question.thang_diem).sort(
    ([a], [b]) => Number(b) - Number(a)
  ) as [string, string][];

  const handleNext = () => {
    onSave({
      ma_cau: question.ma_cau,
      diem,
      be_noi_them: beNoiThem || undefined,
      tl_tinh_huong: tlTinhHuong || undefined,
      cau_phu: Object.keys(cauPhu).length > 0 ? cauPhu : undefined,
    });

    if (index < questions.length - 1) {
      const next = questions[index + 1];
      const nextSaved = savedResponses[next.ma_cau];
      setIndex(index + 1);
      setDiem(nextSaved?.diem);
      setBeNoiThem(nextSaved?.be_noi_them ?? "");
      setTlTinhHuong(nextSaved?.tl_tinh_huong ?? "");
      setCauPhu(nextSaved?.cau_phu ?? {});
      setShowScenario(false);
    } else {
      onComplete();
    }
  };

  const addChip = (chip: string) => {
    setBeNoiThem((prev) => (prev ? `${prev}, ${chip}` : chip));
  };

  return (
    <div className="flex flex-col gap-5">
      <ProgressBar
        current={index + 1}
        total={questions.length}
        label={`Câu ${index + 1}/${questions.length}`}
      />

      {pillar && (
        <Pill icon={pillar.icon} label={pillar.ten} color={pillar.mau} />
      )}

      <h2 className="font-heading text-2xl font-bold leading-snug text-on-surface">
        {question.cau_hoi_chinh}
      </h2>

      {question.vi_du_goi_y && question.vi_du_goi_y.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {question.vi_du_goi_y.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => addChip(chip)}
              className="rounded-full border border-outline-variant bg-surface-container-low px-3 py-1.5 text-sm text-on-surface-variant transition-colors hover:border-primary hover:bg-surface-container active:scale-95"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          Mức độ tự nhận (không phải đúng/sai)
        </span>
        <div className="flex flex-col gap-2">
          {likertEntries.map(([score, label]) => (
            <label
              key={score}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all active:scale-[0.99] ${
                diem === Number(score)
                  ? "border-primary bg-primary-fixed shadow-sm"
                  : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"
              }`}
            >
              <input
                type="radio"
                name={`likert-${question.ma_cau}`}
                value={score}
                checked={diem === Number(score)}
                onChange={() => setDiem(Number(score) as LikertScore)}
                className="h-5 w-5 accent-primary"
              />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-variant font-heading font-bold text-primary">
                {score}
              </span>
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-primary">
          Bé nói thêm
        </label>
        <textarea
          value={beNoiThem}
          onChange={(e) => setBeNoiThem(e.target.value)}
          rows={3}
          placeholder="Ghi nguyên văn lời bé..."
          className="rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {question.cau_hoi_tinh_huong && (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setShowScenario(!showScenario)}
            className="flex items-center gap-2 text-sm font-semibold text-secondary"
          >
            <span className="material-symbols-rounded">
              {showScenario ? "expand_less" : "expand_more"}
            </span>
            Câu hỏi tình huống
          </button>
          {showScenario && (
            <div className="rounded-xl border border-secondary-fixed bg-secondary-fixed/30 p-4">
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {question.cau_hoi_tinh_huong}
              </p>
              <textarea
                value={tlTinhHuong}
                onChange={(e) => setTlTinhHuong(e.target.value)}
                rows={4}
                placeholder="Câu trả lời tình huống..."
                className="mt-3 w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {question.cau_hoi_phu && question.cau_hoi_phu.length > 0 && (
                <div className="mt-4 flex flex-col gap-3">
                  {question.cau_hoi_phu.map((cau, i) => (
                    <div key={i}>
                      <label className="text-xs text-on-surface-variant">
                        Câu phụ {i + 1}: {cau}
                      </label>
                      <input
                        type="text"
                        value={cauPhu[i] ?? ""}
                        onChange={(e) =>
                          setCauPhu({ ...cauPhu, [i]: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Button fullWidth onClick={handleNext} disabled={diem === undefined}>
        {index < questions.length - 1 ? "Câu tiếp theo" : "Hoàn thành khám phá"}
        <span className="material-symbols-rounded">arrow_forward</span>
      </Button>
    </div>
  );
}
