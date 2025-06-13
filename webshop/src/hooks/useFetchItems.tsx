import { useEffect, useState } from "react";

function useFetchItems(url: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setItems(json || []);
        // setLoading(false);
      })
  }, [url]);

  return (
    items
  )
}

export default useFetchItems