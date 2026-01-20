'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '@/lib/constants/colors';
import type { Competitor } from '@/types';

interface ComparisonChartProps {
  competitors: Competitor[];
  urtamFollowers: number;
}

export function ComparisonChart({ competitors, urtamFollowers }: ComparisonChartProps) {
  const data = [
    {
      name: 'URTAM',
      followers: urtamFollowers,
      fill: COLORS.primary,
    },
    ...competitors.map((comp) => ({
      name: comp.name,
      followers: comp.totalFollowers,
      fill: comp.color,
    })),
  ].sort((a, b) => b.followers - a.followers);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          angle={-15}
          textAnchor="end"
        />
        <YAxis
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '12px',
          }}
          formatter={(value: number) => [value.toLocaleString(), 'Followers totaux']}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Bar
          dataKey="followers"
          name="Followers"
          radius={[8, 8, 0, 0]}
        >
          {data.map((entry, index) => (
            <Bar key={`bar-${index}`} dataKey="followers" fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
