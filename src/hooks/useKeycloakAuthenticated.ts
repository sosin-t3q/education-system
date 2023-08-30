import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web'

function useKeycloakAuthenticated() {
  const [isKeycloakAuthenticated, setIsKeycloakAuthenticated] = useState(false);
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      setIsKeycloakAuthenticated(true);
    } else {
      setIsKeycloakAuthenticated(false);
    }
  }, [keycloak.authenticated]);

  return isKeycloakAuthenticated;
}

export default useKeycloakAuthenticated;