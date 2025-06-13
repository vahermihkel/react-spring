import { ReactNode, useState } from "react"
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("token") === "suvalised-tähed-märgid-numbrid");

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem("token", "suvalised-tähed-märgid-numbrid");
  }

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{loggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}