"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    duration: "",
    level: "",
    instructor: "",
    featured: false,
  });

  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Get courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/courses`);

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

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add or update course
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          editingId
            ? "Failed to update course."
            : "Failed to add course."
        );
      }

      const savedCourse = await response.json();

      if (editingId) {
        // Update existing course in state
        setCourses((currentCourses) =>
          currentCourses.map((course) =>
            course.id === editingId ? savedCourse : course
          )
        );
      } else {
        // Add new course to state
        setCourses((currentCourses) => [
          ...currentCourses,
          savedCourse,
        ]);
      }

      // Reset form
      setFormData({
        slug: "",
        title: "",
        description: "",
        duration: "",
        level: "",
        instructor: "",
        featured: false,
      });

      setEditingId(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Start editing
  const handleEdit = (course) => {
    setEditingId(course.id);

    setFormData({
      slug: course.slug,
      title: course.title,
      description: course.description,
      duration: course.duration,
      level: course.level,
      instructor: course.instructor,
      featured: course.featured,
    });

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // Delete course
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/courses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course.");
      }

      // Remove deleted course from UI
      setCourses((currentCourses) =>
        currentCourses.filter((course) => course.id !== id)
      );

      // If deleted course was being edited, reset the form
      if (editingId === id) {
        setEditingId(null);

        setFormData({
          slug: "",
          title: "",
          description: "",
          duration: "",
          level: "",
          instructor: "",
          featured: false,
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const featuredCourses = courses.filter(
    (course) => course.featured
  );

  return (
    <section className="mt-16">
      <SectionTitle title="Featured Courses" />

      {loading && (
        <p className="text-center py-8">
          Loading courses...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 py-4">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="mt-12">
        <SectionTitle
          title={editingId ? "Edit Course" : "Add New Course"}
        />

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-4"
        >
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="title"
            placeholder="Course title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <textarea
            name="description"
            placeholder="Course description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration e.g. 12 Weeks"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="level"
            placeholder="Level e.g. Beginner"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <input
            type="text"
            name="instructor"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />

            Featured course
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded"
            >
              {editingId ? "Update Course" : "Add Course"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setFormData({
                    slug: "",
                    title: "",
                    description: "",
                    duration: "",
                    level: "",
                    instructor: "",
                    featured: false,
                  });
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}