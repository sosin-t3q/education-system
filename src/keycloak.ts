import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://aihunmin-edu.t3q.ai:8080/",
 realm: "t3q_ai_edu",
 clientId: "common",
});

export default keycloak;