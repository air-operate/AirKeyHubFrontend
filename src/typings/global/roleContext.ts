import React from "react";

interface roleContextData {
  role: string;
  setRole: (item: string) => void;
}

export const RoleContext = React.createContext<roleContextData>({
  role: "",
  setRole: () => {},
});
