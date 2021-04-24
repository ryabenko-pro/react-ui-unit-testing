import moment from "moment"
import getClassForItem from "./EntityRowClassResolver";

describe("EntityRowClassResolver", () => {
  it("Must return danger", () => {
    const className = getClassForItem({date: moment().subtract(1, "day").format("MM/DD/Y")})

    expect(className).toBe('table-danger')
  })

  it("Must return warning", () => {
    const className = getClassForItem({date: moment().add(3, "day").format("MM/DD/Y")})

    expect(className).toBe('table-warning')
  })

  it("Must return success", () => {
    const className = getClassForItem({date: moment().add(35, "day").format("MM/DD/Y")})

    expect(className).toBe('table-success')
  })

  it("Must return undefined", () => {
    const className = getClassForItem({date: "not a valid date"})

    expect(className).toBe(undefined)
  })
})