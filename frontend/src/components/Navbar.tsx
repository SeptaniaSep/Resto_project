import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 px-12 py-4 text-white">
      <div className="leading-tight">
        <p className="font-medium text-2xl">{name || "Guest"}</p>
        <p className="text-l text-gray-300">{role || "Unknown"}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Logout Icon */}
        <p>Log out</p>
        <button
          onClick={handleLogout}
          className="hover:text-gray-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
