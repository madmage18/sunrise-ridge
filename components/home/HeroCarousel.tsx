import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import hero1 from "@/public/images/hero-1.jpg";
import hero2 from "@/public/images/hero-2.jpg";
import hero3 from "@/public/images/hero-3.jpg";
import hero4 from "@/public/images/hero-4.jpg";
import Image from "next/image";
import { Card } from "../ui/card";
import { CardContent } from "../ui/card";

const carouselImages = [hero1, hero2, hero3, hero4];
export default function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <p>test-content-{index}</p>
                    {/* Issue with my image. Temporarily commenting this out. <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    /> */}
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
