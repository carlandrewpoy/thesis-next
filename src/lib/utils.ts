import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (string: string) => {
  const splitStrings = string.split("-").filter(Boolean);
  return splitStrings.map(
    (splitString) =>
      splitString.charAt(0).toUpperCase() + splitString.slice(1) + " "
  );
};

export const dateFormatterName = (dateParam: Date) => {
  const date = new Date(dateParam);
  const formattedDate = date.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};

export function dateFormatterNumber(inputDate: any) {
  // Parse the input date string
  if (inputDate === null || inputDate === "") return null;
  const parsedDate = parse(inputDate, "MMMM d, yyyy", new Date());

  // Format the parsed date in "yyyy-MM-dd" format
  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  return formattedDate;
}

export function getSchoolYears() {
  const currentYear = new Date().getFullYear();
  const schoolYears = [];

  for (let i = currentYear; i >= currentYear - 10; i--) {
    const nextYear = i + 1;
    const schoolYear = `${i}-${nextYear}`;
    schoolYears.push(schoolYear);
  }

  return schoolYears;
}