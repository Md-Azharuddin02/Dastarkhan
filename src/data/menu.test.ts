import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONFIG } from '../config/site';
import { EXTRA_ITEMS_CATALOG, WEEKLY_MENU } from './menu';
import { PRICING_PLANS } from './pricing';

test('WEEKLY_MENU covers all 7 days matching the Dastarkhān Tiffin Services schedule', () => {
  assert.equal(WEEKLY_MENU.length, 7);

  const dayKeys = WEEKLY_MENU.map((d) => d.day);
  assert.deepEqual(dayKeys, [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]);

  let nonVegDayCount = 0;
  for (const day of WEEKLY_MENU) {
    assert.ok(day.lunch.length > 0, `${day.label} should have lunch meals`);
    assert.ok(day.dinner.length > 0, `${day.label} should have dinner meals`);

    const hasAnyNonVeg =
      day.lunch.some((m) => m.diet === 'non-veg') ||
      day.dinner.some((m) => m.diet === 'non-veg');
    assert.equal(day.hasNonVeg, hasAnyNonVeg, `${day.label} hasNonVeg flag must match meals`);
    if (hasAnyNonVeg) nonVegDayCount += 1;
  }

  // Mon (Egg), Wed (Chicken), Fri (Chicken Biryani), Sat (Egg), Sun (Chicken)
  assert.equal(nonVegDayCount, 5);
  assert.equal(WEEKLY_MENU[0].lunch[0].name, 'Curry Badi');
  assert.equal(WEEKLY_MENU[3].lunch[0].name, 'Soyabean Curry');
  assert.equal(WEEKLY_MENU[0].dinner[0].name, 'Egg Curry');
  assert.equal(WEEKLY_MENU[1].dinner[0].name, 'Veg Mix Paneer Rice');
  assert.equal(WEEKLY_MENU[4].lunch[0].name, 'Veg Mix Paneer Rice');
  assert.ok(WEEKLY_MENU[6].lunch[0].items.includes('Jeera Rice'));
  assert.equal(WEEKLY_MENU[4].dinner[0].name, 'Chicken Biryani');
  assert.ok(WEEKLY_MENU[4].dinner[0].items.includes('Gulab Jamun (1)'));
  assert.equal(WEEKLY_MENU[6].lunch[0].name, 'Rajma Curry');
  assert.equal(WEEKLY_MENU[6].dinner[0].name, 'Chicken Curry');
});

test('SITE_CONFIG matches Dastarkhān Tiffin Services branding, phone, and service areas', () => {
  assert.equal(SITE_CONFIG.brandName, 'Dastarkhān Tiffin Services');
  assert.equal(SITE_CONFIG.whatsappNumber, '918750606581');
  assert.equal(SITE_CONFIG.displayPhone, '+91 8750606581');
  assert.match(SITE_CONFIG.address.line1, /Okhla/);
  assert.match(SITE_CONFIG.address.line1, /Shaheen Bagh/);
  assert.match(SITE_CONFIG.address.line1, /Zakir Nagar/);
  assert.match(SITE_CONFIG.address.line2, /Batla House/);
  assert.match(SITE_CONFIG.address.line2, /Abul Fazal/);
});

test('EXTRA_ITEMS_CATALOG covers roti, rice, sabji, and other categories with Price on Request', () => {
  const categories = new Set(EXTRA_ITEMS_CATALOG.map((item) => item.category));
  assert.deepEqual(categories, new Set(['roti', 'rice', 'sabji', 'other']));

  for (const item of EXTRA_ITEMS_CATALOG) {
    assert.equal(item.priceNote, 'Price on Request');
  }
});

test('PRICING_PLANS match exact Dastarkhān rates (₹3,000 / ₹5,000 / Trial)', () => {
  assert.equal(PRICING_PLANS.length, 3);
  const oneMeal = PRICING_PLANS.find((p) => p.id === 'lunch-only');
  const twoMeals = PRICING_PLANS.find((p) => p.id === 'lunch-dinner');
  const trialMeal = PRICING_PLANS.find((p) => p.id === 'trial-meal');

  assert.equal(oneMeal?.name, '1 Meal / Day');
  assert.equal(oneMeal?.priceLabel, '₹3,000');
  assert.equal(twoMeals?.name, '2 Meals / Day');
  assert.equal(twoMeals?.priceLabel, '₹5,000');
  assert.equal(trialMeal?.priceLabel, '₹100');
  assert.match(trialMeal?.secondaryPriceLabel ?? '', /₹150/);
});
