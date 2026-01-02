import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function ThemeToggle({
  checked,
  onCheckedChange,
  className,
  ...props
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Temayı değiştir"
      onClick={() => onCheckedChange(!checked)}
      {...props}
      className={cn(
        'peer relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-input hover:bg-input/90',
        className
      )}
    >
      {/* Hareketli Daire (Thumb) */}
      <span
        className={cn(
          'pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
          // checked true ise (Dark) sağa kaydır (translate-x-7 ~ 28px), false ise (Light) başta dur.
          checked ? 'translate-x-7' : 'translate-x-0'
        )}
      >
        {/* İkonlar: Aynı anda render edilir ama opacity/scale ile geçiş yapılır */}
        <Sun
          className={cn(
            'absolute h-4 w-4 transition-all duration-200',
            checked ? 'scale-0 opacity-0' : 'scale-100 opacity-100 text-orange-500'
          )}
        />
        <Moon
          className={cn(
            'absolute h-4 w-4 transition-all duration-200',
            checked ? 'scale-100 opacity-100 text-blue-500' : 'scale-0 opacity-0'
          )}
        />
      </span>
    </button>
  );
}
