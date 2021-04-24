import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import EntityListStep3 from "./EntityListStep3";
import TableConfig from "./TableConfig";

const mockUseData = jest.fn()
jest.mock("./EntityListDataSource", () => {
  return () => mockUseData()
})

const tableComponentIncludes: any[] = []
jest.mock('./TableComponent', () => ({config, items}: {config: TableConfig, items: {id: any}[]}) => {
  tableComponentIncludes.push({config, items})

  return <table></table>
})

describe("EntityListDataSource", () => {
  beforeEach(() => {
    tableComponentIncludes.length = 0
  })

  it('displays loading during fetch', () => {
    mockUseData.mockImplementationOnce(() => {
      return {
        items: null,
        loading: true,
        reFetch: jest.fn(),
      }
    })

    const {getByTestId} = render(<EntityListStep3 />)
    expect(getByTestId('loading')).toBeInTheDocument()
  })

  it('displays data', () => {
    const items: any[] = [
      {id: "Anything"},
      "We don't care if item is even string",
      ["Because it will be never rendered"],
    ]

    mockUseData.mockImplementationOnce(() => {
      return {
        items,
        loading: false,
        reFetch: jest.fn(),
      }
    })

    const {getByTestId} = render(<EntityListStep3 />)
    expect(getByTestId('section')).toBeInTheDocument()

    expect(tableComponentIncludes).toHaveLength(1)
    expect(tableComponentIncludes[0].items).toBe(items)
    expect(typeof tableComponentIncludes[0].config).toBe('object')
  })

  it('re fetch', () => {
    const reFetch = jest.fn()

    mockUseData.mockImplementationOnce(() => {
      return {
        items: [],
        loading: false,
        reFetch,
      }
    })

    const {getByTestId} = render(<EntityListStep3 />)

    expect(getByTestId('section')).toBeInTheDocument()

    fireEvent.click(getByTestId('refresh-button'))

    expect(reFetch).toHaveBeenCalledTimes(1)
  })
})