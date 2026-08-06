"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search courses..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg p-3 mb-8 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}