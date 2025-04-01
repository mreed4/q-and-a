import { questions } from "./data/questions";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [validKeys] = useState(["a", "b", "c", "d", "e"]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [enableAnimations, setEnableAnimations] = useState(false);
  const [enableAutoNext, setEnableAutoNext] = useState(false);

  function handleKeyUp(event) {
    const inputtedKey = event.key;
    if (!validKeys.includes(inputtedKey)) {
      console.log("Invalid key");
      return;
    }
    setSelectedKey(inputtedKey);

    if (enableAutoNext) {
      // Move to the next question after a short delay
      setTimeout(() => {
        setSelectedKey(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
      }, 400);
    }
  }

  function handleNextQuestion(event) {
    event.preventDefault();
    setSelectedKey(null);
    setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
  }

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);
    return () => document.body.removeEventListener("keyup", handleKeyUp);
  }, [enableAutoNext]);

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
    <>
      <div className="settings">
        <label className="toggle">
          <input type="checkbox" checked={enableAnimations} onChange={() => setEnableAnimations((prev) => !prev)} />
          <span className="slider"></span>
          Enable Animations
        </label>
        <label className="toggle">
          <input type="checkbox" checked={enableAutoNext} onChange={() => setEnableAutoNext((prev) => !prev)} />
          <span className="slider"></span>
          Enable Auto-Next
        </label>
      </div>
      <div className="step-tracker">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <form onSubmit={handleNextQuestion}>
        <p>{questions[currentQuestionIndex].question}</p>
        <ul>
          {Object.entries(questions[currentQuestionIndex].answers).map(([key, response]) => (
            <li key={key} className={`response-list-item ${selectedKey === key ? (enableAnimations ? "selected red" : "selected") : ""}`}>
              <span className="key">{key}</span> <span className="response">{response}</span>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="next-button"
          disabled={currentQuestionIndex >= questions.length - 1 || (!enableAutoNext && selectedKey === null)}>
          Next
        </button>
      </form>
    </>
  );
}

export default App;
