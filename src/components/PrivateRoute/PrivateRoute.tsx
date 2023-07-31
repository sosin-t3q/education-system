//Ver1.
// import { ReactNode } from "react";
// import { useKeycloak } from "@react-keycloak/web";

// const PrivateRoute = ({ children }:{children: ReactNode}) => {
    
//     const { keycloak } = useKeycloak();
//     const isLoggedIn = keycloak.authenticated;

//     return isLoggedIn ? children : null;
// };

// export default PrivateRoute;

//Ver2.
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, ReactNode } from 'react';

const PrivateRoute = ({ children }:{ children: ReactNode }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  useEffect(() => {
    if (!isLoggedIn) {
      keycloak.login();
    }
  }, [isLoggedIn, keycloak]);

  if (!isLoggedIn) {
    return <div>Loading...</div>
  }

  return children;
};

export default PrivateRoute;
