"use client";

import { MovieTile } from "./MovieTile";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: StaticImageData;
  genre: string;
  rating: number;
  tags: string[];
}

import into from "@/public/images/into-the-verse.jpg";
import big from "@/public/images/big-hero-6.jpg";
import tenet from "@/public/images/tenet.jpg";
import lil from "@/public/images/little-women.jpg";

import { StaticImageData } from "next/image";

export const MovieTiles = ({ title }: { title: string }) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);

  useEffect(() => {
    // Simulating API call to fetch movie data
    const fetchMovies = async () => {
      // Replace this with actual API call
      const dummyData: Movie[] = [
        {
          id: 1,
          title: "Spider Man HomeComing",
          description: " ",
          imageUrl: big,
          genre: "Action",
          rating: 8.4,
          tags: ["Superhero", "Adventure"],
        },
        {
          id: 2,
          title: "Big Hero 6",
          description: " ",
          imageUrl: into,
          genre: "Animation",
          rating: 7.8,
          tags: ["Family", "Comedy"],
        },
        {
          id: 3,
          title: "Into the Spider-Verse",
          description: " ",
          imageUrl: big,
          genre: "Action",
          rating: 8.4,
          tags: ["Superhero", "Adventure"],
        },
        {
          id: 4,
          title: "Tenet",
          description: " ",
          imageUrl: into,
          genre: "Action",
          rating: 7.4,
          tags: ["Thriller", "Sci-Fi"],
        },
        {
          id: 5,
          title: "The Matrix",
          description:
            "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.",
          imageUrl: big,
          genre: "Action",
          rating: 8.7,
          tags: ["Sci-Fi", "Thriller"],
        },
        {
          id: 6,
          title: "Spider Man HomeComing",
          description: " ",
          imageUrl: tenet,
          genre: "Action",
          rating: 8.4,
          tags: ["Superhero", "Adventure"],
        },
        {
          id: 7,
          title: "Big Hero 6",
          description: " ",
          imageUrl: big,
          genre: "Animation",
          rating: 7.8,
          tags: ["Family", "Comedy"],
        },
        {
          id: 8,
          title: "Into the Spider-Verse",
          description: " ",
          imageUrl: lil,
          genre: "Action",
          rating: 8.4,
          tags: ["Superhero", "Adventure"],
        },
        {
          id: 9,
          title: "Tenet",
          description: " ",
          imageUrl: tenet,
          genre: "Action",
          rating: 7.4,
          tags: ["Thriller", "Sci-Fi"],
        },
        {
          id: 10,
          title: "The Matrix",
          description:
            "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.",
          imageUrl: into,
          genre: "Action",
          rating: 8.7,
          tags: ["Sci-Fi", "Thriller"],
        },
      ];
      setMovieData(dummyData);
    };

    fetchMovies();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="px-2 py-4 sm:px-6 lg:px-10 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-3">
            {movieData.map((movie: Movie) => (
              <CarouselItem
                key={movie.id}
                className="pl-2 md:pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="aspect-[2/3] w-full max-w-[200px] mx-auto">
                  <MovieTile movie={movie} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
          <CarouselNext className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
        </Carousel>
      </div>
    </section>
  );
};
