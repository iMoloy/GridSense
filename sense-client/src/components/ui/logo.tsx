import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  subtitle?: boolean;
  href?: string;
  className?: string;
}

export function Logo({
  size = 'md',
  subtitle = true,
  href = '/',
  className,
}: LogoProps) {
  const sizeStyles = {
    sm: {
      text: 'text-lg',
      sub: 'text-[9px]',
      dot: 'h-1.5 w-1.5',
    },
    md: {
      text: 'text-xl',
      sub: 'text-[10px]',
      dot: 'h-2 w-2',
    },
    lg: {
      text: 'text-2xl sm:text-3xl',
      sub: 'text-xs',
      dot: 'h-2.5 w-2.5',
    },
  }[size];

  const content = (
    <div className={cn('inline-flex flex-col', className)}>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            'font-black tracking-tight text-slate-100',
            sizeStyles.text
          )}
        >
          GRID
          <span className="text-emerald-400">SENSE</span>
        </span>
        {/* Subtle energetic pulse dot (pure CSS, no icon) */}
        <span
          className={cn(
            'rounded-full bg-emerald-400 ring-2 ring-emerald-500/30',
            sizeStyles.dot
          )}
        />
      </div>

      {subtitle && (
        <span
          className={cn(
            'font-mono uppercase tracking-[0.22em] text-slate-400',
            sizeStyles.sub
          )}
        >
          Energy Telemetry
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
