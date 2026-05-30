export default function ReviewerBox({ label, name, credentials, bio, updatedAt }) {
  return (
    <article className="surface-card reviewer-box p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#2d4f87]">{label}</p>
      <h3 className="mt-1 text-lg font-bold text-[#0f2858]">{name}</h3>
      <p className="text-sm text-[#4f678f]">{credentials}</p>
      <p className="mt-3 text-sm text-[#4e6288]">{bio}</p>
      <p className="reviewer-updated mt-4 text-xs font-medium">Last updated: {updatedAt}</p>
    </article>
  );
}
