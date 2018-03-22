import React from "react"
import styled from "styled-components"

import SortingItem from "./sortingItem"

const Container = styled.div`
  height: 100vh;
`

const Label = styled.div`
  text-align: center;
  padding: 5%;
`

const ItemContainer = styled.div`
  height: 80%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: ${props => props.items.map((item) =>
    `${(100/props.items.length) - props.theme.gapHeight * ((props.items.length - 1) / props.items.length)}% `)};
  grid-gap: ${props => props.theme.gapHeight}%;
`

export default class SortingGame extends React.Component {
  render() {
    return (
      <Container>
        <Label>Reichtum</Label>
        <ItemContainer items={Object.entries(this.props.data.items)}>
          {
            Object.entries(this.props.data.items).map((item) =>
              <SortingItem key={ item[0] } item={ item[1] }/>
            )
          }
        </ItemContainer>
        <Label>Armut</Label>
      </Container>
    )
  }
}
