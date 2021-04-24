import EntityListDataSource from "./EntityListDataSource";
import {act, renderHook} from '@testing-library/react-hooks'
import API from "../API"
import React from 'react';

jest.mock("../API", () => ({get() { }}))

describe("EntityListDataSource", () => {
  const setItems = jest.fn()
  const setLoading = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')

  beforeEach(() => {
    useStateSpy
      // @ts-ignore
      .mockImplementationOnce((init) => [init, setItems])
      // @ts-ignore
      .mockImplementationOnce((init) => [init, setLoading]);

    API.get = jest.fn(async () => new Promise((resolve) => resolve([
      {"id": 1, "first_name": "Zonnya", "last_name": "Groucutt", "email": "zgroucutt1@facebook.com", "gender": "Polygender", "ip_address": "170.172.149.64", "date": "2021-04-14"},
      {"id": 2, "first_name": "Aldric", "last_name": "Joannidi", "email": "ajoannidi2@blog.com", "gender": "Bigender", "ip_address": "42.25.194.119", "date": "2021-05-28"},
    ])))
  })

  afterEach(() => {
    useStateSpy.mockRestore()
  })

  it("fetch data from API", async () => {
    const flushPromises = () => new Promise(setImmediate);

    renderHook(() => EntityListDataSource())

    await flushPromises();

    expect(setLoading).toHaveBeenCalledTimes(2)
    expect(setLoading).toHaveBeenNthCalledWith(1, true)
    expect(setLoading).toHaveBeenNthCalledWith(2, false)

    expect(setItems).toHaveBeenCalledTimes(1)
    expect(setItems).toBeCalledWith([
      {"id": 1, "name": "Zonnya Groucutt", "email": "zgroucutt1@facebook.com", "date": "2021-04-14"},
      {"id": 2, "name": "Aldric Joannidi", "email": "ajoannidi2@blog.com", "date": "2021-05-28"},
    ])

  })

  it("re-fetch", () => {
    const data = renderHook(() => EntityListDataSource())

    act(() => {
      data.result.current.reFetch()
    })

    expect(API.get).toHaveBeenCalledTimes(2)
  })
})