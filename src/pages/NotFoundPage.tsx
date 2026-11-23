import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { Link, usePageMeta } from '../lib/router';

export function NotFoundPage() {
  usePageMeta({
    title: `Page Not Found — ${SITE_CONFIG.brandName}`,
    description: 'The page you are looking for could not be found.',
    path: '/404',
  });

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft text-forest">
        <UtensilsCrossed className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="heading-page mt-5 font-serif font-semibold text-forest">
        Page not found
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
        The link you opened doesn&apos;t exist. Head back to explore today&apos;s meals or monthly plans.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Link
          href="/"
          className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-deep"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Home
        </Link>
        <Link
          href="/menu"
          className="inline-flex min-h-[42px] items-center rounded-full border border-beige bg-surface px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-fresh hover:bg-leaf-soft"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}
