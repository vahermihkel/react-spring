import { useEffect, useState } from "react"
import { Person } from "../../models/Person";

function Profile() {
  const [user, setUser] = useState<Person>({id: 0, email: "", role: "", password: "", firstName: "", lastName: ""});
  const url = import.meta.env.VITE_DB_BASE_URL || "";

  useEffect(() => {
    fetch(url + "/profile", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setUser(json))
  }, [url]);

  const update = () => {
    fetch(url + "/profile", {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => alert("Muudetud!"))
  }

  if (user.email === "" && user.password === "") {
    return <div>User not found</div>
  }

  return (
    <div>
      <label>First Name</label> <br />
      <input defaultValue={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})} type="text" /> <br />
      <label>Last Name</label> <br />
      <input defaultValue={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})} type="text" /> <br />
      <label>E-mail</label> <br />
      <input disabled value={user.email} type="text" /> <br />
      <button onClick={update}>Update</button>
    </div>
  )
}

export default Profile