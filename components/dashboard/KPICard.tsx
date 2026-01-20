import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils/cn';
import type { KPICardProps } from '@/types';

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color,
  footer,
  className,
}: KPICardProps) {
  const TrendIcon = trend?.direction === 'up'
    ? TrendingUp
    : trend?.direction === 'down'
    ? TrendingDown
    : Minus;

  const trendColor = trend?.direction === 'up'
    ? 'text-green-600'
    : trend?.direction === 'down'
    ? 'text-red-600'
    : 'text-gray-500';

  return (
    <Card hover className={cn('relative overflow-hidden', className)}>
      {/* Barre de couleur en haut */}
      {color && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: color }}
        />
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </h3>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}

          {trend && (
            <div className={cn('flex items-center gap-1 mt-3', trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: color ? `${color}20` : '#f3f4f6' }}
          >
            <div style={{ color: color || '#6b7280' }}>
              {icon}
            </div>
          </div>
        )}
      </div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </Card>
  );
}
