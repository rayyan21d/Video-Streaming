import Image from "next/image";
import { Movie } from "./MovieTiles"; // Import the Movie interface
import { PlayIcon } from "lucide-react";

export const MovieTile: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="w-full group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg mb-2">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayIcon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <h3 className="text-xs md:text-sm font-bold truncate">{movie.title}</h3>
    </div>
  );
};
