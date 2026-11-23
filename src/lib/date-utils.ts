import type { DayKey } from '../types';

export const DAYS_OF_WEEK: { key: DayKey; label: string; shortLabel: string }[] = [
  { key: 'monday', label: 'Monday', shortLabel: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', shortLabel: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', shortLabel: 'Wed' },
  { key: 'thursday', label: 'Thursday', shortLabel: 'Thu' },
  { key: 'friday', label: 'Friday', shortLabel: 'Fri' },
  { key: 'saturday', label: 'Saturday', shortLabel: 'Sat' },
  { key: 'sunday', label: 'Sunday', shortLabel: 'Sun' },
];

const JS_DAY_TO_KEY: DayKey[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

/**
 * Dynamically calculates the last Saturday of any given year and month (0-indexed month: 0 = Jan, 11 = Dec).
 */
export function getLastSaturdayOfMonth(year: number, monthIndex: number): Date {
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const daysSinceSaturday = (lastDayOfMonth.getDay() + 1) % 7;
  const lastSaturdayDate = lastDayOfMonth.getDate() - daysSinceSaturday;
  return new Date(year, monthIndex, lastSaturdayDate, 0, 0, 0, 0);
}

/**
 * Checks whether a given date falls on the monthly mess holiday (last Saturday of its month).
 */
export function isMonthlyHoliday(date: Date): boolean {
  const lastSaturday = getLastSaturdayOfMonth(date.getFullYear(), date.getMonth());
  return (
    date.getFullYear() === lastSaturday.getFullYear() &&
    date.getMonth() === lastSaturday.getMonth() &&
    date.getDate() === lastSaturday.getDate()
  );
}

/**
 * Returns the upcoming monthly holiday relative to referenceDate (inclusive of today if today is the last Saturday).
 */
export function getUpcomingMonthlyHoliday(referenceDate: Date = new Date()): Date {
  const todayStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
    0,
    0,
    0,
    0,
  );
  const thisMonthHoliday = getLastSaturdayOfMonth(
    todayStart.getFullYear(),
    todayStart.getMonth(),
  );

  if (todayStart.getTime() <= thisMonthHoliday.getTime()) {
    return thisMonthHoliday;
  }

  return getLastSaturdayOfMonth(todayStart.getFullYear(), todayStart.getMonth() + 1);
}

/**
 * Returns the whole number of calendar days between two dates.
 */
export function getDaysUntilDate(fromDate: Date, targetDate: Date): number {
  const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const end = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Formats a Date into a readable string, e.g. "Saturday, 28 November 2026".
 */
export function formatHolidayDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a Date into a short date string, e.g. "28 Nov 2026".
 */
export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Maps a Date to its DayKey ('monday'..'sunday').
 */
export function getTodayDayKey(date: Date = new Date()): DayKey {
  return JS_DAY_TO_KEY[date.getDay()];
}
