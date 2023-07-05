import React from "react";
import { useRouter } from "next/router";
import { CreateBusType, SearchedDataType } from "../types/types";
import { Table, TableRow, TableCell, TableHead } from "@material-ui/core";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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

  return (
    <>
      {newData?.map((row: CreateBusType, i, passengerInSchedule) =>
        row.fare === 0 ? (
          <div key={i}>
            <NavTab />
          </div>
        ) : (
          <Accordion key={row._id} sx={{ margin: "15px" }}>
            <AccordionSummary>
              <Table aria-label='data table' component='tbody'>
                <TableHead>
                  <TableRow component='tr'>
                    <TableCell component='th' style={{ fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Time
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Starting Counter
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Ending Counter
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Living From
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Price
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Cocah Type
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Coach Category
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Coach Class
                    </TableCell>
                    <TableCell
                      component='th'
                      align='center'
                      style={{ fontWeight: "bold" }}>
                      Registration No.
                    </TableCell>
                    <TableCell
                      component='th'
                      align='right'
                      style={{ fontWeight: "bold" }}>
                      Going To
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableRow component='tr'>
                  <TableCell component='th'>{row.date}</TableCell>
                  <TableCell component='th' align='center'>
                    {tConvert(row.time)}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.startingCounter}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.endCounter}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.livingFrom}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.fare}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.coachType}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.coachCategory}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.coachClass}
                  </TableCell>
                  <TableCell component='th' align='center'>
                    {row.registrationNumber}
                  </TableCell>
                  <TableCell component='th' align='right'>
                    {row.goingTo}
                  </TableCell>
                </TableRow>
              </Table>
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
    </>
  );
}

export default SearchedData;
