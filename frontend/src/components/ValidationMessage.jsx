export default function ValidationMessage({ children }) {
  if (!children) return null;
  return <p className="text-sm text-red-500 mt-1">{children}</p>;
}
