import { SITE_CONFIG, SITE_IMAGES } from '../config/site';
import { useOrder } from '../context/OrderContext';
import { Link, usePageMeta } from '../lib/router';
import { FoodImage } from '../components/common/FoodImage';

const KITCHEN_PILLARS = [
  {
    title: 'Home-Style Cooking',
    body: 'Delicious homemade meals cooked daily with balanced spices and soft rotis.',
  },
  {
    title: 'Fresh & Quality Ingredients',
    body: 'Daily market vegetables, wholesome lentils, and quality poultry and eggs.',
  },
  {
    title: 'Hygienic Preparation',
    body: 'Clean kitchen standards and careful tiffin packing for every delivery.',
  },
  {
    title: 'On-Time Delivery',
    body: 'Reliable daily delivery across Okhla, Shaheen Bagh, Zakir Nagar, Batla House & Abul Fazal.',
  },
  {
    title: 'Nutritious & Balanced Meals',
    body: 'Complete everyday portions—1 Meal/Day ₹3,000/mo, 2 Meals/Day ₹5,000/mo.',
  },
] as const;

export default function AboutPage() {
  usePageMeta({
    title: `About — ${SITE_CONFIG.brandName}`,
    description:
      'Home-style cooking, fresh quality ingredients, hygienic preparation, and on-time daily tiffin delivery by Dastarkhān Tiffin Services.',
    path: '/about',
  });

  const { openOrderDrawer } = useOrder();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header>
        <h1 className="heading-page font-serif font-semibold text-forest">
          Our Kitchen
        </h1>
        <p className="mt-1 text-xs text-muted sm:text-sm">
          {SITE_CONFIG.tagline}
        </p>
      </header>

      <div className="group mt-5 overflow-hidden rounded-2xl border border-beige bg-surface">
        <FoodImage
          src={SITE_IMAGES.kitchenPrep}
          alt="Hygienic kitchen preparation table at Dastarkhān Tiffin Services with fresh vegetables, spices, and stainless steel vessels"
          aspectClassName="aspect-[16/9] max-h-60 sm:max-h-80 w-full"
          priority
        />
      </div>

      <section aria-labelledby="philosophy-heading" className="mt-8">
        <h2
          id="philosophy-heading"
          className="heading-section font-serif font-semibold text-forest"
        >
          Standards
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5">
          {KITCHEN_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`rounded-2xl border border-beige bg-surface p-4 ${
                idx === KITCHEN_PILLARS.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-soft font-serif text-xs font-semibold text-forest tabular-nums">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-base font-semibold text-charcoal">
                  {pillar.title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-[13px]">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-beige bg-sand p-5 sm:p-6">
        <div>
          <h2 className="font-serif text-lg font-semibold text-forest">
            Trial meal also available
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            ₹100 Veg · ₹150 Non-Veg · Delivered fresh to your door.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              openOrderDrawer({
                orderType: 'Trial Meal',
                selectedPlan: 'Trial Meal (₹100 Veg)',
                mealPreference: 'Lunch',
              })
            }
            className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-deep"
          >
            Book Trial Meal
          </button>
          <Link
            href="/menu"
            className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-beige bg-surface px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-fresh hover:bg-leaf-soft"
          >
            View Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
