"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DobPicker, dobPartsToIso } from "@/components/DobPicker";
import { Button } from "@/components/ui/Button";
import { childProfileSchema } from "@/lib/schema";
import { useAppState } from "@/lib/storage";

export function OnboardingForm() {
  const router = useRouter();
  const { saveProfile, hydrated } = useAppState();
  const [name, setName] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [gender, setGender] = useState<"boy" | "girl" | "">("");
  const [error, setError] = useState("");

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dob = dobPartsToIso(dobDay, dobMonth, dobYear);
    const result = childProfileSchema.safeParse({ name, dob, gender });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Vui lòng điền đầy đủ thông tin");
      return;
    }
    saveProfile(result.data);
    router.push("/journey");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-container-margin">
      <div className="relative w-full max-w-md overflow-hidden rounded-[20px] border border-surface-container-high bg-surface-container-lowest p-card-padding shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-bl-full bg-primary-container opacity-20" />

        <div className="flex flex-col items-center pt-2">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-surface-container">
            <span className="text-6xl">🌟</span>
          </div>
          <div className="mt-2 text-center">
            <h1 className="font-heading text-3xl font-bold text-primary">
              Hồ sơ của bé
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              Hãy cho chúng tôi biết một chút về người bạn nhỏ nhé.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="child-name"
              className="pl-1 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Tên của bé
            </label>
            <div className="relative">
              <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                face
              </span>
              <input
                id="child-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên gọi ở nhà hoặc tên thật"
                className="h-12 w-full rounded-xl border border-outline-variant bg-surface-container-low pl-11 pr-4 text-sm shadow-sm transition-shadow placeholder:text-outline hover:border-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <fieldset className="flex flex-col gap-1">
            <legend className="pl-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Ngày sinh
            </legend>
            <p className="pl-1 text-xs text-on-surface-variant">
              Bé từ 10–16 tuổi
            </p>
            <DobPicker
              day={dobDay}
              month={dobMonth}
              year={dobYear}
              onChange={({ day, month, year }) => {
                setDobDay(day);
                setDobMonth(month);
                setDobYear(year);
              }}
            />
          </fieldset>

          <div className="flex flex-col gap-1">
            <span className="pl-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Giới tính
            </span>
            <div className="flex gap-2">
              {(
                [
                  { value: "boy" as const, icon: "boy", label: "Bé trai" },
                  { value: "girl" as const, icon: "girl", label: "Bé gái" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGender(opt.value)}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full border font-heading text-base font-semibold transition-all active:scale-95 ${
                    gender === opt.value
                      ? "border-primary bg-primary-container text-on-primary-container"
                      : "border-outline-variant bg-surface-container-low text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  <span className="material-symbols-rounded text-xl">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-error">{error}</p>
          )}

          <Button type="submit" fullWidth className="mt-2">
            Bắt đầu hành trình
            <span className="material-symbols-rounded text-xl">arrow_forward</span>
          </Button>
        </form>
      </div>
    </main>
  );
}
