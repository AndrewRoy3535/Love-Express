import dayjs from "dayjs";

export type CreateUserTypes = {
  name: string;
  password?: string;
  confirmpassword?: string;
  admin?: boolean;
};

export type CreateBusType = {
  dateAndTime: dayjs.Dayjs | null;
  date: string;
  time: string;
  coachType: string;
  coachNo: string;
  startingCounter: string;
  endCounter: string;
  registrationNumber: string;
  coachClass: string;
  fare: number | null;
  sold: number;
  booked: number;
  available: number | 40;
  livingFrom: string;
  goingTo: string;
};
