export const SITE_IMAGES = {
  heroThali: '/src/assets/images/hero_thali_editorial_1795200442468.jpg',
  vegPaneer: '/src/assets/images/dish_paneer_thali_1795200430791.jpg',
  chickenCurry: '/src/assets/images/dish_chicken_curry_1795200442765.jpg',
  rajmaChole: '/src/assets/images/dish_rajma_rice_1795200428467.jpg',
  eggCurry: '/src/assets/images/dish_egg_curry_1795200427867.jpg',
  kitchenPrep: '/src/assets/images/kitchen_fresh_prep_1795200428890.jpg',
} as const;

export const SITE_CONFIG = {
  brandName: 'Dastarkhān Tiffin Services',
  tagline: 'The taste of home made meals everyday.',
  description:
    'Delicious homemade meals delivered daily across Okhla, Shaheen Bagh, Zakir Nagar, Batla House, and Abul Fazal. Monthly plans from ₹3,000/month and trial meals available.',

  /**
   * Centralized Owner WhatsApp configuration.
   * Country code + 10-digit number (no '+' or spaces).
   */
  whatsappNumber: '918750606581',
  displayPhone: '+91 8750606581',
  email: 'orders@dastarkhantiffin.example',

  /** Centralized delivery coverage & service area details. */
  address: {
    line1: 'Okhla · Shaheen Bagh · Zakir Nagar',
    line2: 'Batla House · Abul Fazal & Nearby Areas',
    landmark: 'On-time daily tiffin delivery across Okhla & nearby areas, New Delhi',
  },

  /** Configurable daily operating windows. */
  hours: {
    lunch: '12:30 PM – 2:30 PM',
    dinner: '8:00 PM – 10:00 PM',
    whatsappDesk: '8:30 AM – 9:30 PM',
    scheduleSummary: 'Open 7 days a week (closed on the last Saturday of every month)',
  },

  holidayRule: {
    title: 'Monthly Holiday Schedule',
    shortRule: 'Last Saturday of every month',
    detail:
      'We deliver all seven days of the week, with one scheduled monthly holiday on the last Saturday of every month. No regular lunch or dinner service is provided on that day.',
  },

  nonVegDaysSummary: 'Chicken (Wed, Fri, Sun) & Egg Curry (Mon, Sat)',

  orderConfirmationNotice:
    'Orders and monthly subscriptions are confirmed directly after our team replies to your WhatsApp message.',
} as const;
