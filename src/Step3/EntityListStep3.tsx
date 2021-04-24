import TableComponent from "./TableComponent";
import EntityListDataSource from "./EntityListDataSource";
import EntityListTableConfig from "./EntityListTableConfig";

const EntityListStep3 = () => {
  const {items, loading, reFetch} = EntityListDataSource()

  if (loading) {
    return <div>
      <i data-testid='loading'>Loading...</i>
    </div>
  }

  const config = new EntityListTableConfig()

  return (
    <div data-testid="section" >
      <h1>List of clients (Step 3)</h1>

      <button type="button" data-testid='refresh-button' onClick={reFetch}>Click to refresh</button>

      <TableComponent config={config} items={items} />
    </div>
  )
}

export default EntityListStep3