// import FrontendLayout from "../components/layouts/FrontendLayout";
// import Navbar from "../components/navbar/Nabar";
// import FilterButton from "../components/marketplace/FilterButton";
// import MarketPlace from "../components/marketplace/MarketPlace";
// import { Suspense } from "react";
// import CardSkeleton from "../components/skeletons/CardSkeleton";

// type MarketPageProps = {
//   searchParams: Promise<{
//     search?: string;
//     propertyType?: string;
//     location?: string;
//     address?: string;
//     minPrice?: string; // was number
//     maxPrice?: string; // was number
//   }>;
// };

// export default async function MarketPage({ searchParams }: MarketPageProps) {
//   const params = await searchParams;

//   return (
//     <FrontendLayout>
//       <Navbar variant="solid" />

//       <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
//         <div className="flex justify-between">
//           <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>
//           <FilterButton />
//         </div>

//         <Suspense fallback={<CardSkeleton />}>
//           <MarketPlace searchParams={params} />
//         </Suspense>
//       </div>
//     </FrontendLayout>
//   );
// }

import FrontendLayout from "../components/layouts/FrontendLayout";

import FilterButton from "../components/marketplace/FilterButton";
import MarketPlace from "../components/marketplace/MarketPlace";
import { Suspense } from "react";
import CardSkeleton from "../components/skeletons/CardSkeleton";
import Navbar from "../components/navbar/Nabar";

type MarketPageProps = {
  searchParams: Promise<{
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: string; // was number
    maxPrice?: string; // was number
  }>;
};

export default async function MarketPage({ searchParams }: MarketPageProps) {
  const params = await searchParams;

  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>
          <FilterButton />
        </div>

        <Suspense key={JSON.stringify(params)} fallback={<CardSkeleton />}>
          <MarketPlace searchParams={params} />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}
