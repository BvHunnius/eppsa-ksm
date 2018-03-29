import React from "react"
import ReactDOM from "react-dom"
import { injectGlobal } from "styled-components"
import App from "./App"
import "./index.css"
import selectContent from "./selectContent"


window.addEventListener("message", receiveMessage, false)

function receiveMessage(event) {
  console.log(event)
  const content = selectContent(event.data)
  console.log(content.scoreCalculation)
  ReactDOM.render(
    <App content={ content } completeChallenge={ score =>
      event.source.postMessage({ source: "challenge", score }, event.origin) } />,
    document.getElementById("root")
  )
}
const fontFamily = "Cabin"
const FONT_URI = process.env.FONT_URI

injectGlobal`
  body::-webkit-scrollbar {
    display: none;
  }

  @font-face {
    font-family: ${fontFamily};
    font-weight: 100;
    font-style: normal;
    src: url("${FONT_URI}/Cabin/Cabin-Regular.ttf");
  }
`
