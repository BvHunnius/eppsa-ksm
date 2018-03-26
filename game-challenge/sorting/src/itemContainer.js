import React from "react"
import SortingItem from "./sortingItem"
import { DragDropContext } from "react-dnd"
import { default as TouchBackend } from "react-dnd-touch-backend";
import styled from "styled-components"

import ItemPreview from "./itemPreview";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: ${props => props.items.map((item) =>
    `${(100/props.items.length) - props.theme.gapHeight * ((props.items.length - 1) / props.items.length)}% `)};
  grid-gap: ${props => props.theme.gapHeight}%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`

class ItemContainer extends React.Component {
  render() {
    return <Container items={ Object.keys(this.props.items) } className={ this.props.className }>
      {
        Object.keys(this.props.items).map((key, index) =>
          <SortingItem key={ index } item={ this.props.items[key] }/>
        )
      }
      <ItemPreview />
    </Container>
  }
}

export default DragDropContext(TouchBackend)(ItemContainer);
