import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import useFetchOnePerson from "../../hooks/useFetchOnePerson";
import { Person } from "../../models/Person";

function EditPerson() {
  const {id} = useParams();
  const url = import.meta.env.VITE_DB_PERSONS_URL || "";
  const {person, loading} = useFetchOnePerson(url + "/" + id);
  const [user, setUser] = useState<Person>({id: 0, email: "", role: "", password: "", firstName: "", lastName: ""});
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (person === undefined) {
      return;
    }
    setUser(person);
  }, [person]);

  const submit = () => {
    if (person?.password !== user.password && user.password !== repeatPassword) {
      setMessage("PASSWORDS_DO_NOT_MATCH");
      return;
      }
    fetch("http://localhost:8080/person", {
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

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.trim() === "" && person !== undefined) {
      setUser({...user, password: person?.password});
    } else {
      setUser({...user, password: e.target.value});
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (user === undefined) {
    return <div>Person not found</div>
  }

  return (
    <div>
      <div>{message}</div>
      <div>{JSON.stringify(user)}</div>
      <label>E-mail</label> <br />
      <input onChange={(e) => setUser({...user, email: e.target.value})} defaultValue={user.email} type="text" /> <br />
      <label>Password</label> <br />
      <input onChange={(e) => changePassword(e)} type="text" /> <br />
      <label>Repeat password</label> <br />
      <input onChange={(e) => setRepeatPassword(e.target.value)} type="text" /> <br />
      <label>First Name</label> <br />
      <input onChange={(e) => setUser({...user, firstName: e.target.value})} type="text" defaultValue={user.firstName} /> <br />
      <label>Last Name</label> <br />
      <input onChange={(e) => setUser({...user, lastName: e.target.value})} type="text" defaultValue={user.lastName} /> <br />
      <label>Role</label> <br />
      <select onChange={(e) => setUser({...user, role: e.target.value})} defaultValue={user.role}>
        <option disabled value="">Muuda rolli</option>
        <option>CUSTOMER</option>
        <option>ADMIN</option>
      </select>
      <br />
      <button onClick={submit}>Change</button>
    </div>
  )
}

export default EditPerson