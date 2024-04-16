import React, { useEffect, useState } from "react";
import * as client from "../client";
import "./index.css";

function PreviewEditor() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  type Question = {
    _id: string;
    question: string;
    quizId: string;
    questionType: "Fill in the Blanks" | "True/False" | "Multiple Choice";
    points: number;
    blanks: string[];
    choices: Choice[];
    trueFalseAnswer?: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  type Choice = {
    text: string;
    isCorrect: boolean;
    _id: string;
  };

  useEffect(() => {
    client
      .findQuestionByQuizID("6616b4301ef325501d61afdb")
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  // Utility to handle rendering of True/False options
  const renderTrueFalseOptions = (question: Question) => (
    <div className="options-container">
      <input
        type="radio"
        id={`${question._id}-true`}
        name={`${question._id}-truefalse`}
        value="true"
      />
      <label htmlFor={`${question._id}-true`}>True</label>
      <input
        type="radio"
        id={`${question._id}-false`}
        name={`${question._id}-truefalse`}
        value="false"
      />
      <label htmlFor={`${question._id}-false`}>False</label>
    </div>
  );

  // Utility to handle rendering of Multiple Choice options
  const renderMultipleChoiceOptions = (question: Question) => (
    <div className="options-container">
      {question.choices.map((choice) => (
        <div key={choice._id} className="choice">
          <input
            type="checkbox"
            id={`${question._id}-${choice._id}`}
          />
          <label htmlFor={`${question._id}-${choice._id}`}>{choice.text}</label>
        </div>
      ))}
    </div>
  );

  // Utility to handle rendering of Fill in the Blanks
  const renderFillInTheBlanks = (question: Question) => (
    <div className="fill-blanks-container">
      {question.blanks.map((_, i) => (
        <input
          key={i}
          type="text"
          value={""}
          onChange={(e) => console.log(e.target.value)}
        />
      ))}
    </div>
  );

  const goToSelectedQuestion = (index: any) => {
    setCurrentQuestionIndex(index);
  }

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-header">
        <h1>Q1 - HTML</h1><br />
        <div className="preview-notice">
          This is a preview of the published version of the quiz
        </div>
      </div>

      <div className="quiz-container">
        <div className="quiz-content">
          {currentQuestion ? (
            <div key={currentQuestion._id} className="question-card">
              <div className="question-header">
                <p className="question-text">
                  Question {currentQuestionIndex + 1}
                </p>
                <div className="question-points">
                  {currentQuestion.points} pts
                </div>
              </div>

              <div style={{padding: "20px"}}>
                <div>{currentQuestion.question}</div>

                {currentQuestion.questionType === "True/False" &&
                  renderTrueFalseOptions(currentQuestion)}

                {currentQuestion.questionType === "Multiple Choice" &&
                  renderMultipleChoiceOptions(currentQuestion)}

                {currentQuestion.questionType === "Fill in the Blanks" &&
                  renderFillInTheBlanks(currentQuestion)}
              </div>
              <div className="question-navigation">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div className="quiz-footer">
          <button className="edit-quiz-button">Keep Editing This Quiz</button>
        </div>
      </div>

      <div onClick={() => goToSelectedQuestion(1)}>
        Question 2
      </div>
    </>
  );
}

export default PreviewEditor;
