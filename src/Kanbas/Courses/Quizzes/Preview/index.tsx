
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KanbasState } from "../../../store";
import * as client from "../client";
import "./index.css";

function PreviewEditor() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const [title, setTitle] = useState("");

  type Question = {
    _id: string;
    questionTitle: string;
    questionText: string;
    quizId: string;
    questionType: "Fill In the Blank" | "True/False" | "Multiple Choice";
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

  const currentUserRole = useSelector((state: KanbasState) => state.usersReducer.role);
  const isAdminOrFaculty = currentUserRole === "ADMIN" || currentUserRole === "FACULTY";

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        const fetchedQuiz = await client.findQuizByID(quizId);
        setTitle(fetchedQuiz.title);

        const fetchedQuestions = await Promise.all(
          fetchedQuiz.questions.map((questionId: Question) =>
            client.findQuestionByID(questionId)
          )
        );

        setQuestions(fetchedQuestions);

        const storedUserResponses = localStorage.getItem(`${quizId}_user_responses`);
        if (storedUserResponses) {
          setUserResponses(JSON.parse(storedUserResponses));
        } else {
          setUserResponses(Array(fetchedQuestions.length).fill(""));
        }
      } catch (error) {
        console.error("Error fetching quiz and questions:", error);
      }
    };

    fetchQuizAndQuestions();
  }, [quizId]);

  const goToSelectedQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const index = currentQuestionIndex;
  const value = e.target.value;
  const updatedResponses = [...userResponses];
  updatedResponses[index] = value;
  setUserResponses(updatedResponses);

  
  
    localStorage.setItem(`${quizId}_user_responses`, JSON.stringify(updatedResponses));
  
};


  const handleSubmitQuiz = () => {
    let total = 0;
    let answeredQuestions = 0;
  
    questions.forEach((question, index) => {
      if (userResponses[index] !== "") {
        answeredQuestions++;
        switch (question.questionType) {
          case "True/False":
            if (
              question.trueFalseAnswer &&
              userResponses[index].toLowerCase() === "true"
            ) {
              total += question.points;
            }
            break;
          case "Multiple Choice":
            const selectedChoice = question.choices.find(
              (choice) => choice.text === userResponses[index]
            );
            if (selectedChoice && selectedChoice.isCorrect) {
              total += question.points;
            }
            break;
          case "Fill In the Blank":
            if (
              userResponses[index].toLowerCase() ===
              question.blanks[0].toLowerCase()
            ) {
              total += question.points;
            }
            break;
          default:
            break;
        }
      }
    });
  
    if (answeredQuestions === 0) {
      alert("You haven't attempted any questions. Quiz submission cancelled.");
      return;
    }
  
    setTotalPoints(total);
  
    document.getElementById("submit-button")?.setAttribute("disabled", "true");
  
    alert(`Quiz submitted! Total Points: ${total}`);
  
 
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };
  

  const renderInput = (question: Question) => {
    switch (question.questionType) {
      case "True/False":
        return (
          <div className="options-container">
            <input
              type="radio"
              id={`${question._id}-true`}
              name={`${question._id}-truefalse`}
              value="true"
              onChange={handleInputChange}
              checked={userResponses[currentQuestionIndex] === "true"}
            />
            <label htmlFor={`${question._id}-true`}>True</label>
            <input
              type="radio"
              id={`${question._id}-false`}
              name={`${question._id}-truefalse`}
              value="false"
              onChange={handleInputChange}
              checked={userResponses[currentQuestionIndex] === "false"}
            />
            <label htmlFor={`${question._id}-false`}>False</label>
          </div>
        );
      case "Multiple Choice":
        return (
          <div className="options-container">
            {question.choices.map((choice) => (
              <div key={choice._id} className="choice">
                <input
                  type="radio"
                  name={question._id}
                  id={`${question._id}-${choice._id}`}
                  value={choice.text}
                  onChange={handleInputChange}
                  checked={userResponses[currentQuestionIndex] === choice.text}
                />
                <label htmlFor={`${question._id}-${choice._id}`}>
                  {choice.text}
                </label>
              </div>
            ))}
          </div>
        );
      case "Fill In the Blank":
        return (
          <div className="fill-blanks-container">
            {question.blanks.map((blank, i) => (
              <input
                key={i}
                type="text"
                value={
                  isAdminOrFaculty
                    ? blank
                    : userResponses[currentQuestionIndex]
                }
                placeholder="Enter your answer here"
                onChange={handleInputChange}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const renderQuestionLink = (question: Question, index: number) => {
    return (
      <div
        key={question._id}
        className="questions-list"
        onClick={() => goToSelectedQuestion(index)}
      >
        Question {index + 1}
      </div>
    );
  };

  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-header">
        <h1>{title}</h1>
        <br />
        {isAdminOrFaculty && (
          <div className="preview-notice">
            This is a preview of the published version of the quiz
          </div>
        )}
      </div>

      <div className="quiz-container">
        <div className="quiz-content">
          {currentQuestion ? (
            <div key={currentQuestion._id} className="question-card">
              <div className="question-header">
                <p className="question-text">
                  Question {currentQuestionIndex + 1}
                  <div className="question-title">
                    {currentQuestion.questionTitle}
                  </div>
                </p>
                <div className="question-points">
                  {currentQuestion.points} pts
                </div>
              </div>
              <div style={{ padding: "20px" }}>
                <div>
                  {currentQuestion.questionText.replace(/<[^>]*>/g, "")}
                </div>
                {renderInput(currentQuestion)}
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
            <div>No Questions Added to this Quiz</div>
          )}
        </div>

        <div className="quiz-footer">
          {isAdminOrFaculty ? (
            <button
              className="edit-quiz-button"
              onClick={() => {
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
              }}
            >
              Keep Editing This Quiz
            </button>
          ) : (
            <button
              id="submit-button"
              className="submit-quiz-button"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      <div className="question-links-container">
        <h2 style={{ color: "black" }}>Questions</h2>
        {questions.map((question, index) =>
          renderQuestionLink(question, index)
        )}
      </div>
    </>
  );
}

export default PreviewEditor;


