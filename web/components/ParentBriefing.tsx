"use client";

import { Button } from "@/components/ui/Button";
import type { DocPhuHuynh } from "@/lib/types";

interface ParentBriefingProps {
  briefing: DocPhuHuynh;
  sessionTitle: string;
  onContinue: () => void;
}

export function ParentBriefing({
  briefing,
  sessionTitle,
  onContinue,
}: ParentBriefingProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Trước buổi · Đọc cho phụ huynh
        </span>
        <h2 className="font-heading mt-2 text-2xl font-bold text-on-surface">
          {sessionTitle}
        </h2>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-5">
        <p className="text-base leading-relaxed text-on-surface">{briefing.tom_tat}</p>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-on-surface">Lưu ý quan trọng</h3>
        <ul className="flex flex-col gap-2">
          {briefing.luu_y.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-xl bg-surface-container p-3 text-sm text-on-surface-variant"
            >
              <span className="material-symbols-rounded filled shrink-0 text-primary-container text-lg">
                tips_and_updates
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button fullWidth onClick={onContinue}>
        Đã đọc, bắt đầu buổi học
        <span className="material-symbols-rounded">arrow_forward</span>
      </Button>
    </div>
  );
}
