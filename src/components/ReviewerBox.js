export default function ReviewerBox({ label, name, credentials, bio, updatedAt }) {
  return (
    <article className="surface-card reviewer-box p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#56479a]">{label}</p>
      <h3 className="mt-1 text-lg font-bold text-[#2f1f75]">{name}</h3>
      <p className="text-sm text-[#68599f]">{credentials}</p>
      <p className="mt-3 text-sm text-[#695aa0]">{bio}</p>
      <p className="reviewer-updated mt-4 text-xs font-medium">Last updated: {updatedAt}</p>
    </article>
  );
}
