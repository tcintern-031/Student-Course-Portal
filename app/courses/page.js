"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { getToken, getUser } from "@/lib/auth";
import Link from "next/link";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const loadCourses = async () => {
      const token = getToken();
      const currentUser = getUser();

      setUser(currentUser);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [API_URL]);

  const canManageCourse = (course) => {
    if (!user) {
      return false;
    }

    if (user.role === "Admin") {
      return true;
    }

    if (user.role === "Instructor") {
      return course.createdByUserId === user.id;
    }

    return false;
  };

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center">Loading courses...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Login Required
        </h1>

        <p className="text-gray-600 mb-6">
          Please login to view the protected courses.
        </p>

        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Courses
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            canEdit={canManageCourse(course)}
            canDelete={canManageCourse(course)}
          />
        ))}
      </div>
    </main>
  );
}