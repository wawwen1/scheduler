import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    setHistory((history) => {
      if (replace) {
        const newHistory = [...history];
        newHistory.splice(-1 ,1, mode);
        return newHistory;
      } else {
        return [...history, mode];
      }
    })
  }

  function back() {
    setHistory((history) => {
      if (mode === initial) {
        return;
      }
      const newHistory = [...history].slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }

  return { mode, transition, back };
}
