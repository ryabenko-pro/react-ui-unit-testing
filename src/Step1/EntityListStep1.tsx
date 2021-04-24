import {useEffect, useState} from 'react'
import moment from 'moment'
import API from '../API/index'
import TableRowComponent from "./TableRowComponent";
import TableConfig, {TableColumnConfig} from "./TableConfig";

const EntityListStep1 = () => {
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

  const getClassForItem = (item: any) => {
    const days = moment(item.date).diff(moment(), 'days')

    if (days < 0) {
      return 'table-danger'
    }

    if (days < 3) {
      return 'table-warning'
    }

    if (days > 30) {
      return 'table-success'
    }
  }

  const config = new TableConfig([
    new TableColumnConfig('name', 'Name'),
    new TableColumnConfig('email', 'Email'),
    new TableColumnConfig('date', 'Next contact date'),
  ], getClassForItem)

  if (loading) {
    return <div>
      <i>Loading...</i>
    </div>
  }

  return (
    <div>
      <h1>List of clients (Step 1)</h1>

      <button type="button" data-testid='refresh-button' onClick={fetchData}>Click to refresh</button>

      <table className="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Next contact date</th>
        </tr>
        </thead>

        <tbody>
        {items.map(item => (
          <TableRowComponent config={config} item={item}/>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default EntityListStep1