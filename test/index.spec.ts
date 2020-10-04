import { hello } from "../src"

describe("it", () => {
  it("it", () => {
    expect(hello()).toStrictEqual("hello")
  })
})