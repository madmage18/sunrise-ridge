import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          All your Sunrise Ridge Favorites!
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Tucked in the Northwest corner of Sussex County, New Jersey we have
          been providing our loyal customers with the best pastured eggs,
          low-temp pasturized goats milk and cheeses since 2016. In 2019 we
          added out flower farm. Cheers Neighbors!
        </p>
        <p className="mt-2 italic font-bold max-w-xl text-lg leading-8 text-muted-foreground">
          - The Sunrise Ridge Family
        </p>

        <Button asChild size="lg" className="mt-10">
          <Link href="/products">All Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
