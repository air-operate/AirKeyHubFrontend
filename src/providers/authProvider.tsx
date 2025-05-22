import React from "react";
import { AuthContext } from "../typings/global/authContext";

const AuthProvider = ({ children }: any) => {
  const [isAuth, setAuth] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth(item) {
          setAuth(item);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
