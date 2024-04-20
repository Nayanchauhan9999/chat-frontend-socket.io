//* convert to time format => eg. 11:30 PM
export function convertToTimeFormat(d: Date): string {
  // Extract hours and minutes from the date
  const date = new Date(d);
  let hours: number = date.getHours();
  let minutes: number = date.getMinutes();

  // Determine if it's AM or PM
  let amOrPm: string = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Pad minutes with leading zero if necessary
  let paddedMinutes: string = minutes < 10 ? "0" + minutes : minutes.toString();

  // Construct the formatted time string
  let formattedTime: string = `${hours}:${paddedMinutes} ${amOrPm}`;

  return formattedTime;
}
