/* eslint-disable react/prop-types */
import { useAppContext } from "./context/AppContext";
import { questions } from "./data/questions";

function App() {
  return (
    <div className="qa-container">
      <Settings />
      <StepTracker />
      <QuestionForm />
    </div>
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
  const isSummary = currentQuestionIndex === questions.length;
  const progressBarClass = `progress-bar ${enableAnimations ? "animate" : ""} ${isSummary ? "summary" : ""}`;

  return (
    <div className="step-tracker">
      <div className="step-tracker-text">{isSummary ? "Summary" : `Question ${currentQuestionIndex + 1} of ${questions.length}`}</div>
      <div className="progress-bar-container">
        <div className={progressBarClass} style={{ width: `${progressPercentage}%` }}></div>
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
        <div>
          <BackButton />
          <ResetButton /> {/* Reset button only visible after first question */}
        </div>
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
      <span className={`response ${responseClasses}`.trim()}>{response.text}</span>
      {response.quantifier ?? ""}
    </li>
  );
}

// SummaryView and related components
function SummaryView() {
  const { responses } = useAppContext();

  // Calculate the total score
  const totalScore = Object.values(responses).reduce((sum, response) => {
    return sum + (response.quantifier ?? 0);
  }, 0);

  return (
    <div className="summary">
      <p>Review your responses before submitting:</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Response</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((_, index) => (
            <SummaryItem key={index} index={index} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Final Score:</strong>
            </td>
            <td>{totalScore}</td>
          </tr>
        </tfoot>
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
      <td>{response ? question.answers[response.key].text : "No response"}</td>
      <td>{response?.quantifier ?? <span className="no-response">N/a</span>}</td>
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

  if (currentQuestionIndex < 1) {
    return null; // Hide the button for the first question
  }

  return (
    <button type="button" className="back-button" onClick={handlePreviousQuestion}>
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

function ResetButton() {
  const { currentQuestionIndex, setCurrentQuestionIndex, setSelectedKey, setResponses } = useAppContext();

  function handleReset(event) {
    event.preventDefault();
    setCurrentQuestionIndex(0);
    setSelectedKey(null);
    setResponses({});
  }

  if (currentQuestionIndex < 1) {
    return null; // Hide the button for the first question
  }

  return (
    <button type="button" className="reset-button transparent-button" onClick={handleReset}>
      Reset
    </button>
  );
}

export default App;
