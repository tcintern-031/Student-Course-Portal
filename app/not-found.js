import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-7xl font-bold text-red-500">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-3">
        The page you are looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}