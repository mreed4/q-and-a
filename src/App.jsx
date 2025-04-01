/* eslint-disable react/prop-types */
import { useAppContext } from "./context/AppContext";
import { questions } from "./data/questions";
import "./App.css";

function App() {
  return (
    <>
      <Settings />
      <StepTracker />
      <QuestionForm />
    </>
  );
}

function Settings() {
  const { enableAnimations, setEnableAnimations, enableAutoNext, setEnableAutoNext } = useAppContext();

  return (
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
  );
}

function StepTracker() {
  const { currentQuestionIndex } = useAppContext();

  return (
    <div className="step-tracker">
      Question {currentQuestionIndex + 1} of {questions.length}
    </div>
  );
}

function QuestionForm() {
  const { currentQuestionIndex, selectedKey } = useAppContext();

  return (
    <form className="fade-in">
      {questions.map((question, index) => (
        <div key={index} className={index === currentQuestionIndex ? "question active" : "question hidden"}>
          <p>{question.question}</p>
          <ul>
            {Object.entries(question.answers).map(([key, response]) => (
              <ResponseListItem key={key} keyProp={key} response={response} isSelected={selectedKey === key} />
            ))}
          </ul>
        </div>
      ))}
      <NextButton />
    </form>
  );
}

function ResponseListItem({ keyProp, response, isSelected }) {
  const { enableAnimations } = useAppContext();

  const animationClass = enableAnimations ? "blink" : "";
  const responseClasses = isSelected ? `${animationClass} selected`.trim() : "";
  return (
    <li key={keyProp} className="response-list-item">
      <kbd className="key">{keyProp}</kbd>
      <span className={`response ${responseClasses}`.trim()}>{response}</span>
    </li>
  );
}

function NextButton() {
  const { enableAutoNext, currentQuestionIndex, selectedKey, setSelectedKey, setCurrentQuestionIndex } = useAppContext();

  const isDisabled = (() => {
    const isAutoNextEnabled = enableAutoNext;
    const isLastQuestion = currentQuestionIndex >= questions.length - 1;
    const isKeySelected = !enableAutoNext && selectedKey === null;
    return isAutoNextEnabled || isLastQuestion || isKeySelected;
  })();

  function handleNextQuestion(event) {
    event.preventDefault();
    setSelectedKey(null);
    setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
  }

  return (
    <button type="button" className="next-button" disabled={isDisabled} onClick={handleNextQuestion}>
      Next
    </button>
  );
}

export default App;
