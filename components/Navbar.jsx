"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Instructors", href: "/instructors" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          href="/"
          className="text-white text-2xl font-bold"
        >
          Student Portal
        </Link>

        <div className="flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-yellow-300 transition"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-white hover:text-yellow-300"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-white text-sm">
                {user.name} ({user.role})
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}