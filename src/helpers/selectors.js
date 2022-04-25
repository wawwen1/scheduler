export function getAppointmentsForDay(state, day) {
  //only display the data the matches the "day"
  const filteredDays = state.days.filter(res => res.name === day);

  //excludes empty data + compare id with "state.appointment"
  if (filteredDays.length > 0) {
    const appts = filteredDays[0].appointments.map(apptsID => {
      return state.appointments[apptsID];
    });
    //return matched value
    return appts;
  }
  //return empty array
  return filteredDays;
}