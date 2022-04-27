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
    const day = state.days.find((day) => day.name === state.day);
    const dayApps = day.appointments.map((app) => state.appointments[app]);

    let spots = 0;
    for (let app of dayApps) {
      if (!app.interview) {
        spots++;
      }
    }
    return spots;
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

    const spots = updateSpots(state);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: spots
      }).catch((err) => console.log(err));
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

    const spots = updateSpots(state)

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointment,
        days: spots
      }).catch((err) => console.log(err));
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
