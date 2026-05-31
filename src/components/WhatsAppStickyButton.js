export default function WhatsAppStickyButton() {
  return (
    <a
      href="https://wa.me/905353998999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:bg-[#1fb75a]"
    >
      <span aria-hidden="true">💬</span>
      WhatsApp
    </a>
  );
}
