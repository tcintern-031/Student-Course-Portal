export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-lg font-semibold text-gray-600">
        Loading...
      </p>
    </div>
  );
}