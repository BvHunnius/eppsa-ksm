import styled, { withTheme } from "styled-components"
import Button from "./button"


const AnswerButton = styled(Button)`
  border-color: ${props => selectionColor(props.selection, props.theme)};
`

function selectionColor(selection, theme) {
  switch (selection) {
    case "right": return theme.colors.rightAnswer
    case "wrong": return theme.colors.wrongAnswer
    case "greyed": return theme.colors.secondary
    default: return theme.colors.areaColor
  }
}

export default withTheme(AnswerButton)

AnswerButton.defaultProps = {
  selection: null
}
