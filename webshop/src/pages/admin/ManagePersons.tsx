import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Person } from "../../models/Person";
import { Link } from "react-router-dom";

function ManagePersons() {
  const { t } = useTranslation();
  const [persons, setPersons] = useState<Person[]>([]);
  // const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const url = import.meta.env.VITE_DB_PERSONS_URL || "";
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(url, {headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    }})
      .then(res => res.json())
      .then(json => {
        setPersons(json);
      })
  }, [url]);

  const searchFromPersons = () => {
    const searchInput = searchRef.current;
    if (searchInput === null) {
      return;
    }
    // const result = dbPersons.filter(person => 
    //   person.email.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    //   person.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    //   person.lastName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    //   person.id.toString().includes(searchInput.value)
    // );
    // setPersons(result);
    fetch("http://localhost:8080/find-persons?searchTerm=" + searchInput.value, {
      headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    }})
      .then(res => res.json())
      .then(json => {
        setPersons(json);
      })
  }

   return (
    <div>
      <input type="text" ref={searchRef} onChange={searchFromPersons} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("person.email")}</th>
            <th>{t("person.firstName")}</th>
            <th>{t("person.lastName")}</th>
            <th>{t("person.role")}</th>
            <th>{t("person.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {persons.map(person => 
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.email}</td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.role}</td>
            <td>
              <Link to={"/admin/edit-person/" + person.id}>
                <button>Edit</button>
              </Link>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}


export default ManagePersons