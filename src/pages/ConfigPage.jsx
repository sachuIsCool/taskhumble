import { useState, useEffect } from "react";
import ActionItem from "../components/ActionItem";

const availableActions = [
  "Alert",
  "Show Text",
  "Show Image",
  "Refresh Page",
  "Set Localstorage",
  "Get Localstorage",
  "Increase Button Size",
  "Close Window",
  "Prompt and Show",
  "Change Button Color",
  "Disable Button",
];

function ConfigPage() {
  const [label, setLabel] = useState("");
  const [workflow, setWorkflow] = useState([]);
  const [actionType, setActionType] = useState("");
  const [actionValue, setActionValue] = useState("");

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig") || "{}");
    setLabel(savedConfig.label || "");
    setWorkflow(savedConfig.workflow || []);
  }, []);

  const addAction = () => {
    if (!actionType) return;
    setWorkflow([...workflow, { type: actionType, value: actionValue }]);
    setActionType("");
    setActionValue("");
  };

  const removeAction = (index) => {
    setWorkflow(workflow.filter((_, i) => i !== index));
  };

  const saveConfig = () => {
    localStorage.setItem("buttonConfig", JSON.stringify({ label, workflow }));
    alert("Configuration saved!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Config Page</h1>
      <label className="block text-gray-600">Button Label:</label>
      <input
        className="w-full p-2 border rounded mt-1 mb-3"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      
      <h3 className="font-semibold mt-3">Add Action</h3>
      <select
        className="w-full p-2 border rounded mt-1"
        value={actionType}
        onChange={(e) => setActionType(e.target.value)}
      >
        <option value="">Select Action</option>
        {availableActions.map((action) => (
          <option key={action} value={action}>{action}</option>
        ))}
      </select>
      <input
        className="w-full p-2 border rounded mt-2"
        value={actionValue}
        onChange={(e) => setActionValue(e.target.value)}
        placeholder="Action Value (if needed)"
      />
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        onClick={addAction}
      >
        Add Action
      </button>

      <h3 className="font-semibold mt-5">Workflow</h3>
      {workflow.map((action, index) => (
        <ActionItem key={index} action={action} onRemove={() => removeAction(index)} />
      ))}
      
      <button
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={saveConfig}
      >
        Save Config
      </button>
    </div>
  );
}

export default ConfigPage;
