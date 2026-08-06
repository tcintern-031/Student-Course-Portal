export default function InstructorCard({ instructor }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
        {instructor.name.charAt(0)}
      </div>

      <h3 className="text-2xl font-bold">
        {instructor.name}
      </h3>

      <p className="text-blue-600 font-semibold">
        {instructor.specialization}
      </p>

      <p className="mt-3 text-gray-600">
        {instructor.bio}
      </p>
    </div>
  );
}