"use client";
import React, { useContext } from "react";
import SearchedData from "../component/searched_data/SearchedData";
import ScheduleContext from "../context/ScheduleContext";
import SearchBus from "../component/search_bus/SearchBus";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Login from "./login";
import Loading from "../component/loading/Loading";

type Props = {
  destination: Array<{ place: string; _id: string }>;
};

function Searches({ destination }: Props) {
  const { status, data: session } = useSession({ required: true });
  const { searchedBusData } = useContext(ScheduleContext);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <>
          <SearchBus destinations={destination} />
          <SearchedData data={searchedBusData} />
        </>
      )}
    </>
  );
}

export async function getStaticProps() {
  const response = await axios.get("http://localhost:3000/api/destinations");
  const data = await response.data;
  return {
    props: { destination: data },
  };
}

export default Searches;