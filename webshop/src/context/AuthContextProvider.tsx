import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token") === "") {
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/person", {
      headers: {
        "Authorization" : "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.email && json.role) {
          setLoggedIn(true);
          setRole(json.role);
        }
        setLoading(false);
      })
  }, []);

  const login = (jsonToken: string, role: string) => {
    setLoggedIn(true);
    setRole(role);
    sessionStorage.setItem("token", jsonToken);
  }

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{role, loggedIn, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}