import cc, { Class } from "classcat";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Class[]) {
  return twMerge(cc(inputs));
}
