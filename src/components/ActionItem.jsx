function ActionItem({ action, onRemove }) {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded mt-2">
      <span className="text-gray-700">{action.type}: {action.value || "N/A"}</span>
      <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

export default ActionItem;
