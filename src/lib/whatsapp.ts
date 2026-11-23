import { SITE_CONFIG } from '../config/site';
import type {
  InquiryFormPayload,
  InquiryValidationErrors,
  OrderFormPayload,
  OrderValidationErrors,
} from '../types';

function extractDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function validateOrderPayload(payload: OrderFormPayload): OrderValidationErrors {
  const errors: OrderValidationErrors = {};

  if (!payload.customerName.trim() || payload.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (at least 2 characters).';
  }

  const digits = extractDigits(payload.phoneNumber);
  if (digits.length < 10 || digits.length > 15) {
    errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
  }

  if (
    payload.orderType === 'Extra Items' &&
    payload.extraItems.length === 0 &&
    !payload.specialInstructions.trim()
  ) {
    errors.extraItems = 'Please select at least one extra item or add a special food request.';
  }

  return errors;
}

export function formatOrderWhatsAppMessage(payload: OrderFormPayload): string {
  const cleanName = payload.customerName.trim();
  const cleanPhone = payload.phoneNumber.trim();
  const cleanInstructions = payload.specialInstructions.trim() || 'None';

  const lines: string[] = [
    'Hello, I would like to place an order.',
    '',
    `Customer Name: ${cleanName}`,
    `Phone Number: ${cleanPhone}`,
    '',
    `Order Type: ${payload.orderType}`,
    '',
    `Selected Plan: ${payload.selectedPlan || 'Custom Extra Items Request'}`,
    '',
    `Meal Preference: ${payload.mealPreference}`,
    '',
    `Food Preference: ${payload.foodPreference}`,
  ];

  if (payload.extraItems.length > 0) {
    lines.push('', 'Additional Items:');
    for (const item of payload.extraItems) {
      lines.push(`- ${item.name}: ${item.quantity} (${item.unitLabel}) — Price on Request`);
    }
  } else {
    lines.push('', 'Additional Items:', '- None');
  }

  lines.push(
    '',
    `Special Instructions: ${cleanInstructions}`,
    '',
    'Please confirm availability and ordering details.',
  );

  return lines.join('\n');
}

export function validateInquiryPayload(payload: InquiryFormPayload): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  if (!payload.customerName.trim() || payload.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your name.';
  }

  const digits = extractDigits(payload.phoneNumber);
  if (digits.length < 10 || digits.length > 15) {
    errors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
  }

  if (!payload.message.trim() || payload.message.trim().length < 5) {
    errors.message = 'Please enter your question or inquiry details.';
  }

  return errors;
}

export function formatInquiryWhatsAppMessage(payload: InquiryFormPayload): string {
  return [
    `Hello ${SITE_CONFIG.brandName}, I have an inquiry.`,
    '',
    `Customer Name: ${payload.customerName.trim()}`,
    `Phone Number: ${payload.phoneNumber.trim()}`,
    `Inquiry Topic: ${payload.topic}`,
    '',
    `Message: ${payload.message.trim()}`,
    '',
    'Please get back to me with details.',
  ].join('\n');
}

export function buildWhatsAppUrl(
  message: string,
  whatsappNumber: string = SITE_CONFIG.whatsappNumber,
): string {
  const sanitizedNumber = extractDigits(whatsappNumber);
  return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
}

export function buildDirectWhatsAppUrl(
  greeting: string = `Hello ${SITE_CONFIG.brandName}, I would like to know more about your daily meals and monthly mess plans.`,
  whatsappNumber: string = SITE_CONFIG.whatsappNumber,
): string {
  return buildWhatsAppUrl(greeting, whatsappNumber);
}
