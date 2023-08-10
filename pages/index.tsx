"use client";
import React, { Fragment } from "react";
import { Box } from "@mui/material";
import SearchBus from "../component/search_bus/SearchBus";
import NavTabs from "../component/tabs/NavTab";
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
export default function Home({ destination }: Props) {
  const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Box>
      {status === "unauthenticated" ? (
        <Login />
      ) : (
        <Fragment>
          <SearchBus destinations={destination} />
          <NavTabs />
        </Fragment>
      )}
    </Box>
  );
}
