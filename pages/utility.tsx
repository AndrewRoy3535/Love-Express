"use client";
import React, { useContext, useState, Fragment } from "react";
import CreateBusSchedule from "../component/create_bus_schedule/CreateBusSchedule";
import CreateUser from "../component/create_user/CreateUser";
import FormHeader from "../component/form_header/FormHeader";
import ScheduleContext from "../context/ScheduleContext";
import UserContext from "../context/UserContext";
import AddDestinations from "../component/add_destinations/AddDestinations";
import axios from "axios";
import { useSession } from "next-auth/react";
import Login from "./login";
import Loading from "../component/loading/Loading";
import { apiUri, axiosOption } from "../utils/utility";

function Utility() {
  const { data: session, status } = useSession({ required: true });

  const { schedules } = useContext(ScheduleContext);
  const { users } = useContext(UserContext);
  const [changevalue, setChangevalue] = useState("");
  const [destination, setDestination] = useState<
    [{ place: string; _id: string }]
  >([{ place: "place", _id: "_id" }]);
  const scheduleCounts = schedules.length;
  const userCount = users.length;

  const addDes = async () => {
    await axios.post(`${apiUri}/api/destinations`, {
      place: changevalue,
    });
    setChangevalue("");
    fetchDes();
  };
  const fetchDes = async () => {
    const res = await axios
      .get(`${apiUri}/api/destinations`, axiosOption)
      .catch((err) => {
        console.log(err);
      });
    const data = res?.data;
    setDestination(data);
    setChangevalue("");
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <Fragment>
      <FormHeader
        title='Create User'
        description='Fill out this form bellow to create new user'
        count={userCount}
      />
      <CreateUser />
      <FormHeader
        title='Create Schedule'
        description='Fill out this form bellow to create new bus schedule'
        count={scheduleCounts}
      />
      <CreateBusSchedule destinations={destination} />
      <FormHeader
        title='Add Destinations'
        description='Add Destinations for Living from and Going to'
      />
      <AddDestinations
        addDes={addDes}
        fetchDes={fetchDes}
        changevalue={changevalue}
        setChangevalue={setChangevalue}
        destination={destination}
      />
    </Fragment>
  );
}

export default Utility;
