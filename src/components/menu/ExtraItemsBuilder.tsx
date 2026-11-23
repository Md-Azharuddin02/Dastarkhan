import { useMemo } from 'react';
import { MessageCircle, Minus, Plus, Trash2 } from 'lucide-react';
import { EXTRA_ITEMS_CATALOG } from '../../data/menu';
import { useOrder } from '../../context/OrderContext';
import type { ExtraItemCategory, ExtraItemOption } from '../../types';

const CATEGORY_ORDER: { key: ExtraItemCategory; heading: string }[] = [
  { key: 'roti', heading: 'Roti' },
  { key: 'rice', heading: 'Rice' },
  { key: 'sabji', heading: 'Sabji' },
  { key: 'other', heading: 'Sides' },
];

export function ExtraItemsBuilder() {
  const {
    extraItems,
    specialInstructions,
    setExtraItemQuantity,
    removeExtraItem,
    clearExtraItems,
    setSpecialInstructions,
    openOrderDrawer,
  } = useOrder();

  const quantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of extraItems) {
      map.set(entry.itemId, entry.quantity);
    }
    return map;
  }, [extraItems]);

  const groupedCatalog = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      ...cat,
      items: EXTRA_ITEMS_CATALOG.filter((item) => item.category === cat.key),
    }));
  }, []);

  const handleProceedWithExtras = () => {
    openOrderDrawer({
      orderType: 'Extra Items',
      selectedPlan: 'Extra Food Request',
    });
  };

  const renderItemRow = (item: ExtraItemOption) => {
    const qty = quantityMap.get(item.id) ?? 0;

    return (
      <div
        key={item.id}
        className="flex items-center justify-between gap-3 py-3.5"
      >
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-charcoal">{item.name}</h4>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {item.presets.map((preset) => {
              const active = qty === preset.quantity;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    setExtraItemQuantity(item.id, active ? 0 : preset.quantity)
                  }
                  className={`min-h-[28px] rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-forest text-white'
                      : 'bg-leaf-soft text-charcoal hover:bg-sand'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="inline-flex shrink-0 items-center rounded-full border border-beige bg-surface">
          <button
            type="button"
            aria-label={`Decrease quantity for ${item.name}`}
            onClick={() => setExtraItemQuantity(item.id, qty - 1)}
            disabled={qty === 0}
            className="flex h-8 w-8 items-center justify-center text-charcoal disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <input
            type="number"
            min={0}
            max={item.maxQuantity}
            aria-label={`Custom quantity for ${item.name}`}
            value={qty}
            onChange={(event) => {
              const parsed = Number.parseInt(event.target.value, 10);
              setExtraItemQuantity(item.id, Number.isNaN(parsed) ? 0 : parsed);
            }}
            className="h-8 w-7 bg-transparent text-center text-xs font-semibold text-charcoal tabular-nums focus:outline-none"
          />

          <button
            type="button"
            aria-label={`Increase quantity for ${item.name}`}
            onClick={() => setExtraItemQuantity(item.id, qty + 1)}
            disabled={qty >= item.maxQuantity}
            className="flex h-8 w-8 items-center justify-center text-forest disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="extra-items"
      aria-labelledby="extra-items-heading"
      className="border-t border-beige py-8 sm:py-10"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="extra-items-heading"
          className="heading-section font-serif font-semibold text-forest"
        >
          Extra Items
        </h2>
        <span className="rounded-full bg-saffron-soft px-2.5 py-0.5 text-xs font-medium text-charcoal">
          Price on Request
        </span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 space-y-5 lg:col-span-8">
          {groupedCatalog.map((group) => (
            <div
              key={group.key}
              className="rounded-2xl border border-beige bg-surface px-4 py-3.5 sm:px-5"
            >
              <h3 className="text-xs font-semibold tracking-wide text-fresh">
                {group.heading}
              </h3>
              <div className="mt-1 divide-y divide-beige">
                {group.items.map(renderItemRow)}
              </div>
            </div>
          ))}

          <div className="pt-1">
            <label
              htmlFor="extra-special-instructions"
              className="block text-xs font-semibold text-charcoal"
            >
              Special instructions (optional)
            </label>
            <textarea
              id="extra-special-instructions"
              rows={2}
              value={specialInstructions}
              onChange={(event) => setSpecialInstructions(event.target.value)}
              placeholder="Soft rotis without ghee, less spicy..."
              className="mt-2 w-full rounded-xl border border-beige bg-surface px-3.5 py-2.5 text-xs text-charcoal placeholder:text-muted focus:border-forest focus:outline-none"
            />
          </div>
        </div>

        {/* Summary Panel */}
        <aside
          aria-label="Selected extra items summary"
          className="min-w-0 rounded-2xl border border-beige bg-surface p-5 lg:sticky lg:top-20 lg:col-span-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-forest">
              Extras ({extraItems.length})
            </h3>
            {extraItems.length > 0 && (
              <button
                type="button"
                onClick={clearExtraItems}
                className="text-xs font-medium text-muted hover:text-nonveg"
              >
                Clear
              </button>
            )}
          </div>

          {extraItems.length === 0 ? (
            <p className="py-5 text-xs text-muted">
              Tap + to add extra rotis, rice, or sabji.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-beige">
              {extraItems.map((entry) => (
                <li
                  key={entry.itemId}
                  className="flex items-center justify-between gap-2 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-charcoal">
                      {entry.name}
                    </p>
                    <p className="text-[11px] text-muted tabular-nums">
                      {entry.quantity} {entry.unitLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${entry.name}`}
                    onClick={() => removeExtraItem(entry.itemId)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-sand hover:text-nonveg"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={handleProceedWithExtras}
            className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white active:scale-[0.98]"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Request on WhatsApp
          </button>
        </aside>
      </div>
    </section>
  );
}
