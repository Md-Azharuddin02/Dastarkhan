export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type DietType = 'veg' | 'non-veg';

export type MealSlot = 'lunch' | 'dinner';

export interface MealOption {
  id: string;
  name: string;
  diet: DietType;
  items: string[];
  description: string;
  image: string;
  imageAlt: string;
  servingWindow: string;
}

export interface DayMealSchedule {
  day: DayKey;
  label: string;
  shortLabel: string;
  hasNonVeg: boolean;
  lunch: MealOption[];
  dinner: MealOption[];
}

export type PlanId = 'lunch-only' | 'lunch-dinner' | 'trial-meal';

export interface PricingPlan {
  id: PlanId;
  name: string;
  subtitle: string;
  priceLabel: string;
  pricePeriod: string;
  secondaryPriceLabel?: string;
  featured?: boolean;
  ctaLabel: string;
  defaultMealPreference: MealPreference;
  features: string[];
  note: string;
}

export type ExtraItemCategory = 'roti' | 'rice' | 'sabji' | 'other';

export interface ExtraItemOption {
  id: string;
  category: ExtraItemCategory;
  categoryLabel: string;
  name: string;
  unitLabel: string;
  presets: { label: string; quantity: number }[];
  maxQuantity: number;
  priceNote: string;
}

export interface SelectedExtraItem {
  itemId: string;
  name: string;
  category: ExtraItemCategory;
  unitLabel: string;
  quantity: number;
}

export type OrderType = 'Monthly Plan' | 'Trial Meal' | 'Extra Items';
export type MealPreference = 'Lunch' | 'Dinner' | 'Both';
export type FoodPreference = 'Veg' | 'Non-Veg';

export interface OrderFormPayload {
  customerName: string;
  phoneNumber: string;
  orderType: OrderType;
  selectedPlan: string;
  mealPreference: MealPreference;
  foodPreference: FoodPreference;
  extraItems: SelectedExtraItem[];
  specialInstructions: string;
}

export interface OrderValidationErrors {
  customerName?: string;
  phoneNumber?: string;
  extraItems?: string;
}

export interface InquiryFormPayload {
  customerName: string;
  phoneNumber: string;
  topic: string;
  message: string;
}

export interface InquiryValidationErrors {
  customerName?: string;
  phoneNumber?: string;
  message?: string;
}

export interface ServiceOffering {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  highlightNote: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  orderPreset: {
    orderType: OrderType;
    selectedPlan: string;
    mealPreference: MealPreference;
    foodPreference: FoodPreference;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
