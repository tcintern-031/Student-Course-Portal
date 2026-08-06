import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Instructors", href: "/instructors" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          href="/"
          className="text-white text-2xl font-bold"
        >
          Student Portal
        </Link>

        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-yellow-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}