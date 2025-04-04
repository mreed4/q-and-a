/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { questions } from "../data/questions";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [validKeys] = useState(["a", "b", "c", "d", "e"]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableAutoNext, setEnableAutoNext] = useState(true);
  const [responses, setResponses] = useState({});

  function handleKeyUp(event) {
    const inputtedKey = event.key.toLowerCase(); // Ensure lowercase for consistency
    handleResponseSelection(inputtedKey);
  }

  function handleResponseSelection(inputtedKey) {
    if (!validKeys.includes(inputtedKey)) {
      console.log("Invalid key");
      return;
    }
    setSelectedKey(inputtedKey);

    // Save the response with quantifier
    const selectedAnswer = questions[currentQuestionIndex].answers[inputtedKey];
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestionIndex]: {
        key: inputtedKey,
        quantifier: selectedAnswer.quantifier || null, // Use quantifier if available
      },
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
    const className = enableAnimations ? "animations-enabled" : "animations-disabled";
    document.documentElement.className = className; // Apply class to the root <html> element
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
        handleResponseSelection, // Expose handleResponseSelection
      }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext);
}
