import dayjs from "dayjs";
import { Types } from "mongoose";

export type CreateUserTypes = {
  _id?: string;
  name?: string;
  password?: string;
  confirmpassword?: string;
  admin?: boolean;
};

export type CreateBusType = {
  dateAndTime: dayjs.Dayjs | null;
  date: string;
  time: string;
  coachType: string;
  coachCategory: string;
  coachNo: string;
  startingCounter: string;
  endCounter: string;
  registrationNumber: string;
  coachClass: string;
  fare: number | null;
  livingFrom: string;
  goingTo: string;
};

export type Users = {
  _id: string;
  name: string;
  admin: boolean;
};

export type PassengerType = {
  scheduleId: Types.ObjectId | string;
  passengername: string;
  gender: string;
  address: string;
  boardngpoint: string;
  dropingpoint: string;
  totalamonut: number;
  mobile: string;
  email: string;
  age: number;
  seats: Array<string>;
  cancel: boolean;
};

export type BookingContextType = {
  passenger: PassengerType;
  setPassenger: React.Dispatch<React.SetStateAction<PassengerType>>;
};
