import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "N/A";

  const d = typeof date === "string" ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(d.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

export function formatTimeLeft(progress: number): string {
  if (progress >= 100) return "Completed";

  // Calculate remaining time based on progress percentage
  // This is a simplified calculation
  const remainingPercentage = 100 - progress;

  if (remainingPercentage <= 10) {
    return "Less than 30 min";
  } else if (remainingPercentage <= 30) {
    return "1-2 hours";
  } else if (remainingPercentage <= 50) {
    return "2-3 hours";
  } else if (remainingPercentage <= 70) {
    return "3-5 hours";
  } else {
    return "5+ hours";
  }
}
export function getHeaders(): Record<string, string> {
  const token = getTokenFromCookie();
  const headers: Record<string, string> = {
    ...{ "Content-Type": "application/json" },
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
  return headers;
}
export function getTokenFromCookie(): string | null {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1];
  return token ? token : null;
}
