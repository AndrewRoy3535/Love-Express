import { Box } from "@mui/material";
import SearchBus from "../component/search_bus/SearchBus";
import NavTabs from "../component/tabs/NavTab";
import SearchResults from "../component/search_results/SearchResults";
export default function Home() {
  return (
    <Box>
      <SearchBus />
      {/* <NavTabs /> */}
      <SearchResults />
    </Box>
  );
}
