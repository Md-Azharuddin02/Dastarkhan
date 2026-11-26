import { SITE_IMAGES } from '../config/site';
import type { FaqItem, ServiceOffering } from '../types';

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: 'monthly-lunch',
    number: '01',
    title: '1 Meal / Day Plan (Lunch or Dinner)',
    summary:
      'One freshly cooked homemade tiffin every day—choose Lunch or Dinner for ₹3,000/month.',
    details: [
      'Choose either daily Lunch (12:30–2:30 PM) or daily Dinner (8:00–10:00 PM)',
      'On-time delivery across Okhla, Shaheen Bagh, Zakir Nagar, Batla House & Abul Fazal',
      'Seven-day schedule with one monthly holiday on the last Saturday',
    ],
    highlightNote: '₹3,000/month',
    image: SITE_IMAGES.heroThali,
    imageAlt: 'Daily home-style tiffin meal served under the 1 Meal / Day monthly subscription',
    ctaLabel: 'Subscribe 1 Meal Plan',
    orderPreset: {
      orderType: 'Monthly Plan',
      selectedPlan: '1 Meal / Day — Lunch or Dinner (₹3,000/month)',
      mealPreference: 'Lunch',
    },
  },
  {
    id: 'monthly-lunch-dinner',
    number: '02',
    title: '2 Meals / Day Plan (Lunch + Dinner)',
    summary:
      'Complete daily homemade Lunch and Dinner delivery for students and working professionals at ₹5,000/month.',
    details: [
      'Both Lunch and Dinner delivered fresh every day',
      'Full Monday–Sunday rotating menu including Friday Chicken Biryani & Gulab Jamun',
      'Nutritious, balanced portions cooked with quality ingredients',
    ],
    highlightNote: '₹5,000/month',
    image: SITE_IMAGES.vegPaneer,
    imageAlt: 'Homemade lunch and dinner tiffin meals included in the 2 Meals / Day subscription',
    ctaLabel: 'Subscribe 2 Meals Plan',
    orderPreset: {
      orderType: 'Monthly Plan',
      selectedPlan: '2 Meals / Day — Lunch + Dinner (₹5,000/month)',
      mealPreference: 'Both',
    },
  },
  {
    id: 'single-trial-meals',
    number: '03',
    title: 'Trial Meals Available',
    summary:
      'Taste our home-style cooking and hygienic preparation firsthand before subscribing.',
    details: [
      'Vegetarian Trial Meal at ₹100 · Non-Vegetarian Trial Meal at ₹150',
      'Cooked in the exact same homemade batch delivered to monthly subscribers',
      'No subscription commitment required',
    ],
    highlightNote: '₹100 Veg · ₹150 Non-Veg',
    image: SITE_IMAGES.rajmaChole,
    imageAlt: 'Single homemade trial meal with rajma curry, steamed rice, and soft rotis',
    ctaLabel: 'Order Trial Meal',
    orderPreset: {
      orderType: 'Trial Meal',
      selectedPlan: 'Trial Meal (₹100 Veg)',
      mealPreference: 'Lunch',
    },
  },
  {
    id: 'vegetarian-meals',
    number: '04',
    title: 'Wholesome Vegetarian Meals',
    summary:
      'Comforting everyday vegetarian dishes including Soyabean Curry, Aloo Tahri, Masala Chana Dal, Chholey Masala, Curry Badi, and Rajma.',
    details: [
      'Fresh seasonal vegetables, daal, veg mix paneer rice, raita, and soft rotis',
      'Balanced everyday spice level suitable for daily consumption',
      'Prepared hygienically with fresh & quality ingredients',
    ],
    highlightNote: 'Daily Rotation',
    image: SITE_IMAGES.vegPaneer,
    imageAlt: 'Fresh vegetarian tiffin meal with paneer rice, masala chana dal, and rotis',
    ctaLabel: 'Inquire for Veg Meals',
    orderPreset: {
      orderType: 'Monthly Plan',
      selectedPlan: '2 Meals / Day — Lunch + Dinner (₹5,000/month)',
      mealPreference: 'Both',
    },
  },
  {
    id: 'non-vegetarian-meals',
    number: '05',
    title: 'Chicken & Egg Specials',
    summary:
      'Homestyle Chicken Curry, Friday Chicken Biryani with Gulab Jamun, and Egg Curry built right into the weekly menu.',
    details: [
      'Chicken Curry (Wed Lunch & Sun Dinner) and Chicken Biryani (Fri Dinner)',
      'Homestyle Egg Curry served on Monday Dinner and Saturday Lunch',
      'Included directly in monthly plans at no extra subscription fee',
    ],
    highlightNote: 'Chicken & Egg Menu',
    image: SITE_IMAGES.chickenCurry,
    imageAlt: 'Home-style chicken curry served with steamed rice, soft rotis, and fresh salad',
    ctaLabel: 'Order Non-Veg Trial',
    orderPreset: {
      orderType: 'Trial Meal',
      selectedPlan: 'Trial Meal (₹150 Non-Veg)',
      mealPreference: 'Dinner',
    },
  },
  {
    id: 'extra-food-customization',
    number: '06',
    title: 'Extra Food Requests & Custom Add-Ons',
    summary:
      'Need extra rotis, rice, daal, raita, or sabji with your tiffin? Request add-ons directly on WhatsApp.',
    details: [
      'Add extra rotis (+2, +4, or custom count), extra rice, sabji, daal, salad, or raita',
      'Include preparation notes (less spicy, less oil) with your order',
      'Confirmed transparently on WhatsApp (Price on Request)',
    ],
    highlightNote: 'Price on Request',
    image: SITE_IMAGES.kitchenPrep,
    imageAlt: 'Clean kitchen counter prepared for custom homemade tiffin add-ons',
    ctaLabel: 'Request Extra Items',
    orderPreset: {
      orderType: 'Extra Items',
      selectedPlan: 'Extra Food Request',
      mealPreference: 'Lunch',
    },
  },
];

export const SERVICE_FAQS: FaqItem[] = [
  {
    id: 'faq-areas',
    question: 'Which areas do you deliver tiffins to?',
    answer:
      'Dastarkhān Tiffin Services delivers daily across Okhla, Shaheen Bagh, Zakir Nagar, Batla House, Abul Fazal, and nearby areas in New Delhi. Message us on WhatsApp to confirm your exact address.',
  },
  {
    id: 'faq-nonveg',
    question: 'Which days include Chicken and Egg dishes?',
    answer:
      'Our weekly menu features Egg Curry on Monday Dinner and Saturday Lunch, Chicken Curry on Wednesday Lunch and Sunday Dinner, and Chicken Biryani with Raita & Gulab Jamun on Friday Dinner.',
  },
  {
    id: 'faq-plans',
    question: 'Can I choose Dinner only on the ₹3,000/month plan?',
    answer:
      'Yes. Our 1 Meal / Day plan (₹3,000/month) lets you choose either daily Lunch or daily Dinner. For both daily Lunch and Dinner, choose the 2 Meals / Day plan at ₹5,000/month.',
  },
  {
    id: 'faq-holiday',
    question: 'When is the monthly holiday?',
    answer:
      'We deliver seven days a week except for one scheduled monthly holiday on the last Saturday of every month. The next holiday date is always shown on our Menu page.',
  },
  {
    id: 'faq-confirm',
    question: 'How do I subscribe or book a trial meal?',
    answer:
      'Tap any order button to open a pre-filled WhatsApp message to +91 8750606581. Your trial meal or monthly subscription starts as soon as our team confirms your delivery slot on WhatsApp.',
  },
];
