import type { DietType } from '../../types';

interface DietIndicatorProps {
  diet: DietType;
  label?: string;
  className?: string;
}

export function DietIndicator({ diet, label, className = '' }: DietIndicatorProps) {
  const isVeg = diet === 'veg';
  const displayLabel = label ?? (isVeg ? 'Veg' : 'Non-Veg');

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold leading-none tracking-tight ${
        isVeg ? 'text-veg' : 'text-nonveg'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] ${
          isVeg ? 'border-veg' : 'border-nonveg'
        }`}
      >
        {isVeg ? (
          <span className="h-1.5 w-1.5 rounded-full bg-veg" />
        ) : (
          <span className="h-0 w-0 border-x-[3px] border-b-[5px] border-x-transparent border-b-nonveg" />
        )}
      </span>
      <span className="whitespace-nowrap">{displayLabel}</span>
    </span>
  );
}
