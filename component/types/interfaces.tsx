import React from "react";
import { SelectChangeEvent } from "@mui/material";
import { CreateBusType, CreateUserTypes, Users, SearchBusTypes } from "./types";

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
  destinations?: Array<{ place: string; _id: string }>;
}

export interface SetBusScheduleType {
  busSchedule: CreateBusType;
  setBusSchedule: React.Dispatch<React.SetStateAction<CreateBusType>>;
  schedules: CreateBusType[];
  setSchedules: React.Dispatch<React.SetStateAction<CreateBusType[]>>;
  showSchedules: boolean;
  setShowSchedules: (modal: boolean) => void;
  handleOpenSchedules: () => void;
  handleCloseSchedules: () => void;
  isSuccSdl: boolean;
  setIsSuccSdl: (isSuccSdl: boolean) => void;
  searchedBusData: [CreateBusType];
  setSearchedBusData: React.Dispatch<React.SetStateAction<[CreateBusType]>>;
  handleSubmitsb: () => Promise<void>;
  searchBus: SearchBusTypes;
  setSearchBus: React.Dispatch<React.SetStateAction<SearchBusTypes>>;
  totalTodaySale: number;
  setTotalTodaySale: React.Dispatch<React.SetStateAction<number>>;
  fetchDataSchedule: () => Promise<void>;
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
  fetchDataUser: () => Promise<void>;
}
