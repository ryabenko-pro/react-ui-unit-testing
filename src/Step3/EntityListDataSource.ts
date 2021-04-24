import {useEffect, useState} from "react";
import API from "../API";

export const EntityListDataSource = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    const doFetch = async () => {
      setLoading(true)

      const items = await API.get();

      setItems(items.map((item: any) => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        date: item.date,
      })));
      setLoading(false)
    }

    doFetch()
  }

  useEffect(fetchData, [])

  return {
    items,
    loading,
    reFetch: () => fetchData()
  }
}

export default EntityListDataSource