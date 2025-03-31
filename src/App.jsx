import { questions } from "./data/questions";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [validKeys] = useState(["a", "b", "c", "d", "e"]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function handleKeyUp(event) {
    const inputtedKey = event.key;
    if (!validKeys.includes(inputtedKey)) {
      console.log("Invalid key");
      return;
    }
    setSelectedKey(inputtedKey);

    // Move to the next question after a short delay
    setTimeout(() => {
      setSelectedKey(null);
      setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
    }, 400);
  }

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);
    return () => document.body.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <>
      <div className="step-tracker">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <div>
        <p>{questions[currentQuestionIndex].question}</p>
        <ul>
          {Object.entries(questions[currentQuestionIndex].answers).map(([key, response]) => (
            <li key={key} className={`response-list-item ${selectedKey === key ? "selected red" : ""}`}>
              <span className="key">{key}</span> <span className="response">{response}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
