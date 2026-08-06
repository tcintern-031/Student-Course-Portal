export default function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition ${className}`}
    >
      {children}
    </button>
  );
}