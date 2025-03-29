import { useState, useEffect } from "react";
import ActionList from "./ActionList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConfigForm = ({ onSave }) => {
  const [buttonLabel, setButtonLabel] = useState("");
  const [actions, setActions] = useState([]);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig"));
    if (savedConfig) {
      setButtonLabel(savedConfig.label || "");
      setActions(savedConfig.actions || []);
    }
  }, []);

  // Save config to localStorage
  const handleSave = () => {
    const config = { label: buttonLabel, actions };
    localStorage.setItem("buttonConfig", JSON.stringify(config));
    if (onSave) onSave(config);
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white space-y-4">
      <h2 className="text-xl font-semibold">Configure Button</h2>

      <div>
        <label className="block font-medium mb-1">Button Label</label>
        <Input
          type="text"
          value={buttonLabel}
          onChange={(e) => setButtonLabel(e.target.value)}
          placeholder="Enter button label"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium">Actions</h3>
        <ActionList actions={actions} setActions={setActions} />
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Configuration
      </Button>
    </div>
  );
};

export default ConfigForm;
