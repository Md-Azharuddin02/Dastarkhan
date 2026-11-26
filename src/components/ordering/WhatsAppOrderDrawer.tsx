import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Copy, ExternalLink, MessageCircle, Trash2, X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useOrder } from '../../context/OrderContext';
import {
  buildWhatsAppUrl,
  formatOrderWhatsAppMessage,
  validateOrderPayload,
} from '../../lib/whatsapp';
import { SelectDropdown, type SelectOption } from '../common/SelectDropdown';
import type {
  MealPreference,
  OrderFormPayload,
  OrderType,
  OrderValidationErrors,
} from '../../types';

const PLAN_OPTIONS: Record<OrderType, readonly SelectOption[]> = {
  'Monthly Plan': [
    {
      value: '1 Meal / Day — Lunch or Dinner (₹3,000/month)',
      label: '1 Meal / Day (Lunch or Dinner)',
      detail: '₹3,000/mo',
    },
    {
      value: '2 Meals / Day — Lunch + Dinner (₹5,000/month)',
      label: '2 Meals / Day (Lunch + Dinner)',
      detail: '₹5,000/mo',
    },
  ],
  'Trial Meal': [
    { value: 'Trial Meal (₹100 Veg)', label: 'Veg Trial Meal', detail: '₹100' },
    { value: 'Trial Meal (₹150 Non-Veg)', label: 'Non-Veg Trial Meal', detail: '₹150' },
  ],
  'Extra Items': [
    { value: 'Extra Food Request', label: 'Extra Food Request', detail: 'On request' },
  ],
};

