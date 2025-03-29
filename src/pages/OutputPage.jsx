import { useState, useEffect } from "react";

function OutputPage() {
  const [config, setConfig] = useState({ label: "Click Me!", workflow: [] });
  const [output, setOutput] = useState([]);
  const [buttonSize, setButtonSize] = useState(16);
  const [buttonColor, setButtonColor] = useState("#007bff");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig") || "{}");
    setConfig({
      label: savedConfig.label || "Click Me!",
      workflow: savedConfig.workflow || [],
    });
  }, []);

  const executeWorkflow = () => {
    if (isDisabled) return;
    setOutput([]);

    config.workflow.forEach((action) => {
      switch (action.type) {
        case "Alert":
          alert(action.value || "Message");
          break;
        case "Show Text":
          setOutput((prev) => [...prev, action.value]);
          break;
        case "Show Image":
          setOutput((prev) => [...prev, <img src={action.value} alt="Workflow Image" key={Math.random()} />]);
          break;
        case "Refresh Page":
          window.location.reload();
          break;
        case "Set Localstorage":
          localStorage.setItem(action.value.split(",")[0], action.value.split(",")[1]);
          break;
        case "Get Localstorage":
          setOutput((prev) => [...prev, localStorage.getItem(action.value) || "Key not found"]);
          break;
        case "Increase Button Size":
          setButtonSize((prev) => prev + 10);
          break;
        case "Close Window":
          window.close();
          break;
        case "Prompt and Show":
          setOutput((prev) => [...prev, `Hello, ${prompt(action.value)}`]);
          break;
        case "Change Button Color":
          setButtonColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
          break;
        case "Disable Button":
          setIsDisabled(true);
          break;
        default:
          break;
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Output Page</h1>
      <button
        className={`w-full font-bold py-2 px-4 rounded`}
        style={{ fontSize: `${buttonSize}px`, backgroundColor: buttonColor }}
        onClick={executeWorkflow}
        disabled={isDisabled}
      >
        {config.label}
      </button>
      <div className="mt-4">{output.map((item, index) => <div key={index}>{item}</div>)}</div>
    </div>
  );
}

export default OutputPage;
