import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {
    let spots = "";

    if (props.spots === 0) {
      spots = "no spots remaining";
      return spots;
    } else if (props.spots === 1) {
      spots = `${props.spots} spot remaining`;
      return spots;
    } else {
      spots = `${props.spots} spots remaining`;
      return spots;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}