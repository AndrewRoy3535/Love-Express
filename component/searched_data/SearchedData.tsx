import React, { Fragment } from "react";
import { CreateBusType, SearchedDataType } from "../types/types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import SearchResults from "../search_results/SearchResults";
import HelperComponent from "./HelperComponent";
import NavTab from "../tabs/NavTab";
import { tConvert } from "../../utils/utility";

function SearchedData({ data }: SearchedDataType) {
  const [newData, setNewData] = React.useState<[CreateBusType]>();

  React.useEffect(() => {
    setNewData(data);
  }, [data]);

  if (newData === null || newData === undefined) {
    return null;
  }

  if (newData?.length <= 0) {
    return <HelperComponent />;
  }

  const fontstyletable = {
    borderBottom: "1px solid #ccc",
    fontSize: "14px",
    textTransform: "uppercase",
    color: "#ccc",
  };

  return (
    <Fragment>
      {newData?.map((row: CreateBusType, i, passengerInSchedule) =>
        row.fare === 0 ? (
          <div key={i}>
            <NavTab />
          </div>
        ) : (
          <Accordion
            key={row._id}
            sx={{ marginBottom: "15px", boxShadow: "rgb(0,0,0,0.5)" }}>
            <AccordionSummary>
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Date</Typography>
                  <Typography fontSize='14px'>{row.date}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>time</Typography>
                  <Typography fontSize='14px'>{tConvert(row.time)}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Living From</Typography>
                  <Typography fontSize='14px'>{row.livingFrom}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Going To</Typography>
                  <Typography fontSize='14px'>{row.goingTo}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>starting counter</Typography>
                  <Typography fontSize='14px'>{row.startingCounter}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>end counter</Typography>
                  <Typography fontSize='14px'>{row.endCounter}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Price</Typography>
                  <Typography fontSize='14px'>{row.fare}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Coach No</Typography>
                  <Typography fontSize='14px'>{row.coachNo}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Coach class</Typography>
                  <Typography fontSize='14px'>{row.coachClass}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Coach Type</Typography>
                  <Typography fontSize='14px'>{row.coachType}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography sx={fontstyletable}>Reg no</Typography>
                  <Typography fontSize='14px'>
                    {row.registrationNumber}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <SearchResults
                rowId={row._id}
                passengers={row.passengersId}
                price={row.fare || 0}
              />
            </AccordionDetails>
          </Accordion>
        )
      )}
    </Fragment>
  );
}

export default SearchedData;
