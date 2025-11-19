import { Hero } from "@/components/Hero";
import { MovieTiles } from "@/components/MovieTiles";
import { MovieGrid } from "@/components/MovieGrid";
// import { FeaturedSection } from "@/components/FeaturedSection";
// import { GenreSelector } from "@/components/GenreSelector";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow">
        <Hero />
        <MovieTiles title={"Trending Movies"} />
        <MovieGrid title={"Action Movies"} />
      </main>
    </div>
  );
}
