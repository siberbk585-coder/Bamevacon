"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { JourneyMap } from "@/components/JourneyMap";
import { AppHeader } from "@/components/ui/AppHeader";
import { BottomNav } from "@/components/ui/BottomNav";
import { useAppState } from "@/lib/storage";

export default function JourneyPage() {
  const router = useRouter();
  const { state, hydrated } = useAppState();

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

  return (
    <div className="min-h-screen pb-24">
      <AppHeader />

      <main className="mx-auto max-w-md px-container-margin pt-20">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-primary">
            Hành trình của {state.profile?.name ?? "bé"}
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Tiếp tục cuộc phiêu lưu cùng nhau nhé!
          </p>
        </div>

        <JourneyMap state={state} />
      </main>

      <BottomNav />
    </div>
  );
}
