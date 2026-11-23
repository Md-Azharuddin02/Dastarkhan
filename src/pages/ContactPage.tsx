import React, { useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../lib/router';
import {
  buildDirectWhatsAppUrl,
  buildWhatsAppUrl,
  formatInquiryWhatsAppMessage,
  validateInquiryPayload,
} from '../lib/whatsapp';
import { SelectDropdown, type SelectOption } from '../components/common/SelectDropdown';
import type { InquiryValidationErrors } from '../types';

const INQUIRY_TOPICS: readonly SelectOption[] = [
  { value: '1 Meal / Day — Lunch or Dinner (₹3,000/mo)', label: '1 Meal / Day (Lunch or Dinner)', detail: '₹3,000/mo' },
  { value: '2 Meals / Day — Lunch + Dinner (₹5,000/mo)', label: '2 Meals / Day (Lunch + Dinner)', detail: '₹5,000/mo' },
  { value: 'Single Trial Meal', label: 'Single Trial Meal', detail: '₹100 / ₹150' },
  { value: 'Extra Food Item Rates', label: 'Extra Food Item Rates', detail: 'On request' },
  { value: 'Delivery Areas & Timings', label: 'Delivery Areas & Timings' },
];

export default function ContactPage() {
  usePageMeta({
    title: `Contact — ${SITE_CONFIG.brandName}`,
    description:
      'Contact Dastarkhān Tiffin Services on WhatsApp or call +91 8750606581. Daily tiffin delivery across Okhla, Shaheen Bagh, Zakir Nagar, Batla House & Abul Fazal.',
    path: '/contact',
  });

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [topic, setTopic] = useState<string>(INQUIRY_TOPICS[0].value);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [readyInquiry, setReadyInquiry] = useState<{
    text: string;
    url: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const directWhatsAppUrl = buildDirectWhatsAppUrl();
  const telHref = `tel:${SITE_CONFIG.displayPhone.replace(/\s+/g, '')}`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { customerName, phoneNumber, topic, message };
    const validationErrors = validateInquiryPayload(payload);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formatted = formatInquiryWhatsAppMessage(payload);
    setReadyInquiry({ text: formatted, url: buildWhatsAppUrl(formatted) });
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!readyInquiry) return;
    try {
      await navigator.clipboard.writeText(readyInquiry.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
      <header>
        <h1 className="heading-page font-serif font-semibold text-forest">
          Contact
        </h1>
      </header>

      <div className="mt-4 grid grid-cols-1 gap-5 lg:mt-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        {/* Direct Contact: Prominent Saffron WhatsApp + Phone + Address */}
        <section aria-label="Direct contact details" className="min-w-0 lg:col-span-5">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Chat on WhatsApp
          </a>

          <dl className="mt-4 divide-y divide-beige rounded-2xl border border-beige bg-surface px-4">
            <div className="flex items-center justify-between gap-3 py-3.5">
              <div className="min-w-0">
                <dt className="text-[11px] font-medium text-muted">Phone</dt>
                <dd className="mt-0.5 text-sm font-semibold text-charcoal tabular-nums">
                  {SITE_CONFIG.displayPhone}
                </dd>
              </div>
              <a
                href={telHref}
                className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full border border-beige bg-cream px-3.5 py-1.5 text-xs font-semibold text-forest transition-colors hover:border-fresh hover:bg-leaf-soft whitespace-nowrap"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-fresh" aria-hidden="true" />
                Call
              </a>
            </div>

            <div className="py-3.5">
              <dt className="text-[11px] font-medium text-muted">Delivery Areas</dt>
              <dd className="mt-0.5">
                <address className="not-italic text-xs leading-relaxed text-charcoal">
                  {SITE_CONFIG.address.line1}
                  <br />
                  {SITE_CONFIG.address.line2}
                </address>
              </dd>
            </div>
          </dl>
        </section>

        {/* Clean White Form Surface */}
        <section
          aria-labelledby="inquiry-form-heading"
          className="min-w-0 rounded-2xl border border-beige bg-surface p-4 sm:p-5 lg:col-span-7"
        >
          <h2
            id="inquiry-form-heading"
            className="font-serif text-base font-semibold text-forest"
          >
            Send a Message
          </h2>

          {readyInquiry ? (
            <div className="mt-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-forest">
                  Ready to send
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-[32px] items-center gap-1 text-xs font-semibold text-forest hover:text-fresh"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <pre
                data-testid="inquiry-message-preview"
                className="whitespace-pre-wrap rounded-xl border border-beige bg-cream p-3 font-sans text-xs leading-relaxed text-charcoal"
              >
                {readyInquiry.text}
              </pre>

              <div className="flex items-center gap-2.5">
                <a
                  href={readyInquiry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-full bg-saffron px-4 py-2 text-xs font-semibold text-forest-deep transition-colors hover:bg-forest-deep hover:text-white whitespace-nowrap"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Open WhatsApp
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => setReadyInquiry(null)}
                  className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-full border border-beige bg-surface px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:bg-sand whitespace-nowrap"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-3 space-y-3">
              <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-medium text-charcoal"
                  >
                    Name *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={customerName}
                    onChange={(event) => {
                      setCustomerName(event.target.value);
                      if (errors.customerName) {
                        setErrors((prev) => ({ ...prev, customerName: undefined }));
                      }
                    }}
                    placeholder="Your name"
                    className={`mt-1 h-10 w-full rounded-xl border bg-surface px-3 text-xs text-charcoal placeholder:text-muted focus:outline-none ${
                      errors.customerName
                        ? 'border-nonveg'
                        : 'border-beige focus:border-forest'
                    }`}
                  />
                  {errors.customerName && (
                    <p role="alert" className="mt-1 text-[11px] text-nonveg">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-medium text-charcoal"
                  >
                    Phone *
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                      if (errors.phoneNumber) {
                        setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                      }
                    }}
                    placeholder="10-digit mobile"
                    className={`mt-1 h-10 w-full rounded-xl border bg-surface px-3 text-xs text-charcoal tabular-nums placeholder:text-muted focus:outline-none ${
                      errors.phoneNumber
                        ? 'border-nonveg'
                        : 'border-beige focus:border-forest'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p role="alert" className="mt-1 text-[11px] text-nonveg">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  id="inquiry-topic-label"
                  htmlFor="inquiry-topic"
                  className="block text-xs font-medium text-charcoal"
                >
                  Topic
                </label>
                <SelectDropdown
                  id="inquiry-topic"
                  labelId="inquiry-topic-label"
                  value={topic}
                  options={INQUIRY_TOPICS}
                  onChange={setTopic}
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium text-charcoal"
                >
                  Message *
                </label>
                <textarea
                  id="inquiry-message"
                  rows={2}
                  required
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  placeholder="Plan inquiry, trial meal, or question"
                  className={`mt-1 w-full rounded-xl border bg-surface px-3 py-2 text-xs text-charcoal placeholder:text-muted focus:outline-none ${
                    errors.message
                      ? 'border-nonveg'
                      : 'border-beige focus:border-forest'
                  }`}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-[11px] text-nonveg">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-forest-deep active:scale-[0.98]"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Send via WhatsApp
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
