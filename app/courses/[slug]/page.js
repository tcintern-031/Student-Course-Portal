import { notFound } from "next/navigation";

import courses from "@/data/courses";
import RelatedCourses from "@/components/RelatedCourses";

export default async function CourseDetails({ params }) {
  const { slug } = await params;

  const course = courses.find(
    (item) => item.slug === slug
  );

  if (!course) {
    notFound();
  }

  const relatedCourses = courses.filter(
    (item) => item.slug !== slug
  );

  return (
    <section>
      <h1 className="text-5xl font-bold mb-6">
        {course.title}
      </h1>

      <p className="text-lg mb-6">
        {course.description}
      </p>

      <div className="space-y-2">
        <p>
          <strong>Duration:</strong> {course.duration}
        </p>

        <p>
          <strong>Level:</strong> {course.level}
        </p>

        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>
      </div>

      <RelatedCourses
        courses={relatedCourses}
      />
    </section>
  );
}