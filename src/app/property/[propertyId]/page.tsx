import FrontendLayout from "@/app/components/layouts/FrontendLayout";
import Navbar from "@/app/components/navbar/Nabar";
import EmailForm from "@/app/components/properties/EmailForm";
import PropertyPageSkeleton from "@/app/components/skeletons/PropertyPageSkeleton";
import { getProperty } from "@/server-actions/getProperty";
import Image from "next/image";
import { Suspense } from "react";
import { FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { LuBath, LuBedDouble } from "react-icons/lu";

export function formatPrice(price: number | string) {
  return Number(price).toLocaleString();
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const propertyId = (await params).propertyId;
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <Suspense fallback={<PropertyPageSkeleton />}>
        <PropertyContent propertyId={propertyId} />
      </Suspense>
    </FrontendLayout>
  );
}

async function PropertyContent({ propertyId }: { propertyId: string }) {
  const property = await getProperty(propertyId);
  return (
    <section className="py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              {property?.listingType === "sale" ? "FOR SALE" : "FOR RENT"}
            </p>
            <h2 className="mt-3 text-4xl font-bold text-text md:text-5xl">
              {property?.title}
            </h2>
            <div className="my-6 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <FaMapMarkerAlt size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.location}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <FaRulerCombined size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.area} sqft
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <LuBedDouble size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.bedrooms} Rooms
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5">
                <LuBath size={16} className="text-neutral-400" />
                <span className="font-medium text-neutral-800">
                  {property?.bathrooms} Baths
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm">
            <p className="text-sm text-text/60">Property Price</p>
            <h2 className="mt-2 text-4xl font-bold text-primary">
              ${formatPrice(property?.price || "")}
            </h2>
          </div>
        </div>

        <div className="relative my-6 h-60 w-full md:h-100 lg:h-120">
          <Image
            src={property?.image || ""}
            alt="Image"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-text">
                About This Property
              </h2>
              <p className="mt-6 leading-relaxed text-text/70">
                {property?.description}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            {property?.owner && (
              <EmailForm
                propertyPrice={property.price}
                propertyTitle={property.title}
                email={property.owner.email}
                name={property.owner.name}
                image={property.owner.image || "/avatar.png"}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
