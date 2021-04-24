import {render} from '@testing-library/react'
import TableConfig, {TableColumnConfig} from "./TableConfig"
import TableComponent from "./TableComponent";

// Array to store renders of TableRowComponenr
const rowCalls: any[] = []

jest.mock('./TableRowComponent', () => ({config, item}: {config: TableConfig, item: {id: any}}) => {
  rowCalls.push({config, item})

  return <tr key={item.id} className="mocked-row"><td>Row</td></tr>
})

function renderComponent(config: TableConfig, items: any[]) {
  return render(<TableComponent config={config} items={items}/>)
}

describe('Table', () => {
  beforeEach(() => {
    // Clean up previous test usage
    rowCalls.length = 0
  })

  it('renders table header', () => {
    const config = new TableConfig([
      new TableColumnConfig('id', 'ID'),
      new TableColumnConfig('name', 'Name'),
    ], 'some-table-class')

    const {getByTestId} = renderComponent(config, [])

    expect(getByTestId('table')).toHaveClass('some-table-class')
    expect(getByTestId('header').querySelectorAll('th')).toHaveLength(2)
    expect(getByTestId('th-id')).toHaveTextContent('ID')
    expect(getByTestId('th-name')).toHaveTextContent('Name')
  })

  it('renders table with data', () => {
    const config = new TableConfig([
      new TableColumnConfig('id', 'ID'),
    ], 'some-table-class')

    const items = [
      {id: 'some-id', name: 'some-name'},
      {id: 'some-id-2', name: 'some-name-2'},
    ]

    const {getByTestId} = renderComponent(config, items)

    expect(getByTestId('body').querySelectorAll('tr.mocked-row')).toHaveLength(2)
    expect(rowCalls).toHaveLength(2)

    // Check that row passed config and items to row
    expect(rowCalls[0].item.id).toBe('some-id')
    expect(rowCalls[1].item.id).toBe('some-id-2')

    expect(rowCalls[0].config).toBe(config)
  })
})