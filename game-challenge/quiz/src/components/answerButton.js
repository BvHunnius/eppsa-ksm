import React from "react"
import styled, { withTheme } from "styled-components"
import Button from "./button"


const StyledButton = styled(Button)`
  border-color: ${props => selectionColor(props.selection, props.theme)};
`

const Title = styled.div`
  flex-basis: 10%;
  align-self: center;
  color: ${props => selectionColor(props.selection, props.theme)};
  opacity: 0.5;
`

const Answer = styled.div`
  flex-basis: 90%;
`

function selectionColor(selection, theme) {
  switch (selection) {
    case "right": return theme.colors.rightAnswer
    case "wrong": return theme.colors.wrongAnswer
    case "greyed": return theme.colors.secondary
    default: return theme.colors.areaColor
  }
}

function AnswerButton(props) {
  return (
    <StyledButton { ...props }>
      <Title selection={ props.selection }>{ props.title }:</Title>
      <Answer>{ props.answer }</Answer>
    </StyledButton>
  )
}

export default withTheme(AnswerButton)

AnswerButton.defaultProps = {
  selection: null
}
