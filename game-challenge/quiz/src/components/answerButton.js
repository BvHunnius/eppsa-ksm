import React from "react"
import styled, { css, withTheme } from "styled-components"
import Button from "./button"


const StyledButton = styled(Button)`
  border-color: ${props => selectionColor(props.selection, props.theme)};
  ${props => props.visible ? css`
      transform: scale(1, 1);
      transition:
        transform 250ms cubic-bezier(0.2, 0.7, 0.55, 1.6) ${props => 500 + props.index * 500}ms;
    ` : css`
      transform: scale(0, 0);
      transition: transform 250ms ease;
    `
  }
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
