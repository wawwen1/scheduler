import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(state) {
    //map through each day
    const newDays = state.days.map((day) => {
      let spots = 0;
      //grab appointments array of each day
      const appointmentsForDay = day.appointments;
      for (let appointmentsId of appointmentsForDay) {
        //use ID to match the appointment
        let selectedAppointment = state.appointments[appointmentsId];
        //find null to increase spots counter
        if (selectedAppointment.interview == null) {
          spots++;
        }
      }
      //spread operator to prevent altering original "day"
      return { ...day, spots };
    });
    //return result of the map
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = { ...state, appointments };
    const updatedDaysArray = updateSpots(newState);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days: updatedDaysArray,
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = { ...state, appointments };
    const updatedDaysArray = updateSpots(newState);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointment,
        days: updatedDaysArray,
      });
    });
  }

  //renders data for days, appointments, interviewers
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
