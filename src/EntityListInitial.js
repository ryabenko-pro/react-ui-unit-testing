import {useEffect, useState} from 'react'
import moment from 'moment'
import API from './API/index'

const EntityListInitial = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    const doFetch = async () => {
      setLoading(true)

      setItems(await API.get());
      setLoading(false)
    }

    doFetch()
  }

  useEffect(fetchData, [])

  const getClassForItem = (item) => {
    const days = moment(item.date).diff(moment(), 'days')

    if (days < 0) {
      return 'danger'
    }

    if (days < 3) {
      return 'warning'
    }

    if (days > 30) {
      return 'success'
    }
  }

  if (loading) {
    return <div>
      <i>Loading...</i>
    </div>
  }

  return (
    <div>
      <h1>List of clients</h1>

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
          <tr key={item.id} className={'table-' + getClassForItem(item)}>
            <td>{`${item.first_name} ${item.last_name}`}</td>
            <td>{item.email}</td>
            <td>{item.date}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default EntityListInitial