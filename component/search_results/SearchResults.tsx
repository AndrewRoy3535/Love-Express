import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomerForm from "../customer_form/CustomerForm";
import { PassengerType } from "../types/types";
import PassengerList from "./PassengerList";

type Props = {
  rowId?: string;
  passengers: any;
  price: number;
};

function SearchResults({ rowId, passengers, price }: Props) {
  const numb = Array.from(Array(10)).map((_, i) => i + 65);
  const alphabets = numb.map((el, i) => String.fromCharCode(el));
  const [passenger, setPassenger] = useState<PassengerType>({
    scheduleId: "",
    passengername: "",
    gender: "",
    address: "",
    boardngpoint: "",
    dropingpoint: "",
    totalamonut: 0,
    mobile: "",
    email: "",
    age: 0,
    seats: [],
    cancel: false,
  });

  const { seats } = passenger;
  const totalPrice = seats.length * price;
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

  function compareSeats(seat: any) {
    const isSeatTaken = passengers?.some((el: any) => el.seats.includes(seat));
    return isSeatTaken;
  }

  return (
    <Box className='seat_container_head'>
      <Box>
        {alphabets.map((al, ind) => {
          return (
            <Box className='seat_container' key={ind + al}>
              {Array.from(Array(4)).map((_, i) => {
                const seat = `${al}${i + 1}`;
                const isSeatSelected = seats.includes(seat);
                const seatClass = isSeatSelected ? "selected" : "";
                return (
                  <Button
                    variant='outlined'
                    disabled={compareSeats(seat) ? true : false}
                    key={i}
                    onClick={() => selectSeats(seat)}
                    className={`seat_box_container ${
                      i === 1 ? "seat_box_container_space" : ""
                    } ${seatClass} ${compareSeats(seat) ? "booked" : ""}`}>
                    {seat}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <CustomerForm
        passenger={passenger}
        setPassenger={setPassenger}
        scheduleId={rowId}
        totalPrice={totalPrice}
      />
      <PassengerList passengers={passengers} />
    </Box>
  );
}

export default SearchResults;
