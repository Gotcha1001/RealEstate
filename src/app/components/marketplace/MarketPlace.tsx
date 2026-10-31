// import { getProperties } from "@/server-actions/getProperties";
// import PropertyCard from "../properties/PropertyCard";
// import { Property } from "@/types/property";
// import EmptyState from "../ui/EmptyState";

// interface MarketPlaceProps {
//   searchParams: {
//     search?: string;
//     propertyType?: string;
//     location?: string;
//     address?: string;
//     minPrice?: number;
//     maxPrice?: number;
//   };
// }

// export default async function MarketPlace({ searchParams }: MarketPlaceProps) {
//   const properties: Property[] = await getProperties({
//     search: searchParams.search,
//     address: searchParams.address,
//     location: searchParams.location,
//     propertyType: searchParams.propertyType,
//     minPrice: searchParams.minPrice,
//     maxPrice: searchParams.maxPrice,
//   });

//   if (properties.length === 0) {
//     return (
//       <EmptyState
//         title="No Matching Properties"
//         subTitle="Try adjusting your search criteria or clearing some filters to see more results."
//         filter
//       />
//     );
//   }
//   return (
//     <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
//       {properties.map((property) => (
//         <PropertyCard key={property.id} property={property} />
//       ))}
//     </div>
//   );
// }

import { getProperties } from "@/server-actions/getProperties";
import PropertyCard from "../properties/PropertyCard";
import { Property } from "@/types/property";
import EmptyState from "../ui/EmptyState";

interface MarketPlaceProps {
  searchParams: {
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: string; // was number
    maxPrice?: string; // was number
  };
}

function toNumber(value?: string) {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export default async function MarketPlace({ searchParams }: MarketPlaceProps) {
  const properties: Property[] = await getProperties({
    search: searchParams.search,
    address: searchParams.address,
    location: searchParams.location,
    propertyType: searchParams.propertyType,
    minPrice: toNumber(searchParams.minPrice),
    maxPrice: toNumber(searchParams.maxPrice),
  });

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Matching Properties"
        subTitle="Try adjusting your search criteria or clearing some filters to see more results."
        filter
      />
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
