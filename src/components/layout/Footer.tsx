import { SITE_CONFIG } from '../../config/site';
import { formatShortDate, getUpcomingMonthlyHoliday } from '../../lib/date-utils';
import { Link } from '../../lib/router';
import { buildDirectWhatsAppUrl } from '../../lib/whatsapp';

export function Footer() {
  const nextHolidayDate = formatShortDate(getUpcomingMonthlyHoliday());
  const directWhatsAppUrl = buildDirectWhatsAppUrl();

  return (
    <footer className="border-t border-forest bg-forest-deep text-cream/80">
      <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="font-serif text-base font-semibold text-white">
              {SITE_CONFIG.brandName}
            </Link>
            <p className="mt-1 text-xs text-cream/80 tabular-nums">
              Lunch {SITE_CONFIG.hours.lunch} · Dinner {SITE_CONFIG.hours.dinner}
            </p>
            <p className="mt-0.5 text-xs text-saffron-soft/90">
              Closed last Saturday (Next: {nextHolidayDate})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-cream/90">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-saffron hover:underline"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${SITE_CONFIG.displayPhone.replace(/\s+/g, '')}`}
              className="tabular-nums text-white hover:text-saffron"
            >
              {SITE_CONFIG.displayPhone}
            </a>
            <Link href="/menu" className="text-cream/80 hover:text-white">
              Menu
            </Link>
            <Link href="/contact" className="text-cream/80 hover:text-white">
              Location
            </Link>
          </div>
        </div>

        <p className="mt-5 border-t border-white/15 pt-4 text-[11px] text-cream/65">
          © {new Date().getFullYear()} {SITE_CONFIG.brandName} · Orders confirmed by owner on WhatsApp
        </p>
      </div>
    </footer>
  );
}
