"use client";

import { MovieTile } from "./MovieTile";
import React, { useState, useEffect } from "react";

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

export const MovieGrid = ({ title }: { title: string }) => {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 px-2 py-4 sm:px-6 lg:px-16 relative">
        {movieData.map((movie: Movie, index: number) => (
          <div
            className="  aspect-[2/3] w-full max-w-[200px] mx-auto p-2 "
            key={index}
          >
            <MovieTile movie={movie} />
            <div className="text-sm">Description</div>
          </div>
        ))}
      </div>
    </section>
  );
};
