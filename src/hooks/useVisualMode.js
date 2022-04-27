import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      setHistory((prev) => {
        return [...prev.slice(0, -1), mode];
      });
    } else {
      return [...prev, mode];
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        return [...prev.slice(0, -1)];
      });
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
