import React, { useContext, useState } from "react";
import BookingContext from "../../context/BookingContext";
import { Box, Typography } from "@mui/material";
import CustomerForm from "../customer_form/CustomerForm";

function SearchResults() {
  const numb = Array.from(Array(10)).map((el, i) => i + 65);
  const alphabets = numb.map((el, i) => String.fromCharCode(el));

  const { passenger, setPassenger } = useContext(BookingContext);
  const { seats } = passenger;

  const selectSeats = (seat: string) => {
    const findSeat = seats.find((el) => seat === el);
    if (findSeat === undefined) {
      setPassenger((preVal) => {
        return {
          ...preVal,
          seats: [...seats, seat],
        };
      });
    } else {
      const updatedSeat = seats.filter((el) => el !== seat);
      setPassenger((preVal) => {
        return {
          ...preVal,
          seats: updatedSeat,
        };
      });
    }
  };

  console.log(passenger);

  return (
    <Box className='seat_container_head'>
      <Box>
        {alphabets.map((al, ind) => {
          return (
            <Box className='seat_container' key={ind + al}>
              {Array.from(Array(4)).map((el, i) => {
                const seat = `${al}${i + 1}`;
                const isSeatSelected = seats.includes(seat);
                const seatClass = isSeatSelected ? "selected" : "";
                return (
                  <div
                    key={i}
                    onClick={() => selectSeats(seat)}
                    className={`seat_box_container ${
                      i === 1 ? "seat_box_container_space" : ""
                    } ${seatClass}`}>
                    <Typography>{seat}</Typography>
                  </div>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <CustomerForm />
    </Box>
  );
}

export default SearchResults;
