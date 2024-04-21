import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KanbasState } from "../../../store";
import * as client from "../client";
import "./index.css";

function PreviewEditor() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  // useEffect(() => {
  //   client
  //     .findQuestionByQuizID(quizId)
  //     .then((questions) => {
  //       setQuestions(questions);
  //     });
  // }, []);

  const currentUserRole = useSelector( (state: KanbasState) => state.usersReducer.role )


  const isAdminOrFaculty= (currentUserRole === "ADMIN") || (currentUserRole === "FACULTY");
 
  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        const fetchedQuiz = await client.findQuizByID(quizId);
        setTitle(fetchedQuiz.title);
  
        const fetchedQuestions = await Promise.all(
          fetchedQuiz.questions.map((questionId :Question ) =>
            client.findQuestionByID(questionId)
          )
        );
  
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching quiz and questions:", error);
      }
    };
  
    fetchQuizAndQuestions();
  }, []);


  // useEffect(() => {
  //   const fetchQuizAndQuestions = async () => {
  //     try {
  //       const fetchedQuiz = await client.findQuizByID(quizId);

  //       const fetchedQuestions = await Promise.all(
  //         fetchedQuiz.questions.map((questionId: any) =>
  //           client.findQuestionByID(questionId)
  //         )
  //       );
  //       dispatch(setQuestions(fetchedQuestions));
  //     } catch (error) {
  //       console.error("Error fetching quiz and questions:", error);
  //     }
  //   };
  //   fetchQuizAndQuestions();
  // }, [dispatch, quizId]);

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

  const renderMultipleChoiceOptions = (question: Question) => (
    <div className="options-container">
      {question.choices.map((choice) => (
        <div key={choice._id} className="choice">
          <input
            type="radio"
            name={question._id}
            id={`${question._id}-${choice._id}`}
          />
          <label htmlFor={`${question._id}-${choice._id}`}>{choice.text}</label>
        </div>
      ))}
    </div>
  );

  const renderFillInTheBlanks = (question: Question) => (
    <div className="fill-blanks-container">
      {question.blanks.map((_, i) => (
        <input
          key={i}
          type="text"
          value={""}
          placeholder="Enter your answer here"
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

  const renderQuestionLink = (question: Question, index: number) => {
    return (
      <div key={question._id} className="questions-list" onClick={() => goToSelectedQuestion(index)}>
        Question {index + 1}
      </div>
    );
  };
  
  const currentQuestion: Question = questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-header">
        <h1>{title}</h1><br />
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
              
            
              
              <div style={{padding: "20px"}}>
                <div>{currentQuestion.questionText.replace(/<[^>]*>/g, '')}</div>

                {currentQuestion.questionType === "True/False" &&
                  renderTrueFalseOptions(currentQuestion)}

                {currentQuestion.questionType === "Multiple Choice" &&
                  renderMultipleChoiceOptions(currentQuestion)}

                {currentQuestion.questionType === "Fill In the Blank" &&
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
            <div>No Questions Added to this Quiz</div>
          )}
        </div>

        {/* <div className="quiz-footer">
          <button className="edit-quiz-button" onClick={() => {
            // Navigate back to the quiz details screen
            navigate(
              `/Kanbas/Courses/${courseId}/Quizzes/${quizId}`
            );
          }}
          >Keep Editing This Quiz</button>
        </div> */}

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
      className="submit-quiz-button" 
      onClick={() => {
        
        alert("Quiz submitted!");
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`)
      }}
    >
      Submit Quiz
    </button>
  )}
</div>

      </div>

      
      <div className="question-links-container">
      <h2 style={{color:"black"}}>Questions</h2>
        {questions.map((question, index) => renderQuestionLink(question, index))}
      </div>
    </>
  );
}

export default PreviewEditor;
function dispatch(arg0: void) {
  throw new Error("Function not implemented.");
}

