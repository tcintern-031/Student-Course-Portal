import instructors from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";
import SectionTitle from "@/components/SectionTitle";

export default function InstructorsPage() {
  return (
    <>
      <SectionTitle title="Our Instructors" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <InstructorCard
            key={instructor.id}
            instructor={instructor}
          />
        ))}
      </div>
    </>
  );
}