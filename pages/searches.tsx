"use client";
import React, { useContext, Fragment } from "react";
import SearchedData from "../component/searched_data/SearchedData";
import ScheduleContext from "../context/ScheduleContext";
import SearchBus from "../component/search_bus/SearchBus";
import axios from "axios";
import { useSession } from "next-auth/react";
import Login from "./login";
import Loading from "../component/loading/Loading";
import { apiUri, axiosOption } from "../utils/utility";

type Props = {
  destination: Array<{ place: string; _id: string }>;
};

export async function getServerSideProps({ res }: any) {
  try {
    const response = await axios.get(`${apiUri}/api/destinations`, axiosOption);
    const data = response.data;
    const destination = data || null;
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1800, stale-while-revalidate=86400"
    );

    return {
      props: { destination },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { destination: null },
    };
  }
}

function Searches({ destination }: Props) {
  const { status, data: session } = useSession({ required: true });
  const { searchedBusData } = useContext(ScheduleContext);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Fragment>
      {!session ? (
        <Login />
      ) : (
        <Fragment>
          <SearchBus destinations={destination} />
          <SearchedData data={searchedBusData} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default Searches;
