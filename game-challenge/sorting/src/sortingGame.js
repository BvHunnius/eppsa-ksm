import React from "react"
import styled from "styled-components"

import ItemContainer from "./itemContainer"
import PhaserGame from "./phaserGame"

const Container = styled.div`
  height: 100vh;
`

const Label = styled.div`
  text-align: center;
  padding: 5%;
`

const SortingItems = styled(ItemContainer)`
  height: 80%;
`

export default class SortingGame extends React.Component {
  render() {
    return (
      <Container>
        <Label>{ this.props.data.topLabel }</Label>
        <SortingItems items={this.props.data.items} />
        <Label>{ this.props.data.bottomLabel }</Label>
      </Container>
    )
  }
}
