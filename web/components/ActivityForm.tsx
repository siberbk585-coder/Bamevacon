"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { getPillarByCode } from "@/lib/content";
import type {
  ActivityRecord,
  ContentPack,
  FormField,
  HoatDong,
} from "@/lib/types";

interface ActivityFormProps {
  pack: ContentPack;
  activities: HoatDong[];
  initialIndex?: number;
  savedRecords: Record<string, ActivityRecord>;
  onSave: (record: ActivityRecord) => void;
  onComplete: () => void;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string | boolean | number;
  onChange: (val: string | boolean | number) => void;
}) {
  switch (field.kieu_du_lieu) {
    case "bool":
      return (
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
          <span className="text-sm">{field.nhan}</span>
        </label>
      );
    case "date":
      return (
        <input
          type="date"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      );
    case "rating":
      return (
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`flex h-10 w-10 items-center justify-center rounded-full font-heading font-bold transition-all active:scale-95 ${
                value === n
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-variant text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      );
    case "emoji":
      return (
        <div className="flex flex-wrap gap-2">
          {["😊", "😐", "😢", "😤", "🤩", "😴", "🥳", "😌"].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => onChange(emoji)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all active:scale-95 ${
                value === emoji
                  ? "bg-primary-fixed ring-2 ring-primary"
                  : "bg-surface-container-low hover:bg-surface-container"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      );
    case "select": {
      const options =
        field.tuy_chon ??
        (field.ma.startsWith("hang_")
          ? ["Thành tựu (làm giỏi điều mình thích)", "Tự do", "Kết nối (được yêu quý)"]
          : []);
      return (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Chọn...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
    default:
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={field.nhan}
          className="w-full rounded-xl border border-outline-variant bg-surface-container-low p-3 text-sm placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      );
  }
}

export function ActivityForm({
  pack,
  activities,
  initialIndex = 0,
  savedRecords,
  onSave,
  onComplete,
}: ActivityFormProps) {
  const [index, setIndex] = useState(initialIndex);
  const activity = activities[index];
  const saved = savedRecords[activity.ma_hoat_dong];
  const entryCount = activity.dau_ra.so_ban_ghi ?? 1;
  const isMultiEntry = entryCount > 1;

  const [fields, setFields] = useState<Record<string, string | boolean | number>>(
    saved?.fields ?? {}
  );
  const [entries, setEntries] = useState<
    Record<string, string | boolean | number>[]
  >(
    saved?.entries ??
      Array.from({ length: entryCount }, () => ({}))
  );
  const [entryIndex, setEntryIndex] = useState(0);

  const pillar = activity.nhom ? getPillarByCode(pack, activity.nhom) : undefined;
  const currentFields = isMultiEntry ? entries[entryIndex] ?? {} : fields;

  const setField = (ma: string, val: string | boolean | number) => {
    if (isMultiEntry) {
      const updated = [...entries];
      updated[entryIndex] = { ...updated[entryIndex], [ma]: val };
      setEntries(updated);
    } else {
      setFields({ ...fields, [ma]: val });
    }
  };

  const handleNext = () => {
    const record: ActivityRecord = {
      ma_hoat_dong: activity.ma_hoat_dong,
      fields: isMultiEntry ? {} : fields,
      entries: isMultiEntry ? entries : undefined,
    };
    onSave(record);

    if (index < activities.length - 1) {
      const next = activities[index + 1];
      const nextSaved = savedRecords[next.ma_hoat_dong];
      setIndex(index + 1);
      setFields(nextSaved?.fields ?? {});
      setEntries(
        nextSaved?.entries ??
          Array.from({ length: next.dau_ra.so_ban_ghi ?? 1 }, () => ({}))
      );
      setEntryIndex(0);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {pillar && (
        <Pill icon={pillar.icon} label={pillar.ten} color={pillar.mau} />
      )}

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Hoạt động {index + 1}/{activities.length}
        </span>
        <h2 className="font-heading mt-1 text-2xl font-bold text-on-surface">
          {activity.ten}
        </h2>
        {activity.muc_tieu && (
          <p className="mt-2 text-sm text-on-surface-variant">{activity.muc_tieu}</p>
        )}
      </div>

      {activity.huong_dan && activity.huong_dan.length > 0 && (
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <h3 className="mb-2 text-sm font-semibold">Hướng dẫn</h3>
          <ol className="list-decimal space-y-1 pl-4 text-sm text-on-surface-variant">
            {activity.huong_dan.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {activity.vai_tro_phu_huynh && (
        <div className="flex gap-2 rounded-xl bg-secondary-fixed/40 p-3 text-sm">
          <span className="material-symbols-rounded shrink-0 text-secondary">
            family_restroom
          </span>
          <span>{activity.vai_tro_phu_huynh}</span>
        </div>
      )}

      {isMultiEntry && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: entryCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setEntryIndex(i)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                entryIndex === i
                  ? "bg-primary text-on-primary"
                  : "bg-surface-variant text-on-surface-variant"
              }`}
            >
              Ngày {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {activity.dau_ra.truong.map((field) => (
          <div key={field.ma} className="flex flex-col gap-1">
            {field.kieu_du_lieu !== "bool" && (
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                {field.nhan}
              </label>
            )}
            <FieldInput
              field={field}
              value={currentFields[field.ma] ?? ""}
              onChange={(val) => setField(field.ma, val)}
            />
          </div>
        ))}
      </div>

      <Button fullWidth onClick={handleNext}>
        {index < activities.length - 1
          ? "Hoạt động tiếp theo"
          : "Hoàn thành hoạt động"}
        <span className="material-symbols-rounded">arrow_forward</span>
      </Button>
    </div>
  );
}
