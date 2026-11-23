import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

export function FloatingExtrasBar() {
  const { extraItems, isDrawerOpen, openOrderDrawer } = useOrder();
  const prefersReducedMotion = useReducedMotion();

  const totalCount = extraItems.reduce((sum, item) => sum + item.quantity, 0);
  const visible = extraItems.length > 0 && !isDrawerOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-[66px] z-35 flex justify-center px-4 md:bottom-5 md:justify-end md:px-6"
        >
          <button
            type="button"
            onClick={() =>
              openOrderDrawer({
                orderType: 'Extra Items',
                selectedPlan: 'Extra Food Request',
              })
            }
            className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-full bg-forest-deep px-5 py-3 text-xs font-semibold text-white shadow-md transition-colors hover:bg-forest active:scale-[0.98] md:w-auto md:min-w-[260px]"
          >
            <span className="tabular-nums">
              {extraItems.length} {extraItems.length === 1 ? 'extra' : 'extras'} ({totalCount} qty)
            </span>
            <span className="inline-flex items-center gap-1 text-saffron">
              Order on WhatsApp
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
