import React from "react";
import { DragLayer } from "react-dnd";
import styled from "styled-components"

const Preview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: green;
  border-radius: ${props => props.theme.borderRadius}px;

  width: 100%;
  height: 80px;
`

function collect (monitor) {
  return {
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        }
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    }
}

function ItemPreview ({id, name, isDragging, currentOffset}) {
  if (!isDragging) {
      return null;
  }

  return (
    <Preview style={getItemStyles(currentOffset)}>
      Preview
    </Preview>
  );
}

export default DragLayer(collect)(ItemPreview);
