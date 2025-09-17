import { createContext } from "react";

export const AuthContext = createContext({
  role: "",
  loggedIn: false,
  loading: false,
  login: (token: string, role: string) => {console.log(token); console.log(role)},
  logout: () => {}
});
