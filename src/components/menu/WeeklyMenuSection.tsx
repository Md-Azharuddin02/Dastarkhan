import { useMemo, useState } from 'react';
import { WEEKLY_MENU } from '../../data/menu';
import { useOrder } from '../../context/OrderContext';
import { getTodayDayKey } from '../../lib/date-utils';
import type { DayKey, DietType, MealOption } from '../../types';
import { DietIndicator } from '../common/DietIndicator';
import { FoodImage } from '../common/FoodImage';

type DietFilter = 'all' | DietType;

export function WeeklyMenuSection() {
  const todayKey = useMemo(() => getTodayDayKey(), []);
  const [selectedDay, setSelectedDay] = useState<DayKey>(todayKey);
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const { openOrderDrawer } = useOrder();

  const activeDayMenu = useMemo(
    () => WEEKLY_MENU.find((d) => d.day === selectedDay) ?? WEEKLY_MENU[0],
    [selectedDay],
  );

  const filterMeals = (meals: MealOption[]) => {
    if (dietFilter === 'all') return meals;
    return meals.filter((meal) => meal.diet === dietFilter);
  };

  const lunchMeals = filterMeals(activeDayMenu.lunch);
  const dinnerMeals = filterMeals(activeDayMenu.dinner);
  const nonVegDays = useMemo(() => WEEKLY_MENU.filter((d) => d.hasNonVeg), []);

  const handleOrderMeal = (meal: MealOption, slot: 'Lunch' | 'Dinner') => {
    openOrderDrawer({
      orderType: 'Trial Meal',
      selectedPlan:
        meal.diet === 'non-veg'
          ? 'Trial Meal (₹150 Non-Veg)'
          : 'Trial Meal (₹100 Veg)',
      mealPreference: slot,
      foodPreference: meal.diet === 'non-veg' ? 'Non-Veg' : 'Veg',
    });
  };

  const renderDishRow = (meal: MealOption, slot: 'Lunch' | 'Dinner') => (
    <article
      key={meal.id}
      className="group flex min-w-0 items-center gap-3.5 rounded-2xl border border-beige bg-surface p-3"
    >
      <div className="w-20 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-22">
        <FoodImage
          src={meal.image}
          alt={meal.imageAlt}
          aspectClassName="aspect-square"
        />
      </div>

      <div className="min-w-0 flex-1">
        <DietIndicator diet={meal.diet} />

        <h4 className="mt-1 line-clamp-2 font-serif text-[15px] font-semibold leading-snug text-charcoal">
          {meal.name}
        </h4>

        <p className="mt-0.5 truncate text-xs text-muted">
          {meal.items.join(', ')}
        </p>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-charcoal tabular-nums">
            {meal.diet === 'non-veg' ? '₹150' : '₹100'}{' '}
            <span className="text-xs font-normal text-muted">trial</span>
          </span>

          <button
            type="button"
            onClick={() => handleOrderMeal(meal, slot)}
            className="inline-flex min-h-[34px] shrink-0 items-center rounded-full border border-forest bg-surface px-3.5 py-1 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-white active:scale-[0.98] whitespace-nowrap"
          >
            Order
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <section id="weekly-menu" aria-label="Weekly menu schedule" className="py-5 sm:py-7">
      {/* Diet Filter + Clean Day Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter meals by dietary preference"
          className="inline-flex rounded-full border border-beige bg-leaf-soft p-1"
        >
          {(
            [
              { value: 'all', label: 'All' },
              { value: 'veg', label: 'Veg' },
              { value: 'non-veg', label: 'Non-Veg' },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDietFilter(option.value)}
              aria-pressed={dietFilter === option.value}
              className={`min-h-[32px] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap ${
                dietFilter === option.value
                  ? 'bg-forest text-white'
                  : 'text-muted hover:text-forest'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted">
          Chicken: Wed, Fri, Sun · Egg: Mon, Sat
        </p>
      </div>

      {/* Minimal Underline Day Tabs */}
      <div
        role="tablist"
        aria-label="Days of the week"
        className="mt-4 grid grid-cols-7 border-b border-beige"
      >
        {WEEKLY_MENU.map((dayItem) => {
          const isSelected = dayItem.day === selectedDay;
          const isToday = dayItem.day === todayKey;

          return (
            <button
              key={dayItem.day}
              type="button"
              role="tab"
              id={`tab-${dayItem.day}`}
              aria-selected={isSelected}
              aria-controls={`panel-${dayItem.day}`}
              onClick={() => setSelectedDay(dayItem.day)}
              className={`relative flex min-h-[44px] min-w-0 flex-col items-center justify-center px-0.5 py-2 text-center transition-colors sm:px-2 ${
                isSelected
                  ? 'text-forest'
                  : 'text-muted hover:text-forest'
              }`}
            >
              <span className={`text-xs whitespace-nowrap ${isSelected ? 'font-bold' : 'font-medium'}`}>
                <span className="sm:hidden">{dayItem.shortLabel}</span>
                <span className="hidden sm:inline">{dayItem.label}</span>
              </span>
              <span className="mt-0.5 text-[10px] leading-none text-muted">
                {isToday ? (
                  <span className="font-semibold text-fresh">Today</span>
                ) : dayItem.hasNonVeg ? (
                  <>
                    <span className="sm:hidden">NV</span>
                    <span className="hidden sm:inline">Non-Veg</span>
                  </>
                ) : (
                  'Veg'
                )}
              </span>
              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-1.5 bottom-0 h-[2px] bg-forest sm:inset-x-2"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Meals */}
      <div
        id={`panel-${activeDayMenu.day}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeDayMenu.day}`}
        className="mt-6"
      >
        {lunchMeals.length === 0 && dinnerMeals.length === 0 ? (
          <div className="rounded-2xl border border-beige bg-surface py-8 text-center">
            <p className="font-serif text-base font-semibold text-forest">
              {activeDayMenu.label} is Vegetarian only
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {nonVegDays.map((day) => (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => setSelectedDay(day.day)}
                  className="min-h-[36px] rounded-full border border-forest px-3.5 py-1 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
                >
                  {day.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setDietFilter('all')}
                className="min-h-[36px] rounded-full bg-leaf-soft px-3.5 py-1 text-xs font-semibold text-forest transition-colors hover:bg-sand"
              >
                Show All
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2 pb-3">
                <h3 className="font-serif text-base font-semibold text-forest">
                  Lunch
                </h3>
                <span className="shrink-0 text-xs text-muted tabular-nums">
                  {activeDayMenu.lunch[0]?.servingWindow}
                </span>
              </div>

              {lunchMeals.length > 0 ? (
                <div className="space-y-3">
                  {lunchMeals.map((meal) => renderDishRow(meal, 'Lunch'))}
                </div>
              ) : (
                <p className="rounded-2xl border border-beige bg-surface p-4 text-xs text-muted">
                  {dietFilter === 'veg'
                    ? 'Non-veg lunch served today.'
                    : 'Vegetarian lunch only.'}{' '}
                  <button
                    type="button"
                    onClick={() => setDietFilter('all')}
                    className="font-semibold text-forest underline"
                  >
                    Show all
                  </button>
                </p>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2 pb-3">
                <h3 className="font-serif text-base font-semibold text-forest">
                  Dinner
                </h3>
                <span className="shrink-0 text-xs text-muted tabular-nums">
                  {activeDayMenu.dinner[0]?.servingWindow}
                </span>
              </div>

              {dinnerMeals.length > 0 ? (
                <div className="space-y-3">
                  {dinnerMeals.map((meal) => renderDishRow(meal, 'Dinner'))}
                </div>
              ) : (
                <p className="rounded-2xl border border-beige bg-surface p-4 text-xs text-muted">
                  {dietFilter === 'veg'
                    ? 'Non-veg dinner served today.'
                    : 'Vegetarian dinner only.'}{' '}
                  <button
                    type="button"
                    onClick={() => setDietFilter('all')}
                    className="font-semibold text-forest underline"
                  >
                    Show all
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
