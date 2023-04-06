import React, { useContext } from "react";
import CreateBusSchedule from "../component/create_bus_schedule/CreateBusSchedule";
import CreateUser from "../component/create_user/CreateUser";
import FormHeader from "../component/form_header/FormHeader";
import ScheduleContext from "../context/ScheduleContext";
import UserContext from "../context/UserContext";

function utility() {
  const { schedules } = useContext(ScheduleContext);
  const { users } = useContext(UserContext);
  const scheduleCounts = schedules.length;
  const userCount = users.length;

  return (
    <>
      <FormHeader
        title='Create user'
        description='Fill out this form bellow to create new user'
        count={userCount}
      />
      <CreateUser />
      <FormHeader
        title='Create schedule'
        description='Fill out this form bellow to create new bus schedule'
        count={scheduleCounts}
      />
      <CreateBusSchedule />
    </>
  );
}
console.log("Utility");

export default utility;
