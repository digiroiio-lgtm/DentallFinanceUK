import { PARTNER_CATEGORIES, getActivePartners } from "@/lib/partners";
import ComparisonDisclosure from "@/components/ComparisonDisclosure";
import AffiliateDisclosureBanner from "@/components/AffiliateDisclosureBanner";
import AffiliateCTA from "@/components/AffiliateCTA";

// Lists active partners only, with the source date for each row. Renders nothing today.
export default function PartnerComparisonTable({ category }) {
  const rows = getActivePartners().filter((partner) => !category || partner.category === category);
  if (rows.length === 0) return null;

  return (
    <section className="mt-8">
      <AffiliateDisclosureBanner active />
      <ComparisonDisclosure />
      <div className="table-wrap mt-4">
        <table className="table-ui">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Category</th>
              <th>Information checked</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((partner) => (
              <tr key={partner.id}>
                <th>{partner.name}</th>
                <td>{PARTNER_CATEGORIES[partner.category]}</td>
                <td>{partner.lastChecked}</td>
                <td>
                  <AffiliateCTA partnerId={partner.id} placement="comparison_table" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
