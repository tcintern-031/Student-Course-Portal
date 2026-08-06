import Link from "next/link";
import FeaturedCourses from "@/components/FeaturedCourses";

export default function Home() {
  return (
    <>
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          Welcome to Student Course Portal
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Learn modern technologies including React, Next.js,
          AI Engineering and ASP.NET Core from industry experts.
        </p>

        <Link
          href="/courses"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Explore Courses
        </Link>
      </section>

      <FeaturedCourses />
    </>
  );
}