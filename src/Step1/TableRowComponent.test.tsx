import {render} from '@testing-library/react'
import TableRowComponent from "./TableRowComponent"
import TableConfig, {TableColumnConfig} from "./TableConfig"


function renderComponent(config: TableConfig, item: any) {
  // wrap row in table to avoid `<tr> cannot appear as a child of <div>` warning
  return render(<table><tbody><TableRowComponent config={config} item={item}/></tbody></table>)
}

describe('Row', () => {
  it('renders table row with data', () => {
    const config = new TableConfig([
      new TableColumnConfig('id', 'ID'),
      new TableColumnConfig('name', 'Name'),
    ])

    const item = {id: 'some-id', name: 'some-name'}

    const {getByTestId} = renderComponent(config, item)

    expect(getByTestId('row').querySelectorAll('td')).toHaveLength(2)
    expect(getByTestId('td-id')).toHaveTextContent('some-id')
    expect(getByTestId('td-name')).toHaveTextContent('some-name')
  })

  it('renders table row with class', () => {
    const config = new TableConfig([
      new TableColumnConfig('id', 'ID'),
    ], (item: any) => `some-class-${item.id}`)

    const item = {id: 'some-id'}

    const {getByTestId} = renderComponent(config, item)

    expect(getByTestId('row')).toHaveClass('some-class-some-id')
  })

  it('renders table row with тщ class', () => {
    const config = new TableConfig([
      new TableColumnConfig('id', 'ID'),
    ])

    const item = {id: 'some-id'}

    const {getByTestId} = renderComponent(config, item)

    expect(getByTestId('row')).not.toHaveClass('some-class-some-id')
  })
})