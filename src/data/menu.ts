import { SITE_CONFIG, SITE_IMAGES } from '../config/site';
import type { DayMealSchedule, ExtraItemOption } from '../types';

/**
 * Weekly Meal Plan — Dastarkhān Tiffin Services.
 *
 * Mon: Lunch Curry Badi (Veg) | Dinner Egg Curry (Non-Veg)
 * Tue: Lunch Aloo Tahri (Veg) | Dinner Veg Mix Paneer Rice + Masala Chana Dal (Veg)
 * Wed: Lunch Chicken Curry (Non-Veg) | Dinner Chholey Masala (Veg)
 * Thu: Lunch Soyabean Curry (Veg) | Dinner Aloo Tahri (Veg)
 * Fri: Lunch Veg Mix Paneer Rice + Masala Chana Dal (Veg) | Dinner Chicken Biryani (Non-Veg)
 * Sat: Lunch Egg Curry (Non-Veg) | Dinner Seasonal Veg + Daal (Veg)
 * Sun: Lunch Rajma Curry (Veg) | Dinner Chicken Curry (Non-Veg)
 */
export const WEEKLY_MENU: DayMealSchedule[] = [
  {
    day: 'monday',
    label: 'Monday',
    shortLabel: 'Mon',
    hasNonVeg: true,
    lunch: [
      {
        id: 'mon-lunch-veg',
        name: 'Curry Badi',
        diet: 'veg',
        items: ['Curry Badi', 'Rice', 'Roti (2)'],
        description:
          'Traditional homestyle curry badi served warm with steamed rice and 2 soft rotis.',
        image: SITE_IMAGES.heroThali,
        imageAlt: 'Monday lunch featuring homestyle Curry Badi with rice and 2 rotis',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'mon-dinner-nonveg',
        name: 'Egg Curry',
        diet: 'non-veg',
        items: ['Egg Curry', 'Rice', 'Roti (2)', 'Salad'],
        description:
          'Slow-simmered homestyle egg curry paired with steamed rice, 2 soft rotis, and fresh salad.',
        image: SITE_IMAGES.eggCurry,
        imageAlt: 'Monday dinner featuring homestyle Egg Curry with rice, 2 rotis, and salad',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
  {
    day: 'tuesday',
    label: 'Tuesday',
    shortLabel: 'Tue',
    hasNonVeg: false,
    lunch: [
      {
        id: 'tue-lunch-veg',
        name: 'Aloo Tahri',
        diet: 'veg',
        items: ['Aloo Tahri', 'Raita', 'Salad'],
        description:
          'Aromatic spiced potato tahri served with cooling raita and crisp seasonal salad.',
        image: SITE_IMAGES.vegPaneer,
        imageAlt: 'Tuesday lunch featuring fragrant Aloo Tahri served with raita and salad',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'tue-dinner-veg',
        name: 'Veg Mix Paneer Rice',
        diet: 'veg',
        items: ['Veg Mix Paneer Rice', 'Masala Chana Dal', 'Roti (2)'],
        description:
          'Veg mix paneer rice paired with flavorful masala chana dal and 2 fresh rotis.',
        image: SITE_IMAGES.rajmaChole,
        imageAlt: 'Tuesday dinner with veg mix paneer rice, Masala Chana Dal, and 2 rotis',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
  {
    day: 'wednesday',
    label: 'Wednesday',
    shortLabel: 'Wed',
    hasNonVeg: true,
    lunch: [
      {
        id: 'wed-lunch-nonveg',
        name: 'Chicken Curry',
        diet: 'non-veg',
        items: ['Chicken Curry', 'Rice', 'Roti (2)', 'Salad'],
        description:
          'Tender home-style chicken curry served with steamed rice, 2 soft rotis, and salad.',
        image: SITE_IMAGES.chickenCurry,
        imageAlt: 'Wednesday lunch featuring homestyle Chicken Curry with rice, 2 rotis, and salad',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'wed-dinner-veg',
        name: 'Chholey Masala',
        diet: 'veg',
        items: ['Chholey Masala', 'Rice', 'Roti (2)'],
        description:
          'Rich homestyle chholey masala served with steamed rice and 2 soft rotis.',
        image: SITE_IMAGES.rajmaChole,
        imageAlt: 'Wednesday dinner featuring Chholey Masala with rice and 2 soft rotis',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
  {
    day: 'thursday',
    label: 'Thursday',
    shortLabel: 'Thu',
    hasNonVeg: false,
    lunch: [
      {
        id: 'thu-lunch-veg',
        name: 'Soyabean Curry',
        diet: 'veg',
        items: ['Soyabean Curry', 'Rice', 'Roti (2)'],
        description:
          'Home-style soyabean curry served with steamed rice and 2 soft rotis.',
        image: SITE_IMAGES.heroThali,
        imageAlt: 'Thursday lunch featuring Soyabean Curry with rice and 2 soft rotis',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'thu-dinner-veg',
        name: 'Aloo Tahri',
        diet: 'veg',
        items: ['Aloo Tahri', 'Raita', 'Salad'],
        description:
          'Comforting homemade aloo tahri served with fresh raita and seasonal salad.',
        image: SITE_IMAGES.vegPaneer,
        imageAlt: 'Thursday dinner featuring homemade Aloo Tahri with raita and salad',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
  {
    day: 'friday',
    label: 'Friday',
    shortLabel: 'Fri',
    hasNonVeg: true,
    lunch: [
      {
        id: 'fri-lunch-veg',
        name: 'Veg Mix Paneer Rice',
        diet: 'veg',
        items: ['Veg Mix Paneer Rice', 'Masala Chana Dal', 'Roti (2)'],
        description:
          'Veg mix paneer rice paired with spiced masala chana dal and 2 soft rotis.',
        image: SITE_IMAGES.rajmaChole,
        imageAlt: 'Friday lunch with veg mix paneer rice, Masala Chana Dal, and 2 rotis',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'fri-dinner-nonveg',
        name: 'Chicken Biryani',
        diet: 'non-veg',
        items: ['Chicken Biryani', 'Raita', 'Gulab Jamun (1)', 'Salad'],
        description:
          'Friday special homemade chicken biryani served with raita, 1 gulab jamun, and fresh salad.',
        image: SITE_IMAGES.chickenCurry,
        imageAlt: 'Friday dinner featuring special Chicken Biryani with raita, gulab jamun, and salad',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
  {
    day: 'saturday',
    label: 'Saturday',
    shortLabel: 'Sat',
    hasNonVeg: true,
    lunch: [
      {
        id: 'sat-lunch-nonveg',
        name: 'Egg Curry',
        diet: 'non-veg',
        items: ['Egg Curry', 'Rice', 'Roti (2)', 'Salad'],
        description:
          'Homestyle egg curry with steamed rice, 2 soft rotis, and fresh salad. (Closed on the last Saturday of every month.)',
        image: SITE_IMAGES.eggCurry,
        imageAlt: 'Saturday lunch featuring Egg Curry with rice, 2 rotis, and salad',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'sat-dinner-veg',
        name: 'Seasonal Veg',
        diet: 'veg',
        items: ['Seasonal Veg', 'Daal', 'Rice', 'Roti (2)'],
        description:
          'Fresh seasonal vegetable sabji served with homemade daal, steamed rice, and 2 rotis.',
        image: SITE_IMAGES.heroThali,
        imageAlt: 'Saturday dinner featuring Seasonal Veg, daal, steamed rice, and 2 soft rotis',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
  {
    day: 'sunday',
    label: 'Sunday',
    shortLabel: 'Sun',
    hasNonVeg: true,
    lunch: [
      {
        id: 'sun-lunch-veg',
        name: 'Rajma Curry',
        diet: 'veg',
        items: ['Rajma Curry', 'Jeera Rice', 'Roti (2)'],
        description:
          'Slow-cooked Sunday rajma curry paired with fragrant jeera rice and 2 soft rotis.',
        image: SITE_IMAGES.rajmaChole,
        imageAlt: 'Sunday lunch featuring Rajma Curry with jeera rice and 2 rotis',
        servingWindow: SITE_CONFIG.hours.lunch,
      },
    ],
    dinner: [
      {
        id: 'sun-dinner-nonveg',
        name: 'Chicken Curry',
        diet: 'non-veg',
        items: ['Chicken Curry', 'Rice', 'Roti (2)', 'Salad'],
        description:
          'Sunday special homestyle chicken curry served with steamed rice, 2 soft rotis, and fresh salad.',
        image: SITE_IMAGES.chickenCurry,
        imageAlt: 'Sunday dinner featuring homestyle Chicken Curry with rice, 2 rotis, and salad',
        servingWindow: SITE_CONFIG.hours.dinner,
      },
    ],
  },
];

/**
 * Centralized Extra Items customization options.
 * Pricing is intentionally set to "Price on Request" until confirmed by the owner.
 */
export const EXTRA_ITEMS_CATALOG: ExtraItemOption[] = [
  {
    id: 'extra-roti',
    category: 'roti',
    categoryLabel: 'Extra Roti',
    name: 'Whole-Wheat Tawa Roti',
    unitLabel: 'Rotis',
    presets: [
      { label: '+2 Rotis', quantity: 2 },
      { label: '+4 Rotis', quantity: 4 },
    ],
    maxQuantity: 20,
    priceNote: 'Price on Request',
  },
  {
    id: 'extra-rice',
    category: 'rice',
    categoryLabel: 'Extra Rice',
    name: 'Steamed Rice Portion',
    unitLabel: 'Half-Portions',
    presets: [
      { label: 'Half Portion', quantity: 1 },
      { label: 'Full Portion', quantity: 2 },
    ],
    maxQuantity: 10,
    priceNote: 'Price on Request',
  },
  {
    id: 'extra-seasonal-sabji',
    category: 'sabji',
    categoryLabel: 'Extra Sabji',
    name: 'Seasonal Sabji (Bowl)',
    unitLabel: 'Bowls',
    presets: [
      { label: '1 Bowl', quantity: 1 },
      { label: '2 Bowls', quantity: 2 },
    ],
    maxQuantity: 10,
    priceNote: 'Price on Request',
  },
  {
    id: 'extra-paneer-sabji',
    category: 'sabji',
    categoryLabel: 'Extra Sabji',
    name: 'Paneer Sabji (Bowl)',
    unitLabel: 'Bowls',
    presets: [
      { label: '1 Bowl', quantity: 1 },
      { label: '2 Bowls', quantity: 2 },
    ],
    maxQuantity: 10,
    priceNote: 'Price on Request',
  },
  {
    id: 'extra-dal',
    category: 'other',
    categoryLabel: 'Other Requests',
    name: 'Extra Daal',
    unitLabel: 'Bowls',
    presets: [{ label: '1 Bowl', quantity: 1 }],
    maxQuantity: 10,
    priceNote: 'Price on Request',
  },
  {
    id: 'extra-salad',
    category: 'other',
    categoryLabel: 'Other Requests',
    name: 'Fresh Seasonal Salad',
    unitLabel: 'Plates',
    presets: [{ label: '1 Plate', quantity: 1 }],
    maxQuantity: 10,
    priceNote: 'Price on Request',
  },
  {
    id: 'extra-curd',
    category: 'other',
    categoryLabel: 'Other Requests',
    name: 'Fresh Raita / Curd',
    unitLabel: 'Bowls',
    presets: [{ label: '1 Bowl', quantity: 1 }],
    maxQuantity: 10,
    priceNote: 'Price on Request',
  },
];

export function getMenuForDay(dayKey: DayMealSchedule['day']): DayMealSchedule {
  return WEEKLY_MENU.find((d) => d.day === dayKey) ?? WEEKLY_MENU[0];
}
