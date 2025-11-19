import { Navbar } from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main className="grid grid-cols-7">
        <div className="grid col-span-1">
          <SideBar />
        </div>
        <div className="grid col-span-6 border-b">{children}</div>
      </main>
    </>
  );
}
