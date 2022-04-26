export function getAppointmentsForDay(state, day) {
  //only display the data the matches the "day"
  const filteredDays = state.days.filter((res) => res.name === day);

  //excludes empty data + compare id with "state.appointment"
  if (filteredDays.length > 0) {
    const appointmentId = filteredDays[0].appointments.map((id) => {
      return state.appointments[id];
    });
    //return matched value
    return appointmentId;
  }
  //return empty array
  return filteredDays;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const results = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return results;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((res) => res.name === day);
  if (filteredDays.length > 0) {
    const interviewersId = filteredDays[0].interviewers.map((id) => {
      return state.inteviewers[id];
    });

    return interviewersId;
  }

  return filteredDays;
}
