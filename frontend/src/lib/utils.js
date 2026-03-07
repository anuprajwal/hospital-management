import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Get initials from a name (e.g. "John Doe" -> "JD", "admin" -> "A") */
export function getInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2);
  }
  return name.slice(0, 2).toUpperCase() || "?";
}
