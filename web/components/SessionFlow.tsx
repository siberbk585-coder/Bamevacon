"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActivityForm } from "@/components/ActivityForm";
import { ParentBriefing } from "@/components/ParentBriefing";
import { QuestionFlow } from "@/components/QuestionFlow";
import { WrapUpForm } from "@/components/WrapUpForm";
import { AppHeader } from "@/components/ui/AppHeader";
import { useAppState } from "@/lib/storage";
import type { BlockType, ContentPack } from "@/lib/types";

interface SessionFlowProps {
  pack: ContentPack;
}

const BLOCK_LABELS: Record<BlockType, string> = {
  doc_phu_huynh: "Trước buổi",
  cau_hoi: "Khám phá",
  hoat_dong: "Hoạt động",
  duc_ket: "Đúc kết",
};

export function SessionFlow({ pack }: SessionFlowProps) {
  const router = useRouter();
  const buoi = pack.meta.buoi;
  const blocks = pack.thu_tu_khoi;

  const {
    state,
    hydrated,
    saveQuestionResponse,
    saveActivityRecord,
    saveDucKet,
    setSessionProgress,
    completeSession,
  } = useAppState();

  const session = state.sessions[buoi];
  const [blockIndex, setBlockIndex] = useState(session?.currentBlockIndex ?? 0);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const currentBlock = blocks[blockIndex];
  const sessionBlocks = session?.blocks ?? {
    questions: {},
    activities: {},
    ducKet: {},
  };

  const goToBlock = (nextIndex: number) => {
    setBlockIndex(nextIndex);
    setSessionProgress(buoi, { currentBlockIndex: nextIndex });
  };

  const handleSessionComplete = () => {
    completeSession(buoi);
    router.push("/journey");
  };

  return (
    <div className="min-h-screen pb-8">
      <AppHeader title={`Buổi ${buoi}`} showBack backHref="/journey" />

      <main className="mx-auto max-w-md px-container-margin pt-20">
        <div className="mb-6">
          <h1 className="font-heading text-xl font-bold text-primary">
            {pack.meta.ten}
          </h1>
          <p className="text-sm text-on-surface-variant">
            Tuần {pack.meta.tuan} · {pack.meta.do_tuoi_ap_dung} tuổi
          </p>
        </div>

        <div className="mb-6 flex gap-1">
          {blocks.map((block, i) => (
            <div
              key={block}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < blockIndex
                  ? "bg-primary-container"
                  : i === blockIndex
                    ? "bg-secondary-container"
                    : "bg-surface-variant"
              }`}
              title={BLOCK_LABELS[block]}
            />
          ))}
        </div>

        <div className="mb-4 text-sm font-semibold text-secondary">
          <span>{BLOCK_LABELS[currentBlock]}</span>
          <span className="text-on-surface-variant">
            {" "}
            ({blockIndex + 1}/{blocks.length})
          </span>
        </div>

        {currentBlock === "doc_phu_huynh" && (
          <ParentBriefing
            briefing={pack.doc_phu_huynh}
            sessionTitle={pack.meta.ten}
            onContinue={() => goToBlock(blockIndex + 1)}
          />
        )}

        {currentBlock === "cau_hoi" && (
          <QuestionFlow
            pack={pack}
            questions={pack.cau_hoi}
            initialIndex={session?.currentQuestionIndex ?? 0}
            savedResponses={sessionBlocks.questions}
            onSave={(response) => saveQuestionResponse(buoi, response)}
            onComplete={() => goToBlock(blockIndex + 1)}
          />
        )}

        {currentBlock === "hoat_dong" && (
          <ActivityForm
            pack={pack}
            activities={pack.hoat_dong}
            initialIndex={session?.currentActivityIndex ?? 0}
            savedRecords={sessionBlocks.activities}
            onSave={(record) => saveActivityRecord(buoi, record)}
            onComplete={() => goToBlock(blockIndex + 1)}
          />
        )}

        {currentBlock === "duc_ket" && (
          <WrapUpForm
            ducKet={pack.duc_ket}
            savedFields={sessionBlocks.ducKet}
            onSave={(fields) => saveDucKet(buoi, fields)}
            onComplete={handleSessionComplete}
          />
        )}
      </main>
    </div>
  );
}
