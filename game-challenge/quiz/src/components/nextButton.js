import styled from "styled-components"
import React from "react"
import Button from "./button"
import ButtonIcon from "../assets/svg/EPPSA_Assets_Button_Icon.svg"


const NextButton = styled(Button)`
  margin-top: 2em;
  width: 67%;
`

const NextIcon = styled(ButtonIcon)`
  margin-left: 1em;
  margin-top: 0.2em;
  height: 0.9em;
  fill: black;
`

export default props => {
  return <NextButton { ...props }>{ props.text }<NextIcon/></NextButton>
}
