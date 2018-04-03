import styled from "styled-components"
import React from "react"
import Button from "./button"
import ButtonIcon from "../assets/svg/EPPSA_Assets_Button_Icon.svg"


const NextButton = styled(Button)`
  margin-top: 2em;
  height: 2em;
  width: 67%;
  fill: black;
`

const NextIcon = styled(ButtonIcon)`
  height: 50%;
  fill: black;
`

export default props => {
  return <NextButton>{ props.text }<NextIcon/></NextButton>
}
