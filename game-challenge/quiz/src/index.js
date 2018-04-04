import React from "react"
import ReactDOM from "react-dom"
import { injectGlobalStyle } from "./globalStyle"
import App from "./App"
import "./index.css"
import selectContent from "./selectContent"


const FONT_URI = process.env.FONT_URI

injectGlobalStyle(FONT_URI)

window.addEventListener("message", receiveMessage, false)

function receiveMessage(event) {
  console.log(event)
  const content = selectContent(event.data)
  ReactDOM.render(
    <App content={ content } areaColor="#e05633" completeChallenge={ score =>
      event.source.postMessage({ source: "challenge", score }, event.origin) } />,
    document.getElementById("root")
  )
}

