import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  formatInquiryWhatsAppMessage,
  formatOrderWhatsAppMessage,
  validateInquiryPayload,
  validateOrderPayload,
} from './whatsapp';
import type { OrderFormPayload } from '../types';

const SAMPLE_ORDER: OrderFormPayload = {
  customerName: 'Aarav Kulkarni',
  phoneNumber: '8750606581',
  orderType: 'Monthly Plan',
  selectedPlan: '2 Meals / Day — Lunch + Dinner (₹5,000/month)',
  mealPreference: 'Both',
  foodPreference: 'Veg',
  extraItems: [
    {
      itemId: 'extra-roti',
      name: 'Whole-Wheat Tawa Roti',
      category: 'roti',
      unitLabel: 'Rotis',
      quantity: 4,
    },
    {
      itemId: 'extra-curd',
      name: 'Fresh Raita / Curd',
      category: 'other',
      unitLabel: 'Bowls',
      quantity: 1,
    },
  ],
  specialInstructions: 'Less spicy dal please',
};

test('validateOrderPayload rejects missing name, short phone, and empty extra-items order', () => {
  const emptyErrors = validateOrderPayload({
    ...SAMPLE_ORDER,
    customerName: ' ',
    phoneNumber: '12345',
  });
  assert.ok(emptyErrors.customerName);
  assert.ok(emptyErrors.phoneNumber);

  const extraItemsErrors = validateOrderPayload({
    ...SAMPLE_ORDER,
    orderType: 'Extra Items',
    extraItems: [],
    specialInstructions: '',
  });
  assert.ok(extraItemsErrors.extraItems);

  const validErrors = validateOrderPayload(SAMPLE_ORDER);
  assert.deepEqual(validErrors, {});
});

test('formatOrderWhatsAppMessage includes all required sections and extra items', () => {
  const msg = formatOrderWhatsAppMessage(SAMPLE_ORDER);
  assert.match(msg, /Hello, I would like to place an order\./);
  assert.match(msg, /Customer Name: Aarav Kulkarni/);
  assert.match(msg, /Phone Number: 8750606581/);
  assert.match(msg, /Order Type: Monthly Plan/);
  assert.match(msg, /Selected Plan: 2 Meals \/ Day — Lunch \+ Dinner \(₹5,000\/month\)/);
  assert.match(msg, /Meal Preference: Both/);
  assert.match(msg, /Food Preference: Veg/);
  assert.match(msg, /- Whole-Wheat Tawa Roti: 4 \(Rotis\) — Price on Request/);
  assert.match(msg, /- Fresh Raita \/ Curd: 1 \(Bowls\) — Price on Request/);
  assert.match(msg, /Special Instructions: Less spicy dal please/);
  assert.match(msg, /Please confirm availability and ordering details\./);
});

test('trial orders omit the separate food preference', () => {
  const msg = formatOrderWhatsAppMessage({
    ...SAMPLE_ORDER,
    orderType: 'Trial Meal',
    selectedPlan: 'Trial Meal (₹150 Non-Veg)',
  });
  assert.doesNotMatch(msg, /Food Preference/);
  assert.match(msg, /Trial Meal \(₹150 Non-Veg\)/);
});

test('buildWhatsAppUrl creates properly encoded wa.me URL', () => {
  const msg = formatOrderWhatsAppMessage(SAMPLE_ORDER);
  const url = buildWhatsAppUrl(msg, '+91 8750606581');
  assert.ok(url.startsWith('https://wa.me/918750606581?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.equal(decoded, msg);
});

test('validateInquiryPayload and formatInquiryWhatsAppMessage work cleanly', () => {
  const invalid = validateInquiryPayload({
    customerName: '',
    phoneNumber: '999',
    topic: 'Trial Meal',
    message: 'Hi',
  });
  assert.ok(invalid.customerName);
  assert.ok(invalid.phoneNumber);
  assert.ok(invalid.message);

  const valid = validateInquiryPayload({
    customerName: 'Sneha Patil',
    phoneNumber: '9822012345',
    topic: 'Single Trial Meal',
    message: 'Can I visit for lunch trial tomorrow at 1 PM?',
  });
  assert.deepEqual(valid, {});

  const text = formatInquiryWhatsAppMessage({
    customerName: 'Sneha Patil',
    phoneNumber: '9822012345',
    topic: 'Single Trial Meal',
    message: 'Can I visit for lunch trial tomorrow at 1 PM?',
  });
  assert.match(text, /Customer Name: Sneha Patil/);
  assert.match(text, /Inquiry Topic: Single Trial Meal/);
  assert.match(text, /Can I visit for lunch trial tomorrow at 1 PM\?/);
});
