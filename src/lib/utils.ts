import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const logObject = (obj: unknown) => {
  console.log(JSON.stringify(obj, null, 2));
};