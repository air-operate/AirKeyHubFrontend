import React from "react";

interface authContextData {
  isAuth: boolean;
  setAuth: (item: boolean) => void;
}

export const AuthContext = React.createContext<authContextData>({
  isAuth: false,
  setAuth: () => {},
});
