"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import SectionTitle from "./SectionTitle";
import { getToken, getUser } from "@/lib/auth";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    duration: "",
    level: "",
    featured: false,
    instructorId: "",
  });

  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setUser(getUser());

    const fetchCourses = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setError("");

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

    fetchCourses();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      setError("Please login before managing courses.");
      return;
    }

    try {
      setError("");

      const url = editingId
        ? `${API_URL}/api/courses/${editingId}`
        : `${API_URL}/api/courses`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          instructorId: formData.instructorId
            ? Number(formData.instructorId)
            : null,
        }),
      });

      if (response.status === 401) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      if (response.status === 403) {
        throw new Error(
          "You are not authorized to perform this action."
        );
      }

      if (!response.ok) {
        throw new Error(
          editingId
            ? "Failed to update course."
            : "Failed to add course."
        );
      }

      const savedCourse = await response.json();

      if (editingId) {
        setCourses((currentCourses) =>
          currentCourses.map((course) =>
            course.id === editingId
              ? savedCourse
              : course
          )
        );
      } else {
        setCourses((currentCourses) => [
          ...currentCourses,
          savedCourse,
        ]);
      }

      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      description: "",
      duration: "",
      level: "",
      featured: false,
      instructorId: "",
    });

    setEditingId(null);
  };

  const handleEdit = (course) => {
    setEditingId(course.id);

    setFormData({
      slug: course.slug || "",
      title: course.title || "",
      description: course.description || "",
      duration: course.duration || "",
      level: course.level || "",
      featured: course.featured || false,
      instructorId: course.instructorId || "",
    });

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Please login before deleting a course.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/courses/${id}`,
        {
          method: "DELETE",
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

      if (response.status === 403) {
        throw new Error(
          "You are not authorized to delete this course."
        );
      }

      if (!response.ok) {
        throw new Error("Failed to delete course.");
      }

      setCourses((currentCourses) =>
        currentCourses.filter(
          (course) => course.id !== id
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

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
      <section className="py-10">
        <p className="text-center">Loading courses...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="py-10">
        <SectionTitle title="Featured Courses" />

        <div className="bg-yellow-100 text-yellow-800 p-5 rounded-lg text-center">
          Please{" "}
          <a
            href="/login"
            className="font-bold underline"
          >
            login
          </a>{" "}
          to view protected courses.
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <SectionTitle title="Featured Courses" />

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter((course) => course.featured)
          .map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canEdit={canManageCourse(course)}
              canDelete={canManageCourse(course)}
            />
          ))}
      </div>

      {(user.role === "Admin" ||
        user.role === "Instructor") && (
        <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            {editingId
              ? "Edit Course"
              : "Add New Course"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 md:col-span-2"
            />

            <input
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="level"
              placeholder="Level"
              value={formData.level}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="instructorId"
              type="number"
              placeholder="Instructor ID (optional)"
              value={formData.instructorId}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Course
            </label>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                {editingId
                  ? "Update Course"
                  : "Add Course"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
}