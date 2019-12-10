import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface Props {
  onReorder: (from: number, to: number) => void;
}

const DragDropList: React.FC<Props> = ({ children, onReorder }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    onReorder(from, to);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={"tasks"}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;
