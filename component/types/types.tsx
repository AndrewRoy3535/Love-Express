import dayjs from "dayjs";

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
