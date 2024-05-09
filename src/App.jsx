import { questions } from "./data/questions";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [validKeys, setValidKeys] = useState(["a", "b", "c", "d", "e"]);

  function handleKeyUp(event) {
    const inputtedKey = event.key;
    const selectedResponse = document.querySelector(`[accesskey=${inputtedKey}]`);
    const allResponses = [...document.querySelectorAll(".response-list-item")];

    if (validKeys.includes(inputtedKey)) {
      allResponses.forEach((response) => response.classList.remove("selected", "red"));
      selectedResponse.classList.add("selected");
      setTimeout(() => {
        selectedResponse.classList.add("red");
      }, 400);
    } else {
      console.log("Invalid key");
    }
  }

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      {questions.map((question, i) => {
        return (
          <div key={i}>
            <p>{question.question}</p>
            <ul>
              {Object.entries(question.answers).map((answer) => {
                const [key, response] = answer;
                return (
                  <li key={key} className="response-list-item" accessKey={key}>
                    <span className="key">{key}</span> <span className="response">{response}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default App;
