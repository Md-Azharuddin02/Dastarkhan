import { ClipboardList, Home, Info, Phone, UtensilsCrossed } from 'lucide-react';
import { Link, useRouter } from '../../lib/router';

const MOBILE_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/services', label: 'Services', icon: ClipboardList },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
] as const;

export function MobileBottomNav() {
  const { pathname } = useRouter();

  return (
    <nav
      aria-label="Mobile primary navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-beige bg-surface/95 backdrop-blur-md pb-safe md:hidden"
    >
      <div className="mx-auto grid h-14 max-w-lg grid-cols-5 items-stretch">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-[44px] flex-col items-center justify-center gap-1 px-1 transition-colors ${
                isActive
                  ? 'text-forest'
                  : 'text-muted hover:text-forest'
              }`}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-5 right-5 h-[2px] bg-forest"
                />
              )}
              <Icon
                className={`h-[18px] w-[18px] ${
                  isActive ? 'stroke-[2.25]' : 'stroke-[1.75]'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[10px] leading-none whitespace-nowrap ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
