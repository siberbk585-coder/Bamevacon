interface PillProps {
  icon: string;
  label: string;
  color?: string;
}

export function Pill({ icon, label, color = "#FF8A3D" }: PillProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
      style={{
        backgroundColor: `${color}22`,
        color,
        border: `1px solid ${color}44`,
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
