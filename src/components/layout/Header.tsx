import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useOrder } from '../../context/OrderContext';
import { Link, useRouter } from '../../lib/router';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  const { pathname } = useRouter();
  const { openOrderDrawer, extraItems } = useOrder();

  return (
    <header className="relative z-30 border-b border-beige bg-surface/95 backdrop-blur-md md:sticky md:top-0">
      <div className="mx-auto flex h-13 max-w-5xl items-center justify-between gap-8 px-4 sm:px-6 md:h-15">
        <Link
          href="/"
          className="font-serif text-[15px] font-semibold tracking-tight text-forest whitespace-nowrap shrink-0 sm:text-lg md:text-xl"
        >
          {SITE_CONFIG.brandName}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-forest'
                    : 'text-muted hover:text-forest'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-forest"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => openOrderDrawer()}
          className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full bg-saffron px-4 py-1.5 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white active:scale-[0.98] whitespace-nowrap shrink-0 sm:min-h-[38px]"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Order</span>
          {extraItems.length > 0 && (
            <span className="tabular-nums text-[11px] font-bold">
              ({extraItems.length})
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
