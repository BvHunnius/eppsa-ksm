import React from "react"
import styled from "styled-components"
import { DragSource, DropTarget } from "react-dnd"
import { ItemTypes } from "./constants"

const ItemComponent = styled.div`
  height: 80px;
  background: red;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${props => props.theme.borderRadius}px;
  visibility: ${props => props.isDragging ? "hidden" : "visible"};
`

const dragSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      onReorder: props.onReorder
    }
  }
}

const dropTarget = {
  drop (props, monitor) {
    const item = monitor.getItem();
    // Don't trigger reorder if it's to the same spot
    if (item.listId === props.listId && item.id === props.id) {
      return;
    }
    item.onReorder({
      listId: item.listId,
      id: item.id
    }, {
      listId: props.listId,
      id: props.id
    });
  }
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Item extends React.Component {
  render() {
    let content = (
      <div>
        <ItemComponent image={ this.props.item.image } {...this.props}>{ this.props.item.info }</ItemComponent>
      </div>
    )

    content = this.props.connectDragSource(content)
    content = this.props.connectDropTarget(content)
    content = this.props.connectDragPreview(content)

    return content
  }
}

export default DragSource(ItemTypes.SORTING_ITEM, dragSource, collectDrag)(
  DropTarget(ItemTypes.SORTING_ITEM, dropTarget, collectDrop)(Item)
)
