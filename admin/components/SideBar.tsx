"use client";

import { usePathname, useRouter } from "next/navigation";

const hideSideBarPaths = "/login";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === hideSideBarPaths) {
    return null;
  }

  return (
    <div className="flex flex-col border-r p-1.5 border-b">
      <div
        className="p-2 justify-center hover:bg-red-700 rounded"
        onClick={() => {
          router.push("/");
        }}
      >
        Dashboard
      </div>
      <div
        className="p-2 justify-center hover:bg-red-700 rounded "
        onClick={() => {
          router.push("/upload");
        }}
      >
        Upload
      </div>
      <div
        className="p-2 justify-center hover:bg-red-700 rounded"
        onClick={() => {
          router.push("/settings");
        }}
      >
        Settings
      </div>
    </div>
  );
};

export default SideBar;
