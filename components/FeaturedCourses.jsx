import courses from "@/data/courses";
import CourseCard from "./CourseCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedCourses() {
  const featuredCourses = courses.filter((course) => course.featured);

  return (
    <section className="mt-16">
      <SectionTitle title="Featured Courses" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}