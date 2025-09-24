import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="flex-1 pt-20 px-4">
        <Outlet />
      </main>
    </div>
  );
}
