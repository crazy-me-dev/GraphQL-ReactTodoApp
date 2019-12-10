import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface Props {
  children: (provided: DraggableProvided) => React.ReactElement;
  itemId: string;
  index: number;
}

const DragDropListItem: React.FC<Props> = ({ children, itemId, index }) => {
  return (
    <Draggable draggableId={itemId} index={index}>
      {provided => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          {children(provided)}
        </div>
      )}
    </Draggable>
  );
};

export default DragDropListItem;
