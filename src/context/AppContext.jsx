/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { questions } from "../data/questions";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [validKeys] = useState(["a", "b", "c", "d", "e"]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [enableAnimations, setEnableAnimations] = useState(Math.random() < 0.5);
  const [enableAutoNext, setEnableAutoNext] = useState(Math.random() < 0.5);
  const [responses, setResponses] = useState({});

  function handleKeyUp(event) {
    const inputtedKey = event.key.toLowerCase(); // Ensure lowercase for consistency
    if (!validKeys.includes(inputtedKey)) {
      console.log("Invalid key");
      return;
    }
    setSelectedKey(inputtedKey);

    // Save the response
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestionIndex]: inputtedKey, // Save the selected key
    }));

    if (enableAutoNext) {
      setTimeout(() => {
        setSelectedKey(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length ? prevIndex + 1 : prevIndex));
      }, 750);
    }
  }

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);
    return () => document.body.removeEventListener("keyup", handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableAutoNext, currentQuestionIndex]); // Add currentQuestionIndex to dependencies

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (enableAnimations) {
      rootElement.classList.add("animations-enabled");
      rootElement.classList.remove("animations-disabled");
    } else {
      rootElement.classList.add("animations-disabled");
      rootElement.classList.remove("animations-enabled");
    }
  }, [enableAnimations]);

  return (
    <AppContext.Provider
      value={{
        enableAnimations,
        setEnableAnimations,
        enableAutoNext,
        setEnableAutoNext,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectedKey,
        setSelectedKey,
        responses, // Expose responses
        setResponses, // Expose setResponses if needed elsewhere
      }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext);
}
