import React, { createContext, useState, useContext, useEffect } from "react";

export const stateContext = createContext();

const getFreshContext = () => {
  if (localStorage.getItem("context") === null) {
    localStorage.setItem(
      "context",
      JSON.stringify({ participantId: 0, timeTaken: 0, selectOptions: [] })
    );
  }

  return JSON.parse(localStorage.getItem("context"));
};

export default function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
  };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());
  useEffect(() => {}, [context]);

  return (
    <div>
      <stateContext.Provider value={{ context, setContext }}>
        {children}
      </stateContext.Provider>
    </div>
  );
}
