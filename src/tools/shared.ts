import { format } from "date-fns";

export const displayDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
}

export const displayDateTime = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}