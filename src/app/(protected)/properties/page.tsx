import FrontendLayout from "@/app/components/layouts/FrontendLayout";
import Navbar from "@/app/components/navbar/Nabar";
import PropertyCard from "@/app/components/properties/PropertyCard";
import CardSkeleton from "@/app/components/skeletons/CardSkeleton";
import EmptyState from "@/app/components/ui/EmptyState";
import { getUserProperties } from "@/server-actions/getUserProperties";
import { Suspense } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function PropertiesPage() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            Properties
          </h2>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <PropertiesContent />
        </Suspense>
      </div>
    </FrontendLayout>
  );
}

async function PropertiesContent() {
  const properties = await getUserProperties();

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subTitle="You currently have no properties available. Check back later after creating new listings."
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
