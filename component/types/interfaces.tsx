import React from "react";
import { SelectChangeEvent } from "@mui/material";
import { CreateBusType, CreateUserTypes, Users } from "./types";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AppBarProps {
  toggleDrawer?: () => void;
}

export interface CreateBusProps {
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  inputScheduleRef: CreateBusType;
  handleDateChange?: any;
}

export interface SetBusScheduleType {
  busSchedule: CreateBusType;
  setBusSchedule: React.Dispatch<React.SetStateAction<CreateBusType>>;
  schedules: CreateBusType[];
  setSchedules: (schedules: CreateBusType[]) => void;
  showSchedules: boolean;
  setShowSchedules: (modal: boolean) => void;
  handleOpenSchedules: () => void;
  handleCloseSchedules: () => void;
  isSuccSdl: boolean;
  setIsSuccSdl: (isSuccSdl: boolean) => void;
}

export interface CreateBusContextTypes {
  user: CreateUserTypes;
  setUser: (user: CreateUserTypes) => void;
  users: Users[];
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
  showUser: any;
  setShowUsers: (showUser: any) => void;
  handleCloseUsers: () => void;
  handleOpenUsers: () => void;
}
