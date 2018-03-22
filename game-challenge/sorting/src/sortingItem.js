import React from "react"
import styled from "styled-components"
import { DragSource } from "react-dnd";

const ItemComponent = styled.div`
  background: red;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${props => props.theme.borderRadius}px;
`

export default class Item extends React.Component {
  render() {
    return <ItemComponent image={ this.props.item.image }>{ this.props.item.info }</ItemComponent>
  }
}
