import { signIn } from "next-auth/react";

export const apiUri =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// export const apiUri = "http://localhost:3000";

export const axiosOption = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
  timeout: 60000,
};

export function tConvert(time: any) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "am" : "pm"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

export function formatedCreatedDate(a: string) {
  const newstr = a.split("T")[0];
  return newstr;
}

export function fomattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
