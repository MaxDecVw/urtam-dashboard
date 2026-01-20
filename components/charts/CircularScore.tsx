interface CircularScoreProps {
  score: number;
  label: string;
  size?: number;
}

export function CircularScore({ score, label, size = 100 }: CircularScoreProps) {
  const getColor = (score: number) => {
    if (score >= 90) return '#0cce6b'; // Vert
    if (score >= 50) return '#ffa400'; // Orange
    return '#ff4e42'; // Rouge
  };

  const color = getColor(score);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Cercle de fond gris */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Cercle de progression coloré */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>
        {/* Score au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      {/* Label */}
      <span className="text-sm font-medium text-gray-700 text-center">
        {label}
      </span>
    </div>
  );
}
