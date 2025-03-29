import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const OutputButton = () => {
  const [buttonLabel, setButtonLabel] = useState("Click Me");
  const [actions, setActions] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [buttonSize, setButtonSize] = useState("text-base p-2");
  const [buttonColor, setButtonColor] = useState("bg-blue-500");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig"));
    if (savedConfig) {
      setButtonLabel(savedConfig.label || "Click Me");
      setActions(savedConfig.actions || []);
    }
  }, []);

  const executeActions = async () => {
    for (let action of actions) {
      switch (action.type) {
        case "alert": {
          alert(action.value || "Alert!");
          break;
        }
        case "showText": {
          setDisplayText(action.value || "Default Text");
          break;
        }
        case "showImage": {
          setDisplayText(
            <img src={action.value} alt="User provided" className="mt-2 max-w-xs" />
          );
          break;
        }
        case "refreshPage": {
          window.location.reload();
          return;
        }
        case "setLocalStorage": {
          localStorage.setItem(action.key, action.value);
          break;
        }
        case "getLocalStorage": {
          const storedValue = localStorage.getItem(action.key);
          setDisplayText(storedValue ? `Stored Value: ${storedValue}` : "No data found");
          break;
        }
        case "increaseButtonSize": {
          setButtonSize("text-lg p-4");
          break;
        }
        case "changeButtonColor": {
          setButtonColor(
            action.value ||
              `bg-${["red", "green", "blue", "yellow"][Math.floor(Math.random() * 4)]}-500`
          );
          break;
        }
        case "disableButton": {
          setDisabled(true);
          break;
        }
        case "promptAndShow": {
          const userInput = prompt(action.value || "Enter something:");
          if (userInput) setDisplayText(`You entered: ${userInput}`);
          break;
        }
        case "closeWindow": {
          window.close();
          break;
        }
        default: {
          console.warn("Unknown action:", action.type);
        }
      }
    }
  };

  return (
    <div className="p-6 text-center space-y-4">
      <Button
        onClick={executeActions}
        className={`${buttonSize} ${buttonColor} text-white rounded`}
        disabled={disabled}
      >
        {buttonLabel}
      </Button>
      {displayText && <div className="mt-4">{displayText}</div>}
    </div>
  );
};

export default OutputButton;
