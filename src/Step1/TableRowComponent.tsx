import TableConfig from "./TableConfig";

interface TableRowProps {
    config: TableConfig
    item: any
}

const TableRowComponent = ({config, item}: TableRowProps) => {
    return (
        <tr data-testid="row" className={config.classResolver(item)}>
            {config.columns.map(col => (
                <td key={`td-${col.key}`} data-testid={`td-${col.key}`}>{item[col.key]}</td>
            ))}
        </tr>
    )
}


export default TableRowComponent