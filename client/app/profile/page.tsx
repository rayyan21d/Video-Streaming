"use client";
import { MovieGrid } from "@/components/MovieGrid";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <MovieGrid title="Watch History" />
      </div>
    </div>
  );
}
