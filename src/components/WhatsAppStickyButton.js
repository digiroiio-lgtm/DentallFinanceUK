export default function WhatsAppStickyButton() {
  return (
    <a
      href="https://wa.me/905353998999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-sticky fixed z-40 inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:bg-[#1fb75a]"
    >
      <span aria-hidden="true" className="text-2xl leading-none">
        💬
      </span>
      <span className="sr-only md:not-sr-only md:ml-2 md:text-sm md:font-bold">WhatsApp</span>
    </a>
  );
}
