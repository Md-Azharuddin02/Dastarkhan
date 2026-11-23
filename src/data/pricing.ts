import type { PricingPlan } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lunch-only',
    name: '1 Meal / Day',
    subtitle: 'Lunch or Dinner · Delivered daily',
    priceLabel: '₹3,000',
    pricePeriod: '/month',
    ctaLabel: 'Choose 1 Meal Plan',
    defaultMealPreference: 'Lunch',
    features: [
      'Choose daily Lunch or daily Dinner',
      'On-time delivery across Okhla & nearby areas',
      'Balanced weekly menu with veg & non-veg specials',
      'Option to add extra rotis, rice, or sabji on request',
    ],
    note: 'Closed on the last Saturday of every month.',
  },
  {
    id: 'lunch-dinner',
    name: '2 Meals / Day',
    subtitle: 'Lunch + Dinner · Complete daily tiffin',
    priceLabel: '₹5,000',
    pricePeriod: '/month',
    featured: true,
    ctaLabel: 'Choose 2 Meals Plan',
    defaultMealPreference: 'Both',
    features: [
      'Fresh homemade Lunch & Dinner delivered daily',
      'Full 7-day rotating menu with Chicken & Egg specials',
      'Friday special Chicken Biryani with Gulab Jamun',
      'Flexible extra food item requests via WhatsApp',
    ],
    note: 'Most popular monthly plan · Closed on the last Saturday of every month.',
  },
  {
    id: 'trial-meal',
    name: 'Trial Meal',
    subtitle: 'Taste our homemade quality before subscribing',
    priceLabel: '₹100',
    pricePeriod: '/meal (Veg)',
    secondaryPriceLabel: '₹150 /meal (Non-Veg)',
    ctaLabel: 'Book a Trial Meal',
    defaultMealPreference: 'Lunch',
    features: [
      'Vegetarian Trial Meal: ₹100 per meal',
      'Non-Vegetarian Trial Meal: ₹150 per meal',
      'Same fresh homemade batch served to subscribers',
      'No monthly commitment required',
    ],
    note: 'Trial meal available daily. Confirm availability on WhatsApp.',
  },
];
