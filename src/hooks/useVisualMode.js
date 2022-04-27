import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory((prev) => {
    if (replace) {
        return [...prev.slice(0, -1), mode];
      }
     return [...prev, mode];
    });
    setMode(mode);
  }

  function back() {
    setHistory((prev) => {
      if (history.length > 1) {
        const lastHistory = [...prev.slice(0, -1)];
        setMode(lastHistory[lastHistory.length - 1]);
        return lastHistory;
      }
    });
  }
  return { mode, transition, back };
}
