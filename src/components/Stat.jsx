export default function Stat({ value, label }) {
    return (
      <div className="text-center">
        <div className="text-3xl font-extrabold">{value}</div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
      </div>
    );
  }
  