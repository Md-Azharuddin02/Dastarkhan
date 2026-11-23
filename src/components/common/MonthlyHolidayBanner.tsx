import {
  formatShortDate,
  getDaysUntilDate,
  getUpcomingMonthlyHoliday,
  isMonthlyHoliday,
} from '../../lib/date-utils';

interface MonthlyHolidayBannerProps {
  compact?: boolean;
  className?: string;
}

export function MonthlyHolidayBanner({
  className = '',
}: MonthlyHolidayBannerProps) {
  const now = new Date();
  const todayIsHoliday = isMonthlyHoliday(now);
  const nextHoliday = getUpcomingMonthlyHoliday(now);
  const daysUntil = getDaysUntilDate(now, nextHoliday);
  const formattedShort = formatShortDate(nextHoliday);

  return (
    <aside
      aria-label="Monthly holiday schedule"
      className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border border-saffron/35 bg-saffron-soft px-3.5 py-2 text-xs text-charcoal ${className}`}
    >
      <span className="font-medium">
        {todayIsHoliday
          ? 'Closed today for monthly holiday'
          : 'Monthly holiday: Last Saturday'}
      </span>
      <span className="font-semibold text-forest tabular-nums whitespace-nowrap">
        {todayIsHoliday
          ? formattedShort
          : `Next: ${formattedShort} (${daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`})`}
      </span>
    </aside>
  );
}
