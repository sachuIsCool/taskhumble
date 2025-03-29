// Save configuration to localStorage
export const saveConfig = (config) => {
    localStorage.setItem("buttonConfig", JSON.stringify(config));
  };
  
  // Load configuration from localStorage
  export const loadConfig = () => {
    const config = localStorage.getItem("buttonConfig");
    return config ? JSON.parse(config) : null;
  };
  
  // Execute an action based on type
  export const executeAction = (action, setState) => {
    switch (action.type) {
      case "alert": {
        alert(action.value || "Default Alert!");
        break;
      }
      case "showText": {
        setState((prev) => ({ ...prev, text: action.value || "Default Text" }));
        break;
      }
      case "showImage": {
        setState((prev) => ({ ...prev, imageUrl: action.value || "" }));
        break;
      }
      case "refreshPage": {
        window.location.reload();
        break;
      }
      case "setLocalStorage": {
        localStorage.setItem(action.key, action.value);
        break;
      }
      case "getLocalStorage": {
        const storedValue = localStorage.getItem(action.key);
        setState((prev) => ({
          ...prev,
          text: storedValue ? `Stored Value: ${storedValue}` : "No data found",
        }));
        break;
      }
      case "increaseButtonSize": {
        setState((prev) => ({ ...prev, buttonSize: prev.buttonSize + 10 }));
        break;
      }
      case "changeButtonColor": {
        setState((prev) => ({
          ...prev,
          buttonColor: action.value || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        }));
        break;
      }
      case "disableButton": {
        setState((prev) => ({ ...prev, disabled: true }));
        break;
      }
      case "promptAndShow": {
        const userInput = prompt(action.value || "Enter something:");
        if (userInput) {
          setState((prev) => ({ ...prev, text: `You entered: ${userInput}` }));
        }
        break;
      }
      case "closeWindow": {
        window.close();
        break;
      }
      default: {
        console.warn("Unknown action:", action);
      }
    }
  };
  