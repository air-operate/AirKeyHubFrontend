import React from "react";
import { RoleContext } from "src/typings/global/roleContext";

const RoleProvider = ({ children }: any) => {
  const [role, setRole] = React.useState("");

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole(item) {
          setRole(item);
        },
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;
