import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const formatTime = () => {
    let time = "";

    if (props.time === undefined) {
      time = "No Appointments"
      return time;
    } else {
      time = `Appointment at ${props.time}`
      return time;
    }
  }

  return (
    <article className="appointment">
      {formatTime(props.time)}
    </article>
  );
}