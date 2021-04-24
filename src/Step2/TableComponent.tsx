import TableConfig from "./TableConfig";
import TableRowComponent from "../Step2/TableRowComponent";

interface TableProps {
    config: TableConfig
    items: {id: any}[]
}

const TableComponent = ({config, items}: TableProps) => {
    return (
      <table data-testid="table" className={config.className}>
        <thead>
        <tr data-testid="header">
          {config.columns.map(column => <th data-testid={`th-${column.key}`} key={column.key}>{column.title}</th>)}
        </tr>
        </thead>

        <tbody data-testid="body">
        {items.map(item => (
          <TableRowComponent key={item.id} config={config} item={item}/>
        ))}
        </tbody>
      </table>
    )
}


export default TableComponent