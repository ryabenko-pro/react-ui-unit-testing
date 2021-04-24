import EntityListTableConfig from "./EntityListTableConfig";

jest.mock("./EntityRowClassResolver", () => {
  return (item: any) => item
})

describe("EntityListTableConfig", () => {
  it("generates columns", () => {
    const config = new EntityListTableConfig()

    const arg = {id: Math.random()};
    expect(config.rowClassResolver(arg)).toBe(arg)
    expect(config.className).toBe('table')
    expect(config.columns.map(col => [col.key, col.title])).toStrictEqual([
      ['name', 'Name'],
      ['email', 'Email'],
      ['date', 'Next contact date'],
    ])
  })
})