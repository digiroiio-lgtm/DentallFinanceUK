import Link from "next/link";
import { getBreadcrumbTrail } from "@/lib/breadcrumbs";

export default function Breadcrumbs({ page }) {
  const trail = getBreadcrumbTrail(page);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[#6a5ea0]">
      <ol className="flex flex-wrap items-center gap-x-1">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-x-1">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.href} className="font-medium text-[#6d4fe0] underline">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
