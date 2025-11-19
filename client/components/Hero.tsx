"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

import into from "@/public/images/into-the-verse.jpg";
import big from "@/public/images/big-hero-6.jpg";
import women from "@/public/images/little-women.jpg";
import tenet from "@/public/images/tenet.jpg";
import home from "@/public/images/homecoming.jpeg";

const images = [
  { src: into, alt: "Into the Verse" },
  { src: big, alt: "Big Hero 6" },
  { src: women, alt: "Little Women" },
  { src: tenet, alt: "Tenet" },
  { src: home, alt: "Homecoming" },
];

const AUTOPLAY_INTERVAL = 10000;

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_INTERVAL, stopOnInteraction: false }),
  ]);
  const [progress, setProgress] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 100 / (AUTOPLAY_INTERVAL / 50); // Smoother progress
        }
        return 0;
      });
    }, 50); // Update more frequently for smoother animation

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="brightness-75" // Slightly dim the image for better text contrast
              />
              <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
                <h2 className="text-3xl sm:text-5xl font-bold mb-2">
                  {image.alt}
                </h2>
                <p className="text-lg sm:text-xl">Watch now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Progress value={progress} className="w-full h-1 bg-black" />
      </div>
    </div>
  );
};
