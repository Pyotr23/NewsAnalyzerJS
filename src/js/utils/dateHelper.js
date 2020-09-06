import { DAYS_AGO_COUNT } from "../constants/api";

export const getDaysAgoString = () => {
  const now = new Date();
  now.setDate(now.getDate() - DAYS_AGO_COUNT);
  return now.toISOString();
}
