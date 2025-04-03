/* eslint-disable react/prop-types */
import { useAppContext } from "./context/AppContext";
import { questions } from "./data/questions";

function App() {
  return (
    <>
      <Settings />
      <StepTracker />
      <QuestionForm />
    </>
  );
}

// Settings and related components
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

// StepTracker component
function StepTracker() {
  const { currentQuestionIndex, enableAnimations } = useAppContext();

  const progressPercentage = ((currentQuestionIndex / questions.length) * 100).toFixed(2);

  return (
    <div className="step-tracker">
      <div className="step-tracker-text">
        {currentQuestionIndex === questions.length ? "Summary" : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
      </div>
      <div className="progress-bar-container">
        <div className={`progress-bar ${enableAnimations ? "animate" : ""}`} style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
}

// QuestionForm and related components
function QuestionForm() {
  const { currentQuestionIndex } = useAppContext();

  const isQuestion = currentQuestionIndex < questions.length;

  return (
    <form>
      {isQuestion ? <QuestionView /> : <SummaryView />}
      <div className="navigation-buttons">
        <BackButton />
        {isQuestion ? <NextButton /> : <SubmitButton />}
      </div>
    </form>
  );
}

function QuestionView() {
  return (
    <>
      {questions.map((question, index) => (
        <Question key={index} question={question} index={index} />
      ))}
    </>
  );
}

function Question({ question, index }) {
  const { currentQuestionIndex, selectedKey } = useAppContext();

  return (
    <div className={`question ${index === currentQuestionIndex ? "active fade-in" : "hidden"}`}>
      <p>{question.question}</p>
      <ul>
        {Object.entries(question.answers).map(([key, response]) => (
          <ResponseListItem key={key} keyProp={key} response={response} isSelected={selectedKey === key} />
        ))}
      </ul>
    </div>
  );
}

function ResponseListItem({ keyProp, response, isSelected }) {
  const { enableAnimations, handleResponseSelection } = useAppContext();

  const animationClass = enableAnimations ? "blink" : "";
  const responseClasses = isSelected ? `${animationClass} selected`.trim() : "";
  const keyClasses = isSelected ? "key selected" : "key";

  return (
    <li
      key={keyProp}
      className="response-list-item"
      onClick={() => handleResponseSelection(keyProp)} // Handle click
    >
      <kbd className={keyClasses}>{keyProp}</kbd>
      <span className={`response ${responseClasses}`.trim()}>{response}</span>
    </li>
  );
}

// SummaryView and related components
function SummaryView() {
  return (
    <div className="summary">
      <p>Review your responses before submitting:</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Response</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((_, index) => (
            <SummaryItem key={index} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SummaryItem({ index }) {
  const { responses } = useAppContext();
  const question = questions[index];
  const response = responses[index];

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <strong>{question.question}</strong>
      </td>
      <td>{response ? `${question.answers[response]}` : "No response"}</td>
    </tr>
  );
}

// Navigation buttons
function NextButton() {
  const { enableAutoNext, currentQuestionIndex, selectedKey, setSelectedKey, setCurrentQuestionIndex } = useAppContext();

  const isDisabled = (() => {
    const isAutoNextEnabled = enableAutoNext;
    const isSummary = currentQuestionIndex > questions.length; // Allow transition to summary
    const isKeySelected = !enableAutoNext && selectedKey === null;
    return isAutoNextEnabled || isSummary || isKeySelected;
  })();

  function handleNextQuestion(event) {
    event.preventDefault();
    setSelectedKey(null);
    setCurrentQuestionIndex((prevIndex) => (prevIndex < questions.length ? prevIndex + 1 : prevIndex));
  }

  return (
    <button type="button" className="next-button" disabled={isDisabled} onClick={handleNextQuestion}>
      Next
    </button>
  );
}

function BackButton() {
  const { currentQuestionIndex, setCurrentQuestionIndex } = useAppContext();

  function handlePreviousQuestion(event) {
    event.preventDefault();
    setCurrentQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  }

  return (
    <button
      type="button"
      className="back-button"
      style={{ visibility: currentQuestionIndex === 0 ? "hidden" : "visible" }}
      onClick={handlePreviousQuestion}>
      Back
    </button>
  );
}

function SubmitButton() {
  return (
    <button type="submit" className="submit-button">
      Submit
    </button>
  );
}

export default App;
