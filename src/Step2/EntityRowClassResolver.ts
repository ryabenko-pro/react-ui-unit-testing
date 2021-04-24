import moment from "moment";

const getClassForItem = (item: {date: string}) => {
  const days = moment(item.date).diff(moment(), 'days')

  if (isNaN(days)) {
    return undefined
  }

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

export default getClassForItem