interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-sm text-on-surface-variant">
          <span>{label}</span>
          <span>
            {current}/{total}
          </span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-surface-variant">
        <div
          className="h-full rounded-full bg-primary-container transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
