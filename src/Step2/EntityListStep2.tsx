import {useEffect, useState} from 'react'
import API from '../API/index'
import TableConfig, {TableColumnConfig} from "./TableConfig";
import TableComponent from "./TableComponent";
import getClassForItem from "./EntityRowClassResolver";


const EntityListStep2 = () => {
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

  const config = new TableConfig([
    new TableColumnConfig('name', 'Name'),
    new TableColumnConfig('email', 'Email'),
    new TableColumnConfig('date', 'Next contact date'),
  ], 'table', getClassForItem)

  if (loading) {
    return <div>
      <i>Loading...</i>
    </div>
  }

  return (
    <div>
      <h1>List of clients (Step 2)</h1>

      <button type="button" data-testid='refresh-button' onClick={fetchData}>Click to refresh</button>

      <TableComponent config={config} items={items} />
    </div>
  )
}

export default EntityListStep2