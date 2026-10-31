import RecentProperties from "./components/home/RecentProperties";
import SearchBox from "./components/home/SearchBox";
import FrontendLayout from "./components/layouts/FrontendLayout";
import Navbar from "./components/navbar/Nabar";

export default function Home() {
  return (
    <FrontendLayout>
      <Navbar />
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[url('/hero.jpg')] bg-cover bg-center pt-32 lg-pt-36 py-2">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-900/50 to-transparent" />

        {/* Contents */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium tracking-wide text-white">
                  Premium Real Estate Marketplace
                </span>
              </div>
              {/* Heading */}
              <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Find The Perfect Place To Call Home
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Discover luxury apartments, modern homes, and premium properties
                in the best locations around the world.
              </p>
              <SearchBox />
            </div>
          </div>
        </div>
      </section>
      <RecentProperties />
    </FrontendLayout>
  );
}
