import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../../data/pricing';
import { useOrder } from '../../context/OrderContext';
import type { PricingPlan } from '../../types';

interface PricingSectionProps {
  compactHeader?: boolean;
}

const CONCISE_FEATURES: Record<PricingPlan['id'], string[]> = {
  'lunch-only': [
    'Daily Lunch or Dinner delivery',
    'Okhla, Shaheen Bagh & nearby areas',
  ],
  'lunch-dinner': [
    'Daily Lunch + Dinner delivered',
    'Includes Chicken & Egg specials',
  ],
  'trial-meal': [
    '₹100 Veg · ₹150 Non-Veg per meal',
    'No monthly commitment',
  ],
};

export function PricingSection({ compactHeader = false }: PricingSectionProps) {
  const { openOrderDrawer } = useOrder();

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.id === 'trial-meal') {
      openOrderDrawer({
        orderType: 'Trial Meal',
        selectedPlan: 'Trial Meal (₹100 Veg)',
        mealPreference: 'Lunch',
        foodPreference: 'Veg',
      });
      return;
    }

    const planLabel =
      plan.id === 'lunch-only'
        ? '1 Meal / Day — Lunch or Dinner (₹3,000/month)'
        : '2 Meals / Day — Lunch + Dinner (₹5,000/month)';

    openOrderDrawer({
      orderType: 'Monthly Plan',
      selectedPlan: planLabel,
      mealPreference: plan.defaultMealPreference,
      foodPreference: 'Veg',
    });
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={compactHeader ? 'py-8 sm:py-10' : 'py-8 sm:py-11'}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="pricing-heading"
            className="heading-section font-serif font-semibold text-forest"
          >
            Meal Plans
          </h2>
          <p className="text-xs text-muted">
            7 days/week · Closed last Saturday
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-5">
          {PRICING_PLANS.map((plan) => {
            const isFeatured = Boolean(plan.featured);
            const bullets = CONCISE_FEATURES[plan.id];

            return (
              <article
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition-colors ${
                  isFeatured
                    ? 'border-forest-deep bg-forest-deep text-white'
                    : 'border-beige bg-surface text-charcoal'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-base font-semibold">
                        {plan.name}
                      </h3>
                      {isFeatured && (
                        <p className="mt-0.5 text-[11px] font-semibold text-saffron">
                          Most popular
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-fluid-price font-serif font-semibold tabular-nums">
                        {plan.priceLabel}
                      </span>
                      <span
                        className={`ml-0.5 text-xs ${
                          isFeatured ? 'text-cream/75' : 'text-muted'
                        }`}
                      >
                        {plan.id === 'trial-meal' ? '' : '/mo'}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {bullets.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-xs ${
                          isFeatured ? 'text-cream/85' : 'text-muted'
                        }`}
                      >
                        <Check
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isFeatured ? 'text-saffron' : 'text-fresh'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className={`mt-5 inline-flex min-h-[42px] w-full items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors active:scale-[0.98] ${
                    isFeatured
                      ? 'bg-saffron text-forest-deep hover:bg-saffron-soft'
                      : 'bg-forest text-white hover:bg-forest-deep'
                  }`}
                >
                  {plan.ctaLabel}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
