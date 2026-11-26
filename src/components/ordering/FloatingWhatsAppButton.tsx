import { MessageCircle } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { buildDirectWhatsAppUrl } from '../../lib/whatsapp';

export function FloatingWhatsAppButton() {
  const { extraItems, isDrawerOpen } = useOrder();
  if (isDrawerOpen) return null;

  // Sits above the mobile nav, and moves up when FloatingExtrasBar is showing.
  const position =
    extraItems.length > 0 ? 'bottom-[122px] md:bottom-20' : 'bottom-[72px] md:bottom-5';

  return (
    <a
      href={buildDirectWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send an inquiry on WhatsApp"
      className={`fixed right-4 z-35 inline-flex h-12 items-center gap-2 rounded-full bg-[#0f7a6d] px-4 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-[#0b5f55] md:right-6 ${position}`}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      Enquire
    </a>
  );
}
