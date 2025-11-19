"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import React, { useState } from "react";

import logo from "@/public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Card, CardContent } from "./ui/card";

const hideNavbarPaths = "/login";

export const Navbar = () => {
  const pathname = usePathname();

  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === hideNavbarPaths) {
    return null;
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 gap-4 pt-2 pb-1 bg-transparent text-white border-b h-24 sm:h-16">
      <div className="flex items-center hidden sm:block  ">
        <Image src={logo} alt="Logo" width={80} height={80} />
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
                    Settings
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
        ) : null}
      </div>
    </div>
  );
};
