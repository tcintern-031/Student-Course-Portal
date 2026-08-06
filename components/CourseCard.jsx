import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <h3 className="text-2xl font-bold mb-3">
        {course.title}
      </h3>

      <p className="text-gray-600 mb-4">
        {course.description}
      </p>

      <div className="space-y-1 mb-5">
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

      <Link
        href={`/courses/${course.slug}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}