export default function WhatsAppCtaBlock({ className = "" }) {
  return (
    <section className={`surface-card p-6 ${className}`}>
      <h2 className="section-title text-2xl">Need help understanding your options?</h2>
      <p className="mt-2 text-[#67589e]">Speak to our treatment team for guidance on treatment pathways and next steps.</p>
      <div className="mt-4">
        <a
          href="https://wa.me/905353998999"
          target="_blank"
          rel="noopener noreferrer"
          className="btn border border-[#25D366] bg-white text-[#166534] hover:bg-[#f0fdf4]"
          aria-label="Speak with treatment team on WhatsApp"
        >
          Speak With Treatment Team
        </a>
      </div>
    </section>
  );
}
