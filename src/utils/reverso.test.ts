import translate from "./reverso"

test("Translate text", () => {
  translate("hi").then((text) => {
    expect(text[0]).toBe("привет")
  })
})
