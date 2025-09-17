import { useEffect, useState } from "react";
import { Person } from "../models/Person";

function useFetchOnePerson(url: string) {
  const [person, setPerson] = useState<Person>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, {
      headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        if (json.message !== undefined && json.timestamp !== undefined && json.statusCode !== undefined) {
          return;
        } 
        setPerson(json);
      })
  }, [url]);

  return (
    {person, loading}
  )
}

export default useFetchOnePerson