"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PillarChart } from "@/components/PillarChart";
import { AppHeader } from "@/components/ui/AppHeader";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/Button";
import { getAvailableSessions } from "@/lib/content";
import { getOverallProgress } from "@/lib/scoring";
import { useAppState } from "@/lib/storage";

export default function ProgressPage() {
  const router = useRouter();
  const { state, hydrated, resetApp } = useAppState();

  useEffect(() => {
    if (hydrated && !state.profile) {
      router.replace("/onboarding");
    }
  }, [hydrated, state.profile, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const totalAvailable = getAvailableSessions().length;
  const progress = getOverallProgress(state.sessions, totalAvailable);
  const doneCount = Object.values(state.sessions).filter(
    (s) => s.status === "done"
  ).length;

  return (
    <div className="min-h-screen pb-24">
      <AppHeader title="Tiến trình" />

      <main className="mx-auto max-w-md px-container-margin pt-20">
        <div className="mb-6 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-on-surface-variant">Hồ sơ</p>
              <p className="font-heading text-xl font-bold text-primary">
                {state.profile?.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-on-surface-variant">Hoàn thành</p>
              <p className="font-heading text-xl font-bold text-secondary-container">
                {doneCount}/{totalAvailable}
              </p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-variant">
            <div
              className="h-full rounded-full bg-secondary-container transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-on-surface-variant">
            {progress}% hành trình 12 tuần
          </p>
        </div>

        <PillarChart state={state} />

        <div className="mt-8">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              if (
                confirm(
                  "Xóa toàn bộ dữ liệu và bắt đầu lại? Hành động này không thể hoàn tác."
                )
              ) {
                resetApp();
                router.push("/onboarding");
              }
            }}
          >
            Bắt đầu lại
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
