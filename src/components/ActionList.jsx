import ActionItem from "./ActionItem";
import { Button } from "@/components/ui/button";
// import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const ActionList = ({ actions, setActions }) => {
  const addAction = () => {
    setActions([...actions, { type: "", value: "" }]);
  };

  const updateAction = (index, newAction) => {
    const updatedActions = [...actions];
    updatedActions[index] = newAction;
    setActions(updatedActions);
  };

  const removeAction = (index) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = actions.findIndex((a, i) => i === active.id);
      const newIndex = actions.findIndex((a, i) => i === over.id);
      setActions(arrayMove(actions, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-3 p-4 border rounded-md bg-gray-50 shadow">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={actions.map((_, index) => index)} strategy={verticalListSortingStrategy}>
          {actions.map((action, index) => (
            <SortableItem key={index} id={index}>
              <ActionItem action={action} index={index} updateAction={updateAction} removeAction={removeAction} />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <Button onClick={addAction} variant="secondary">
        Add Action
      </Button>
    </div>
  );
};

export default ActionList;
