"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { SearchIcon, UserIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "@/public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Constants for types, genres, and countries
const CONTENT_TYPES = [
  { name: "Movies", href: "/movies" },
  { name: "Series", href: "/series" },
  { name: "Anime", href: "/anime" },
];
const hideNavbarPaths = "/login";
const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
  "Animation",
  "Adventure",
  "Family",
  "Fantasy",
  "Mystery",
  "Documentary",
  "War",
  "History",
  "Crime",
  "Biography",
  "Sport",
  "Psychology",
];

const COUNTRIES = [
  "USA",
  "UK",
  "India",
  "France",
  "Japan",
  "South Korea",
  "Italy",
  "Spain",
  "Germany",
  "Canada",
  "Australia",
  "China",
  "Brazil",
  "Mexico",
  "Russia",
  "Sweden",
  "Denmark",
  "Norway",
];

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const debouncedSearchTerm = useDebounce(search, 300);
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // You can use debouncedSearchTerm for API calls or filtering
  useEffect(() => {
    // Perform search or API call with debouncedSearchTerm
  }, [debouncedSearchTerm]);

  if (pathname === hideNavbarPaths) {
    return null;
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 gap-4 pt-2 pb-1 bg-transparent text-white border-b h-24 sm:h-16">
      <div className="flex items-center hidden sm:block  ">
        <Image src={logo} alt="Logo" width={80} height={80} />
      </div>

      <div className="flex items-center gap-4 hidden sm:block">
        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                Types
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-2 w-[150px] bg-black">
                  {CONTENT_TYPES.map((type) => (
                    <NavigationMenuLink
                      key={type.name}
                      className="block p-1.5 hover:bg-red-700 rounded text-xs"
                      href={type.href}
                    >
                      {type.name}
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                Genres
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-3 gap-1 p-2 w-[400px] bg-black">
                  {GENRES.map((genre) => (
                    <NavigationMenuLink
                      key={genre}
                      className="block p-1.5 hover:bg-red-700 rounded text-xs"
                      href={`/genres/${genre.toLowerCase()}`}
                    >
                      {genre}
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                Countries
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-3 gap-1 p-2 w-[400px] bg-black">
                  {COUNTRIES.map((country) => (
                    <NavigationMenuLink
                      key={country}
                      className="block p-1.5 hover:bg-red-700 rounded text-xs"
                      href={`/countries/${country.toLowerCase()}`}
                    >
                      {country}
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex bg-gray-950 text-white w-full sm:w-[400px] rounded p-1 shadow-md border ">
        <Dialog>
          <DialogTrigger className="flex items-center w-full ">
            <SearchIcon className="p-1 mr-2" />
            <div className="">Search</div>
          </DialogTrigger>

          <DialogContent className="flex justify-between items-center h-[40px]">
            <div className="flex items-center w-full ">
              <SearchIcon className="mr-2" />
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Search movies.."
                className="bg-black text-white w-full placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-transparent border-0 rounded-lg h-10 sm:h-12"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        {session ? (
          <>
            <Avatar
              className="border shadow-lg w-10 h-10"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <AvatarImage src="/avatar.png" alt="Profile Avatar" />
              <AvatarFallback>
                <UserIcon className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            {open && (
              <Card className="w-[200px] absolute top-20 sm:top-14 right-4 z-50 rounded-sm">
                <CardContent className="p-2">
                  <div className="block p-1.5 hover:bg-red-700 rounded text-sm">
                    Profile
                  </div>
                  <div className="block p-1.5 hover:bg-red-700 rounded text-sm">
                    Watch List
                  </div>
                  <div
                    className="block p-1.5 hover:bg-red-700 rounded text-sm"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};
