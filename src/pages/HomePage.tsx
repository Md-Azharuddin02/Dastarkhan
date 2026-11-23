import { useMemo } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG, SITE_IMAGES } from '../config/site';
import { useOrder } from '../context/OrderContext';
import { getMenuForDay } from '../data/menu';
import {
  formatShortDate,
  getTodayDayKey,
  getUpcomingMonthlyHoliday,
  isMonthlyHoliday,
} from '../lib/date-utils';
import { Link, usePageMeta } from '../lib/router';
import { DietIndicator } from '../components/common/DietIndicator';
import { FoodImage } from '../components/common/FoodImage';
import { PricingSection } from '../components/pricing/PricingSection';

const ORDER_STEPS = [
  { step: '01', text: 'Pick a meal or monthly plan' },
  { step: '02', text: 'Add extra roti, rice or sabji' },
  { step: '03', text: 'Confirm directly on WhatsApp' },
] as const;

export function HomePage() {
  usePageMeta({
    title: `${SITE_CONFIG.brandName} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    path: '/',
  });

  const { openOrderDrawer } = useOrder();

  const { todaySchedule, todayIsHoliday, nextHolidayShort } = useMemo(() => {
    const now = new Date();
    return {
      todaySchedule: getMenuForDay(getTodayDayKey(now)),
      todayIsHoliday: isMonthlyHoliday(now),
      nextHolidayShort: formatShortDate(getUpcomingMonthlyHoliday(now)),
    };
  }, []);

  const todaysLunch = todaySchedule.lunch[0];
  const todaysDinner = todaySchedule.dinner[0];

  return (
    <div>
      {/* Minimal Visual Hero */}
      <section aria-label="Dastarkhān Tiffin Services overview" className="pt-4 pb-8 sm:pt-7 sm:pb-11 lg:pt-10 lg:pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="min-w-0 lg:order-2 lg:col-span-6">
              <div className="group overflow-hidden rounded-2xl border border-beige bg-surface">
                <FoodImage
                  src={SITE_IMAGES.heroThali}
                  alt="Freshly cooked home-style Indian tiffin meal with curry, dal, steamed rice, soft rotis, and salad"
                  aspectClassName="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]"
                  priority
                />
              </div>
            </div>

            <div className="min-w-0 lg:order-1 lg:col-span-6">
              <h1 className="heading-hero font-serif font-semibold text-forest">
                The taste of home made meals everyday.
              </h1>

              <p className="mt-2.5 text-sm text-muted">
                Delivered daily in Okhla, Shaheen Bagh &amp; nearby · Plans from ₹3,000/mo.
              </p>

              <div className="mt-5 flex items-center gap-2.5">
                <Link
                  href="/menu"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-forest-deep active:scale-[0.98] whitespace-nowrap sm:flex-initial sm:text-[13px]"
                >
                  Explore Menu
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => openOrderDrawer()}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-saffron px-4 py-2.5 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white active:scale-[0.98] whitespace-nowrap sm:flex-initial sm:text-[13px]"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  WhatsApp Order
                </button>
              </div>

              <p className="mt-4 text-xs text-muted tabular-nums">
                Lunch {SITE_CONFIG.hours.lunch} · Dinner {SITE_CONFIG.hours.dinner}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Meals — Clean White Cards on Warm Cream */}
      <section aria-labelledby="todays-meals-heading" className="border-t border-beige py-8 sm:py-11">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h2
                id="todays-meals-heading"
                className="heading-section font-serif font-semibold text-forest"
              >
                Today · {todaySchedule.label}
              </h2>
              {todayIsHoliday && (
                <p className="mt-1 inline-block rounded-md bg-saffron-soft px-2 py-0.5 text-xs font-medium text-nonveg">
                  Closed today for monthly holiday
                </p>
              )}
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-fresh whitespace-nowrap"
            >
              Full Menu
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
            {[
              { slot: 'Lunch' as const, meal: todaysLunch },
              { slot: 'Dinner' as const, meal: todaysDinner },
            ].map(({ slot, meal }) => (
              <article
                key={meal.id}
                className="group flex min-w-0 items-center gap-3.5 rounded-2xl border border-beige bg-surface p-3.5"
              >
                <div className="w-22 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-24">
                  <FoodImage
                    src={meal.image}
                    alt={meal.imageAlt}
                    aspectClassName="aspect-square"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <DietIndicator diet={meal.diet} />
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-charcoal">{slot}</span>
                  </div>

                  <h3 className="mt-1 line-clamp-1 font-serif text-[15px] font-semibold text-charcoal sm:text-base">
                    {meal.name}
                  </h3>

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
                      onClick={() =>
                        openOrderDrawer({
                          orderType: 'Trial Meal',
                          selectedPlan:
                            meal.diet === 'non-veg'
                              ? 'Trial Meal (₹150 Non-Veg)'
                              : 'Trial Meal (₹100 Veg)',
                          mealPreference: slot,
                          foodPreference: meal.diet === 'non-veg' ? 'Non-Veg' : 'Veg',
                        })
                      }
                      className="inline-flex min-h-[36px] shrink-0 items-center rounded-full border border-forest bg-surface px-3.5 py-1 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-white active:scale-[0.98] whitespace-nowrap"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Plans & Pricing — Sand Alternate Section Background */}
      <div className="border-t border-beige bg-sand">
        <PricingSection />
      </div>

      {/* Minimal How It Works & Extras Strip */}
      <section aria-labelledby="how-it-works-heading" className="border-t border-beige py-8 sm:py-11">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="how-it-works-heading"
              className="heading-section font-serif font-semibold text-forest"
            >
              How it works
            </h2>
            <span className="rounded-full bg-saffron-soft px-2.5 py-0.5 text-xs font-medium text-charcoal tabular-nums">
              Next holiday: Sat, {nextHolidayShort}
            </span>
          </div>

          <ol className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
            {ORDER_STEPS.map((item) => (
              <li
                key={item.step}
                className="flex items-center gap-3 rounded-2xl border border-beige bg-surface px-4 py-3.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-soft font-serif text-xs font-semibold text-forest tabular-nums">
                  {item.step}
                </span>
                <span className="text-sm font-medium text-charcoal">{item.text}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => openOrderDrawer()}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-saffron px-5 py-2 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white whitespace-nowrap"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Order on WhatsApp
            </button>

            <Link
              href="/menu#extra-items"
              className="inline-flex min-h-[42px] items-center rounded-full border border-beige bg-surface px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-fresh hover:bg-leaf-soft whitespace-nowrap"
            >
              Add Extra Roti / Rice
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
