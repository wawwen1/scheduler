import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    setMode(mode);
    
    if (replace) {
      setHistory((prev) => {
        return [...prev.slice(0, -1), mode];
      });
      return;
    }
    
    setHistory(prev => [...prev, mode]);
  };

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        return [...prev.slice(0, -1)];
      });
      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}
