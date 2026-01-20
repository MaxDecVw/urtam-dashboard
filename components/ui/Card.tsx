import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white p-6 shadow-card',
        hover && 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
