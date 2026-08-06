import CourseCard from "./CourseCard";

export default function RelatedCourses({ courses }) {
  if (courses.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6">
        Related Courses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </section>
  );
}