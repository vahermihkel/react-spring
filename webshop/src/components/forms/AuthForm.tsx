import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Person } from "../../models/Person";

function AuthForm(params: {action: string}) {
  const [user, setUser] = useState<Person>({email: "", password: "", firstName: "", lastName: ""});
  const [repeatPassword, setRepeatPassword] = useState("");
  // const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  // const endpoint = params.action === "login" ? "login" : "signUp";
  // const url = `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${apiKey}`;
  const url = "http://localhost:8080/" + params.action;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const submit = () => {
    if (params.action === "signup") {
      if (user.password !== repeatPassword) {
          setMessage("PASSWORDS_DO_NOT_MATCH");
          return;
      }
    }

    fetch(url, {
      method: "POST", 
      body: JSON.stringify(user), 
      headers: {"Content-Type": "application/json"}})
      .then(res => res.json())
      .then(json => {
        if (json.message !== undefined && json.timestamp !== undefined && json.statusCode !== undefined) {
          setMessage(json.message);
          return;
        } 

        if (params.action === "signup") {
          navigate("/login");
        } else if (params.action === "login") {
          navigate("/admin");
          sessionStorage.setItem("token", json.token);
          login();
        }
      })
  }

  return (
    <div>
      <div>{message}</div>
      <div>{JSON.stringify(user)}</div>
      <label>E-mail</label> <br />
      <input onChange={(e) => setUser({...user, email: e.target.value})} type="text" /> <br />
      <label>Password</label> <br />
      <input onChange={(e) => setUser({...user, password: e.target.value})} type="text" /> <br />
      {params.action === "signup" &&
      <>
        <label>Repeat password</label> <br />
        <input onChange={(e) => setRepeatPassword(e.target.value)} type="text" /> <br />
        <label>First Name</label> <br />
        <input onChange={(e) => setUser({...user, firstName: e.target.value})} type="text" /> <br />
        <label>Last Name</label> <br />
        <input onChange={(e) => setUser({...user, lastName: e.target.value})} type="text" /> <br />
      </>}
      <button onClick={submit}>{params.action === "login" ? "Login": "Signup"}</button>
    </div>
  )
}

export default AuthForm