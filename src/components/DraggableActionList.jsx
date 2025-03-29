import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ActionItem from "./ActionItem";

const DraggableActionList = ({ actions, setActions }) => {
  // Handles drag-and-drop reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedActions = [...actions];
    const [movedItem] = reorderedActions.splice(result.source.index, 1);
    reorderedActions.splice(result.destination.index, 0, movedItem);

    setActions(reorderedActions);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="action-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
            {actions.map((action, index) => (
              <Draggable key={index} draggableId={index.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 border rounded bg-gray-100 flex items-center justify-between"
                  >
                    <ActionItem action={action} onRemove={() => {
                      const updatedActions = actions.filter((_, i) => i !== index);
                      setActions(updatedActions);
                    }} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableActionList;
