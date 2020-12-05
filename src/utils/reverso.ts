import axios from "axios"

export default async function translate(text: string) {
  return text
    ? await axios
        .post(
          "https://api.reverso.net/translate/v1/translation",
          {
            from: "eng",
            to: "rus",
            input: text,
            format: "text",
            options: { origin: "contextweb", languageDetection: true },
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          return res.data.translation
        })
        .catch((err) => console.error(err))
    : ""
}
