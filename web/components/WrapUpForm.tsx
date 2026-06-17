"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { DucKet, FormField } from "@/lib/types";

interface WrapUpFormProps {
  ducKet: DucKet;
  savedFields: Record<string, string | boolean | number>;
  onSave: (fields: Record<string, string | boolean | number>) => void;
  onComplete: () => void;
}

function WrapUpField({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string | boolean | number;
  onChange: (val: string | boolean | number) => void;
}) {
  if (field.kieu_du_lieu === "bool") {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-low p-4">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 accent-primary"
        />
        <span className="text-sm font-medium">{field.nhan}</span>
      </label>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wider text-primary">
        {field.nhan}
      </label>
      <textarea
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

export function WrapUpForm({
  ducKet,
  savedFields,
  onSave,
  onComplete,
}: WrapUpFormProps) {
  const [fields, setFields] = useState<
    Record<string, string | boolean | number>
  >(savedFields);

  const setField = (ma: string, val: string | boolean | number) => {
    setFields({ ...fields, [ma]: val });
  };

  const handleComplete = () => {
    onSave(fields);
    onComplete();
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Đúc kết & ghi nhận
        </span>
        {ducKet.huong_dan && (
          <p className="mt-2 text-base text-on-surface-variant">
            {ducKet.huong_dan}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {ducKet.dau_ra.truong.map((field) => (
          <WrapUpField
            key={field.ma}
            field={field}
            value={fields[field.ma] ?? ""}
            onChange={(val) => setField(field.ma, val)}
          />
        ))}
      </div>

      <div className="rounded-xl border border-primary-fixed bg-primary-fixed/40 p-4 text-sm text-on-surface-variant">
        <span className="material-symbols-rounded mr-1 align-middle text-primary">
          favorite
        </span>
        Mọi câu trả lời đều hợp lệ — mục tiêu là hiểu con, không chấm đúng/sai.
      </div>

      <Button fullWidth onClick={handleComplete}>
        Hoàn thành buổi học
        <span className="material-symbols-rounded filled">celebration</span>
      </Button>
    </div>
  );
}
