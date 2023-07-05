import React, { useContext } from "react";
import SearchedData from "../component/searched_data/SearchedData";
import ScheduleContext from "../context/ScheduleContext";
import SearchBus from "../component/search_bus/SearchBus";
import axios from "axios";

type Props = {
  destination: Array<{ place: string; _id: string }>;
};

function Searches({ destination }: Props) {
  const { searchedBusData } = useContext(ScheduleContext);
  return (
    <>
      <SearchBus destinations={destination} />
      <SearchedData data={searchedBusData} />
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
