"use client";

import { useState } from "react";

import courses from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import SectionTitle from "@/components/SectionTitle";
import SearchBar from "@/components/SearchBar";

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SectionTitle title="All Courses" />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {filteredCourses.length === 0 ? (
        <p className="text-center text-xl">
          No courses found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      )}
    </>
  );
}