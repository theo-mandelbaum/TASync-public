import { createContext, useContext, useState } from "react";

const MeetingDataContext = createContext({
  group: null,
  setGroup: () => {},
  //   isLoading: true,
  //   isError: false,
});
export default function GroupCheckProvider({ children }) {
  const [group, setGroup] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [isError, setIsError] = useState(false);
  return (
    <MeetingDataContext.Provider value={{ group, setGroup }}>
      {children}
    </MeetingDataContext.Provider>
  );
}

export function useGroupCheck() {
  const context = useContext(MeetingDataContext);
  if (!context) {
    throw new Error("useGroupCheck must be used within a GroupCheckProvider");
  }
  return context;
}
