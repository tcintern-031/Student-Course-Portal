import CourseCard from "@/components/CourseCard";

export default async function CoursesPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses.");
  }

  const courses = await response.json();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Courses
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}