export function WhatsAppOrderDrawer() {
  const {
    isDrawerOpen,
    draft,
    extraItems,
    specialInstructions,
    closeOrderDrawer,
    updateDraft,
    removeExtraItem,
    setSpecialInstructions,
  } = useOrder();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [readyOrder, setReadyOrder] = useState<{
    message: string;
    url: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const headingId = useId();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isDrawerOpen) return;
    setReadyOrder(null);
    setErrors({});
    setCopied(false);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        closeOrderDrawer();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeOrderDrawer]);

  const handleOrderTypeChange = (nextType: OrderType) => {
    const defaultPlan = PLAN_OPTIONS[nextType][0].value;
    updateDraft({
      orderType: nextType,
      selectedPlan: defaultPlan,
    });
    setReadyOrder(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: OrderFormPayload = {
      customerName,
      phoneNumber,
      orderType: draft.orderType,
      selectedPlan: draft.selectedPlan,
      mealPreference: draft.mealPreference,
      extraItems,
      specialInstructions,
    };

    const validationErrors = validateOrderPayload(payload);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const message = formatOrderWhatsAppMessage(payload);
    const url = buildWhatsAppUrl(message);
    setReadyOrder({ message, url });
  };

  const handleCopy = async () => {
    if (!readyOrder) return;
    try {
      await navigator.clipboard.writeText(readyOrder.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-stretch sm:justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={closeOrderDrawer}
            className="fixed inset-0 cursor-pointer bg-black/40 backdrop-blur-[2px]"
          />

          <motion.div
            initial={prefersReducedMotion ? false : { y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: 24, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-surface shadow-xl sm:max-h-full sm:max-w-md sm:rounded-none sm:rounded-l-3xl"
          >
            {/* Mobile handle */}
            <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden="true">
              <span className="h-1 w-9 rounded-full bg-beige" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-beige px-5 py-3.5">
              <h2 id={headingId} className="font-serif text-lg font-semibold text-forest">
                WhatsApp Order
              </h2>
              <button
                type="button"
                aria-label="Close order drawer"
                onClick={closeOrderDrawer}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-leaf-soft hover:text-forest"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {readyOrder ? (
                <div className="space-y-3.5">
                  <p className="rounded-xl bg-leaf-soft px-3.5 py-2.5 text-xs font-medium text-forest">
                    {SITE_CONFIG.orderConfirmationNotice}
                  </p>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-charcoal">
                        Message preview
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-fresh"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre
                      data-testid="whatsapp-message-preview"
                      className="mt-2 whitespace-pre-wrap rounded-2xl border border-beige bg-cream p-3.5 font-sans text-xs leading-relaxed text-charcoal"
                    >
                      {readyOrder.message}
                    </pre>
                  </div>
                </div>
              ) : (
                <form id="whatsapp-order-form" onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-3 gap-1 rounded-full bg-leaf-soft p-1">
                    {(['Monthly Plan', 'Trial Meal', 'Extra Items'] as const).map(
                      (typeOption) => (
                        <button
                          key={typeOption}
                          type="button"
                          onClick={() => handleOrderTypeChange(typeOption)}
                          className={`min-h-[36px] rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
                            draft.orderType === typeOption
                              ? 'bg-forest text-white'
                              : 'text-muted hover:text-forest'
                          }`}
                        >
                          {typeOption}
                        </button>
                      ),
                    )}
                  </div>

                  {draft.orderType !== 'Extra Items' && (
                    <div>
                      <label
                        id="order-selected-plan-label"
                        htmlFor="order-selected-plan"
                        className="block text-xs font-medium text-charcoal"
                      >
                        Plan
                      </label>
                      <SelectDropdown
                        id="order-selected-plan"
                        labelId="order-selected-plan-label"
                        value={draft.selectedPlan}
                        options={PLAN_OPTIONS[draft.orderType]}
                        onChange={(nextPlan) => updateDraft({ selectedPlan: nextPlan })}
                        className="mt-1.5"
                      />
                    </div>
                  )}

                  <div>
                    <span className="block text-xs font-medium text-charcoal">Meal</span>
                    <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-full bg-leaf-soft p-1">
                      {(['Lunch', 'Dinner', 'Both'] as MealPreference[]).map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => updateDraft({ mealPreference: pref })}
                          className={`min-h-[34px] rounded-full px-1 text-[11px] font-semibold transition-colors ${
                            draft.mealPreference === pref
                              ? 'bg-surface text-forest shadow-xs'
                              : 'text-muted hover:text-forest'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="order-customer-name"
                        className="block text-xs font-medium text-charcoal"
                      >
                        Customer Name *
                      </label>
                      <input
                        id="order-customer-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={customerName}
                        onChange={(event) => {
                          setCustomerName(event.target.value);
                          if (errors.customerName) {
                            setErrors((prev) => ({ ...prev, customerName: undefined }));
                          }
                        }}
                        placeholder="Your name"
                        className={`mt-1.5 h-10 w-full rounded-xl border bg-surface px-3 text-xs text-charcoal placeholder:text-muted focus:outline-none ${
                          errors.customerName
                            ? 'border-nonveg'
                            : 'border-beige focus:border-forest'
                        }`}
                      />
                      {errors.customerName && (
                        <p role="alert" className="mt-1 text-[11px] text-nonveg">
                          {errors.customerName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="order-phone-number"
                        className="block text-xs font-medium text-charcoal"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="order-phone-number"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={phoneNumber}
                        onChange={(event) => {
                          setPhoneNumber(event.target.value);
                          if (errors.phoneNumber) {
                            setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                          }
                        }}
                        placeholder="10-digit mobile"
                        className={`mt-1.5 h-10 w-full rounded-xl border bg-surface px-3 text-xs text-charcoal tabular-nums placeholder:text-muted focus:outline-none ${
                          errors.phoneNumber
                            ? 'border-nonveg'
                            : 'border-beige focus:border-forest'
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p role="alert" className="mt-1 text-[11px] text-nonveg">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {extraItems.length > 0 || errors.extraItems ? (
                    <div className="border-y border-beige py-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-charcoal">
                          Extras ({extraItems.length})
                        </span>
                        <span className="text-[11px] text-muted">Price on Request</span>
                      </div>
                      {extraItems.length > 0 && (
                        <ul className="mt-1.5 divide-y divide-beige">
                          {extraItems.map((item) => (
                            <li
                              key={item.itemId}
                              className="flex items-center justify-between py-1.5 text-xs"
                            >
                              <span>
                                {item.name}{' '}
                                <span className="text-muted tabular-nums">
                                  ({item.quantity} {item.unitLabel})
                                </span>
                              </span>
                              <button
                                type="button"
                                aria-label={`Remove ${item.name} from order`}
                                onClick={() => removeExtraItem(item.itemId)}
                                className="p-1 text-muted hover:text-nonveg"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {errors.extraItems && (
                        <p role="alert" className="mt-1 text-[11px] text-nonveg">
                          {errors.extraItems}
                        </p>
                      )}
                    </div>
                  ) : null}

                  <div>
                    <label
                      htmlFor="order-special-instructions"
                      className="block text-xs font-medium text-charcoal"
                    >
                      Instructions (optional)
                    </label>
                    <textarea
                      id="order-special-instructions"
                      rows={2}
                      value={specialInstructions}
                      onChange={(event) => setSpecialInstructions(event.target.value)}
                      placeholder="Start date, spice preference..."
                      className="mt-1.5 w-full rounded-xl border border-beige bg-surface px-3 py-2 text-xs text-charcoal placeholder:text-muted focus:border-forest focus:outline-none"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Pinned Footer */}
            <div className="shrink-0 border-t border-beige bg-surface px-5 py-3.5 pb-safe">
              {readyOrder ? (
                <div className="flex flex-col gap-2">
                  <a
                    href={readyOrder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Open WhatsApp &amp; Send Order
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setReadyOrder(null)}
                    className="inline-flex min-h-[38px] w-full items-center justify-center rounded-full border border-beige bg-surface px-4 py-1.5 text-xs font-semibold text-charcoal transition-colors hover:bg-sand"
                  >
                    Edit Details
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  form="whatsapp-order-form"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Generate WhatsApp Order
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
