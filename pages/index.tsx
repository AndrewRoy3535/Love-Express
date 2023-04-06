import { Box } from "@mui/material";
import SearchBus from "../component/search_bus/SearchBus";
import NavTabs from "../component/tabs/NavTab";
export default function Home() {
  return (
    <Box>
      <SearchBus />
      <NavTabs />
    </Box>
  );
}
