/**
 * Format a date using native Intl.DateTimeFormat
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
const dateFormat = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric"
  },
): string => {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
};

export default dateFormat;
