import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../lib/router';
import { MonthlyHolidayBanner } from '../components/common/MonthlyHolidayBanner';
import { ExtraItemsBuilder } from '../components/menu/ExtraItemsBuilder';
import { WeeklyMenuSection } from '../components/menu/WeeklyMenuSection';

export default function MenuPage() {
  usePageMeta({
    title: `Menu — ${SITE_CONFIG.brandName}`,
    description:
      'Explore Dastarkhān Tiffin Services Monday to Sunday homemade lunch and dinner menu with Veg, Egg, and Chicken specials.',
    path: '/menu',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex items-baseline justify-between gap-2">
        <h1 className="heading-page font-serif font-semibold text-forest">
          Menu
        </h1>
        <a
          href="#extra-items"
          className="text-xs font-semibold text-forest hover:text-fresh whitespace-nowrap"
        >
          Extra Items ↓
        </a>
      </header>

      <div className="mt-4">
        <MonthlyHolidayBanner />
      </div>

      <WeeklyMenuSection />

      <ExtraItemsBuilder />
    </div>
  );
}
