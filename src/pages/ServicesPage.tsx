import { SITE_CONFIG } from '../config/site';
import { useOrder } from '../context/OrderContext';
import { SERVICE_FAQS, SERVICE_OFFERINGS } from '../data/services';
import { Link, usePageMeta } from '../lib/router';
import { FoodImage } from '../components/common/FoodImage';
import { FaqAccordion } from '../components/common/MotionPrimitives';
import { PricingSection } from '../components/pricing/PricingSection';

export default function ServicesPage() {
  usePageMeta({
    title: `Services — ${SITE_CONFIG.brandName}`,
    description:
      '1 Meal/Day (₹3,000/mo), 2 Meals/Day (₹5,000/mo), trial meals, and daily tiffin delivery by Dastarkhān Tiffin Services.',
    path: '/services',
  });

  const { openOrderDrawer } = useOrder();

  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10">
        <header>
          <h1 className="heading-page font-serif font-semibold text-forest">
            Services
          </h1>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            Monthly plans, trial meals, and extra food requests.
          </p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
          {SERVICE_OFFERINGS.map((service) => (
            <article
              key={service.id}
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-beige bg-surface p-3.5"
            >
              <div className="w-20 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-24">
                <FoodImage
                  src={service.image}
                  alt={service.imageAlt}
                  aspectClassName="aspect-square"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="inline-block rounded-md bg-saffron-soft px-2 py-0.5 text-[11px] font-semibold text-forest tabular-nums">
                  {service.highlightNote}
                </p>
                <h2 className="mt-1 font-serif text-[15px] font-semibold text-charcoal sm:text-base">
                  {service.title}
                </h2>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {service.details[0]}
                </p>

                <div className="mt-2.5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openOrderDrawer(service.orderPreset)}
                    className="inline-flex min-h-[34px] items-center rounded-full border border-forest bg-surface px-3.5 py-1 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-white whitespace-nowrap"
                  >
                    {service.ctaLabel}
                  </button>

                  {service.id === 'extra-food-customization' && (
                    <Link
                      href="/menu#extra-items"
                      className="text-xs font-medium text-fresh hover:text-forest"
                    >
                      Customize →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="border-t border-beige bg-sand">
        <PricingSection compactHeader />
      </div>

      <section
        aria-labelledby="services-faq-heading"
        className="mx-auto max-w-5xl border-t border-beige px-4 py-8 sm:px-6 sm:py-10"
      >
        <h2
          id="services-faq-heading"
          className="heading-section font-serif font-semibold text-forest"
        >
          FAQ
        </h2>
        <div className="mt-4">
          <FaqAccordion items={SERVICE_FAQS} />
        </div>
      </section>
    </div>
  );
}
