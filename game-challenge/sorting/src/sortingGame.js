import Dragula from "react-dragula"
import React from "react"
import styled from "styled-components"

const data = {
  order: ["item2", "item4", "item1", "item3"],
  items : {
    item1 : {
      image: "https://picsum.photos/400/300/?image=651",
      info: "3"
    },
    item2 : {
      image: "https://picsum.photos/400/300/?image=652",
      info: "1"
    },
    item3 : {
      image: "https://picsum.photos/400/300/?image=653",
      info: "4"
    },
    item4 : {
      image: "https://picsum.photos/400/300/?image=654",
      info: "3"
    },
    item5 : {
      image: "https://picsum.photos/400/300/?image=655",
      info: "3"
    }
  }
}

const theme = {
  gapHeight: 5,
  borderRadius: 15
}

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
    `${(100/props.items.length) - theme.gapHeight * ((props.items.length - 1) / props.items.length)}% `)};
  grid-gap: ${theme.gapHeight}%;
`

const Item = styled.div`
  background: red;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${theme.borderRadius}px;
`

export default class SortingGame extends React.Component {
  SortingGame() {
  }

  render() {
    return (
      <Container>
        <Label>Reichtum</Label>
        <ItemContainer ref={this.dragulaDecorator} items={Object.entries(data.items)}>
          {
            Object.entries(data.items).map((item) =>
              <Item key={ item[0] } image={ item[1].image }>{ item[1].info }</Item>
            )
          }
        </ItemContainer>
        <Label>Armut</Label>
      </Container>
    )
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  }
}
