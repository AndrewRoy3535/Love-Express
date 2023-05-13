import React, { useContext } from "react";
import { Box } from "@mui/material";
import SearchBus from "../component/search_bus/SearchBus";
import NavTabs from "../component/tabs/NavTab";
import SearchResults from "../component/search_results/SearchResults";
import SearchedData from "../component/searched_data/SearchedData";
import ScheduleContext from "../context/ScheduleContext";

export default function Home() {
  const { searchedBusData } = useContext(ScheduleContext);
  return (
    <Box>
      <SearchBus />
      {/* <NavTabs /> */}
      {/* <SearchResults /> */}
      <SearchedData data={searchedBusData} />
    </Box>
  );
}
