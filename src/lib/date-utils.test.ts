import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getDaysUntilDate,
  getLastSaturdayOfMonth,
  getTodayDayKey,
  getUpcomingMonthlyHoliday,
  isMonthlyHoliday,
} from './date-utils';

test('getLastSaturdayOfMonth calculates exact last Saturday across diverse months', () => {
  // November 2026: Nov 30 is Monday -> last Saturday is Nov 28, 2026
  const nov2026 = getLastSaturdayOfMonth(2026, 10);
  assert.equal(nov2026.getFullYear(), 2026);
  assert.equal(nov2026.getMonth(), 10);
  assert.equal(nov2026.getDate(), 28);
  assert.equal(nov2026.getDay(), 6);

  // October 2026: Oct 31 is Saturday -> last Saturday is Oct 31, 2026
  const oct2026 = getLastSaturdayOfMonth(2026, 9);
  assert.equal(oct2026.getDate(), 31);
  assert.equal(oct2026.getDay(), 6);

  // February 2024 (leap year): Feb 29 is Thursday -> last Saturday is Feb 24, 2024
  const feb2024 = getLastSaturdayOfMonth(2024, 1);
  assert.equal(feb2024.getDate(), 24);
  assert.equal(feb2024.getDay(), 6);

  // February 2026 (non-leap): Feb 28 is Saturday -> last Saturday is Feb 28, 2026
  const feb2026 = getLastSaturdayOfMonth(2026, 1);
  assert.equal(feb2026.getDate(), 28);
  assert.equal(feb2026.getDay(), 6);
});

test('isMonthlyHoliday returns true only on the last Saturday of a month', () => {
  assert.equal(isMonthlyHoliday(new Date(2026, 10, 28)), true);
  assert.equal(isMonthlyHoliday(new Date(2026, 10, 21)), false);
  assert.equal(isMonthlyHoliday(new Date(2026, 10, 29)), false);
});

test('getUpcomingMonthlyHoliday rolls over to next month after the current last Saturday passes', () => {
  // Nov 20, 2026 -> upcoming is Nov 28, 2026
  const before = getUpcomingMonthlyHoliday(new Date(2026, 10, 20));
  assert.equal(before.getMonth(), 10);
  assert.equal(before.getDate(), 28);

  // Nov 28, 2026 -> still Nov 28, 2026 (inclusive)
  const onDay = getUpcomingMonthlyHoliday(new Date(2026, 10, 28));
  assert.equal(onDay.getMonth(), 10);
  assert.equal(onDay.getDate(), 28);

  // Nov 29, 2026 -> rolls over to Dec 26, 2026
  const after = getUpcomingMonthlyHoliday(new Date(2026, 10, 29));
  assert.equal(after.getMonth(), 11);
  assert.equal(after.getDate(), 26);
  assert.equal(after.getDay(), 6);
});

test('getDaysUntilDate and getTodayDayKey compute accurate results', () => {
  assert.equal(
    getDaysUntilDate(new Date(2026, 10, 20), new Date(2026, 10, 28)),
    8,
  );
  // Nov 20, 2026 is a Friday
  assert.equal(getTodayDayKey(new Date(2026, 10, 20)), 'friday');
  // Nov 22, 2026 is a Sunday
  assert.equal(getTodayDayKey(new Date(2026, 10, 22)), 'sunday');
});
