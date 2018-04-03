import styled from "styled-components"


export default styled.div `
  margin-top: 5px;
  width: 100%;
  height: 3em;
  box-sizing: border-box;
  border-radius: ${props => props.theme.layout.borderRadius};
  border-style: solid;
  border-width: ${props => props.theme.layout.buttonBorder};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.font.button.size};
  font-weight: ${props => props.theme.font.button.weight};
  color: ${props => props.theme.font.button.color};
`
