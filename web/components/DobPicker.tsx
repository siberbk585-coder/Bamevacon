"use client";

const MONTHS = [
  { value: "1", label: "Tháng 1" },
  { value: "2", label: "Tháng 2" },
  { value: "3", label: "Tháng 3" },
  { value: "4", label: "Tháng 4" },
  { value: "5", label: "Tháng 5" },
  { value: "6", label: "Tháng 6" },
  { value: "7", label: "Tháng 7" },
  { value: "8", label: "Tháng 8" },
  { value: "9", label: "Tháng 9" },
  { value: "10", label: "Tháng 10" },
  { value: "11", label: "Tháng 11" },
  { value: "12", label: "Tháng 12" },
];

function getYearRange() {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 16;
  const maxYear = currentYear - 10;
  const years: number[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }
  return years;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function dobPartsToIso(day: string, month: string, year: string): string {
  if (!day || !month || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function isoToDobParts(iso: string): {
  day: string;
  month: string;
  year: string;
} {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return { day: "", month: "", year: "" };
  return {
    year: match[1],
    month: String(Number(match[2])),
    day: String(Number(match[3])),
  };
}

interface DobPickerProps {
  day: string;
  month: string;
  year: string;
  onChange: (parts: { day: string; month: string; year: string }) => void;
}

const selectClass =
  "h-12 w-full appearance-none rounded-xl border border-outline-variant bg-surface-container-low px-3 text-sm shadow-sm transition-shadow hover:border-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function DobPicker({ day, month, year, onChange }: DobPickerProps) {
  const years = getYearRange();
  const yearNum = year ? Number(year) : new Date().getFullYear() - 13;
  const monthNum = month ? Number(month) : 1;
  const maxDay = month && year ? daysInMonth(yearNum, monthNum) : 31;

  const handleDay = (nextDay: string) => {
    onChange({ day: nextDay, month, year });
  };

  const handleMonth = (nextMonth: string) => {
    let nextDay = day;
    if (day && year && nextMonth) {
      const max = daysInMonth(Number(year), Number(nextMonth));
      if (Number(day) > max) nextDay = String(max);
    }
    onChange({ day: nextDay, month: nextMonth, year });
  };

  const handleYear = (nextYear: string) => {
    let nextDay = day;
    if (day && month && nextYear) {
      const max = daysInMonth(Number(nextYear), Number(month));
      if (Number(day) > max) nextDay = String(max);
    }
    onChange({ day: nextDay, month, year: nextYear });
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="child-dob-day" className="pl-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          Ngày
        </label>
        <select
          id="child-dob-day"
          value={day}
          onChange={(e) => handleDay(e.target.value)}
          className={selectClass}
        >
          <option value="">—</option>
          {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
            <option key={d} value={String(d)}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="child-dob-month" className="pl-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          Tháng
        </label>
        <select
          id="child-dob-month"
          value={month}
          onChange={(e) => handleMonth(e.target.value)}
          className={selectClass}
        >
          <option value="">—</option>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="child-dob-year" className="pl-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          Năm
        </label>
        <select
          id="child-dob-year"
          value={year}
          onChange={(e) => handleYear(e.target.value)}
          className={selectClass}
        >
          <option value="">—</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
