"use client";

import React from "react";
import Image from "next/image";
import { PlayCircle, ThumbsUp, ThumbsDown, Share2, Plus } from "lucide-react";
// import { MovieTile } from '@/components/MovieTile';
import { CommentsSection } from "@/components/CommentsSection";

import tenet from "@/public/images/big-hero-6.jpg";

const currentVideo = {
  title: "Inception",
  description:
    "A thief who enters the dreams of others to steal secrets from their subconscious.",
  views: "10M views",
  likes: "500K",
  dislikes: "10K",
  releaseDate: "2010",
  director: "Christopher Nolan",
  starring: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  thumbnailUrl: "/inception-thumbnail.jpg",
  posterUrl: "/inception-poster.jpg",
};

const similarMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    thumbnailUrl: "/dark-knight-thumbnail.jpg",
  },
  { id: 2, title: "Interstellar", thumbnailUrl: "/interstellar-thumbnail.jpg" },
  { id: 3, title: "The Matrix", thumbnailUrl: "/matrix-thumbnail.jpg" },
  {
    id: 4,
    title: "Blade Runner 2049",
    thumbnailUrl: "/blade-runner-thumbnail.jpg",
  },
  { id: 5, title: "Memento", thumbnailUrl: "/memento-thumbnail.jpg" },
  { id: 6, title: "The Prestige", thumbnailUrl: "/prestige-thumbnail.jpg" },
];

const dummyComments = [
  {
    id: 1,
    user: "MovieFan123",
    text: "This movie blew my mind! The concept is so original.",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    user: "CinematicCritic",
    text: "Nolan's direction is impeccable. The visuals are stunning.",
    timestamp: "1 week ago",
  },
  {
    id: 3,
    user: "DreamExplorer",
    text: "I've watched this multiple times and still find new details.",
    timestamp: "2 weeks ago",
  },
];

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  console.log(`Fetching data for video ID: ${id}`);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Video player */}
          <div className="relative aspect-video bg-gray-900 mb-6">
            <Image
              src={currentVideo.thumbnailUrl}
              alt={currentVideo.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle
                size={64}
                className="text-white opacity-80 hover:opacity-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Video details */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4 aspect-[2/3] relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={tenet}
                alt={currentVideo.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{currentVideo.title}</h1>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">
                  {currentVideo.views} • {currentVideo.releaseDate}
                </span>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1">
                    <ThumbsUp size={20} />
                    <span>{currentVideo.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <ThumbsDown size={20} />
                    <span>{currentVideo.dislikes}</span>
                  </button>
                  <button>
                    <Share2 size={20} />
                  </button>
                  <button>
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{currentVideo.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Director:</strong> {currentVideo.director}
                <br />
                <strong>Starring:</strong> {currentVideo.starring}
              </p>
            </div>
          </div>

          {/* Comments section */}
          <CommentsSection comments={dummyComments} />
        </div>

        {/* Similar movies */}
        <div className="lg:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Recommended</h2>
          <div className="space-y-4">
            {similarMovies.map((video) => (
              <div key={video.id} className="flex space-x-3">
                <div className="w-24 h-28 relative flex-shrink-0">
                  <Image
                    src={tenet}
                    alt={video.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-medium line-clamp-2 text-sm">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
