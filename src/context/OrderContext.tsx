import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { EXTRA_ITEMS_CATALOG } from '../data/menu';
import type { MealPreference, OrderType, SelectedExtraItem } from '../types';

export interface OrderDrawerDraft {
  orderType: OrderType;
  selectedPlan: string;
  mealPreference: MealPreference;
}

interface OrderContextValue {
  isDrawerOpen: boolean;
  draft: OrderDrawerDraft;
  extraItems: SelectedExtraItem[];
  specialInstructions: string;
  totalExtraUnits: number;
  openOrderDrawer: (preset?: Partial<OrderDrawerDraft>) => void;
  closeOrderDrawer: () => void;
  updateDraft: (patch: Partial<OrderDrawerDraft>) => void;
  setExtraItemQuantity: (itemId: string, quantity: number) => void;
  removeExtraItem: (itemId: string) => void;
  clearExtraItems: () => void;
  setSpecialInstructions: (value: string) => void;
}

const DEFAULT_DRAFT: OrderDrawerDraft = {
  orderType: 'Monthly Plan',
  selectedPlan: '2 Meals / Day — Lunch + Dinner (₹5,000/month)',
  mealPreference: 'Both',
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [draft, setDraft] = useState<OrderDrawerDraft>(DEFAULT_DRAFT);
  const [extraItems, setExtraItems] = useState<SelectedExtraItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const openOrderDrawer = useCallback((preset?: Partial<OrderDrawerDraft>) => {
    if (preset) {
      setDraft((prev) => ({ ...prev, ...preset }));
    }
    setIsDrawerOpen(true);
  }, []);

  const closeOrderDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const updateDraft = useCallback((patch: Partial<OrderDrawerDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const setExtraItemQuantity = useCallback((itemId: string, quantity: number) => {
    const catalogItem = EXTRA_ITEMS_CATALOG.find((item) => item.id === itemId);
    if (!catalogItem) return;

    const clamped = Math.max(0, Math.min(catalogItem.maxQuantity, Math.floor(quantity)));

    setExtraItems((prev) => {
      if (clamped === 0) {
        return prev.filter((entry) => entry.itemId !== itemId);
      }

      const existing = prev.find((entry) => entry.itemId === itemId);
      if (existing) {
        return prev.map((entry) =>
          entry.itemId === itemId ? { ...entry, quantity: clamped } : entry,
        );
      }

      return [
        ...prev,
        {
          itemId: catalogItem.id,
          name: catalogItem.name,
          category: catalogItem.category,
          unitLabel: catalogItem.unitLabel,
          quantity: clamped,
        },
      ];
    });
  }, []);

  const removeExtraItem = useCallback((itemId: string) => {
    setExtraItems((prev) => prev.filter((entry) => entry.itemId !== itemId));
  }, []);

  const clearExtraItems = useCallback(() => {
    setExtraItems([]);
  }, []);

  const totalExtraUnits = useMemo(
    () => extraItems.reduce((sum, item) => sum + item.quantity, 0),
    [extraItems],
  );

  const value = useMemo<OrderContextValue>(
    () => ({
      isDrawerOpen,
      draft,
      extraItems,
      specialInstructions,
      totalExtraUnits,
      openOrderDrawer,
      closeOrderDrawer,
      updateDraft,
      setExtraItemQuantity,
      removeExtraItem,
      clearExtraItems,
      setSpecialInstructions,
    }),
    [
      isDrawerOpen,
      draft,
      extraItems,
      specialInstructions,
      totalExtraUnits,
      openOrderDrawer,
      closeOrderDrawer,
      updateDraft,
      setExtraItemQuantity,
      removeExtraItem,
      clearExtraItems,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used inside OrderProvider');
  }
  return ctx;
}
