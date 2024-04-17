import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuestion } from "../../questionsReducer";
import "./index.css";
import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { KanbasState } from "../../../../store";
import ReactQuill from "react-quill";

function Popup({
  title,
  onSubmit,
  onCancel,
}: {
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const dispatch = useDispatch();

  const selectedQuestion = useSelector(
    (state: KanbasState) => state.questionsReducer.selectedQuestion
  );

  const dummyQuestion = useSelector(
    (state: KanbasState) => state.questionsReducer.dummyQuestion
  );
  const [choices, setChoices] = useState(selectedQuestion.choices);
  const [blanks, setBlanks] = useState(selectedQuestion.blanks);

  useEffect(() => {}, [selectedQuestion]);

  const handleBlankChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let blank = [...blanks];
    blank[index] = event.target.value;
    setBlanks(blank);
    dispatch(setSelectedQuestion({ ...selectedQuestion, blanks: blank }));
  };

  const handleDeleteBlank = (index: number) => {
    let blank = [...blanks];
    blank.splice(index, 1);
    setBlanks(blank);
    dispatch(setSelectedQuestion({ ...selectedQuestion, blanks: blank }));
  };

  const handleDeleteChoice = (index: number) => {
    const choice = [...choices];
    choice.splice(index, 1);
    setChoices(choice);
    dispatch(setSelectedQuestion({ ...selectedQuestion, choices: choice }));
  };

  const handleAddBlank = () => {
    dispatch(
      setSelectedQuestion({ ...selectedQuestion, blanks: [...blanks, ""] })
    );
  };

  const handleAddChoice = () => {
    setChoices([...choices, { text: "", isCorrect: false }]);
    dispatch(
      setSelectedQuestion({
        ...selectedQuestion,
        choices: [...choices, { text: "", isCorrect: false }],
      })
    );
  };

  const handleChoiceChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const newChoices = choices.map((choice: any, i: any) => {
      if (i === index) {
        if (type === "isCorrect") {
          return {
            ...choice,
            isCorrect: event.target.checked,
          };
        } else {
          return {
            ...choice,
            text: event.target.value,
          };
        }
      } else {
        if (type === "isCorrect") {
          return {
            ...choice,
            isCorrect: false,
          };
        }
      }
      return choice;
    });

    setChoices(newChoices);
    dispatch(setSelectedQuestion({ ...selectedQuestion, choices: newChoices }));
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", "large", "huge"] }],
      [{ color: [] }, { background: [] }], // font color/background color
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="popup-container">
      <div className="popup" style={{ margin: "1%" }}>
        <div className="d-flex">
          <input
            style={{ width: "20vw" }}
            type="text"
            className="form-control"
            placeholder="Question Title"
            defaultValue={selectedQuestion.questionTitle}
            onChange={(e) => {
              dispatch(
                setSelectedQuestion({
                  ...selectedQuestion,
                  questionTitle: e.target.value,
                })
              );
            }}
          />
          &nbsp;&nbsp;
          <select
            style={{ width: "20vw" }}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              dispatch(
                setSelectedQuestion({
                  ...selectedQuestion,
                  questionType: e.target.value,
                })
              );
            }}
            defaultValue={selectedQuestion.questionType}
          >
            {selectedQuestion.questionType === "Multiple Choice" ? (
              <option value="Multiple Choice" selected>
                Multiple Choice
              </option>
            ) : (
              <option value="Multiple Choice">Multiple Choice</option>
            )}
            {selectedQuestion.questionType === "Fill In the Blank" ? (
              <option value="Fill In the Blank" selected>
                Fill in the blank
              </option>
            ) : (
              <option value="Fill In the Blank">Fill In the Blank</option>
            )}
            {selectedQuestion.questionType === "True/False" ? (
              <option value="True/False" selected>
                True/False
              </option>
            ) : (
              <option value="True/False">True/False</option>
            )}
          </select>
          <div className="ms-auto">
            <div className="d-flex">
              <label>Points: </label>
              <input
                style={{ width: "10vw" }}
                type="number"
                className="form-control"
                placeholder="Points"
                min={0}
                max={100}
                value={selectedQuestion.points}
                onChange={(e) => {
                  dispatch(
                    setSelectedQuestion({
                      ...selectedQuestion,
                      points: e.target.value,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>

        <hr />

        <div>
          {selectedQuestion.questionType === "Multiple Choice" && (
            <p>
              Enter your question and multiple answers and then select the
              correct answer
            </p>
          )}
          {selectedQuestion.questionType === "Fill In the Blank" && (
            <p>Enter your question and then enter the correct answer</p>
          )}
          {selectedQuestion.questionType === "True/False" && (
            <p>Enter your question and then select the correct answer</p>
          )}
          <strong>Question</strong>
          <ReactQuill
            value={selectedQuestion.questionText}
            placeholder="Enter your question here"
            onChange={(content) => {
              dispatch(
                setSelectedQuestion({
                  ...selectedQuestion,
                  questionText: content,
                })
              );
            }}
            modules={modules}
            style={{ height: "15vh", marginBottom: "50px" }}
          />
          {/* <Editor
            apiKey="ctsf9konqnxvij7fpkpaaemdrfbiuaruiy45n8gvi61sm8dy" // Replace with your TinyMCE API key
            initialValue={selectedQuestion.questionText}
            onEditorChange={(content) => {
                dispatch(
                    setSelectedQuestion({
                    ...selectedQuestion,
                    questionText: content
                    })
                );
             
            }}
            init={{
              height: 200,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | table",
            }}
          /> */}
        </div>
        <br />

        <div style={{ marginTop: "10px" }}>
          <strong>Answers</strong>
          <br />

          {selectedQuestion.questionType === "Multiple Choice" && (
            <ul className="answer-list">
              {selectedQuestion.choices.map((answer: any, index: any) => (
                <li key={index} style={{ marginBottom: "20px" }}>
                  <div className="d-flex">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="correctAnswer"
                      checked={answer.isCorrect}
                      onChange={(event) =>
                        handleChoiceChange(index, event, "isCorrect")
                      }
                    />
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      style={{ width: "40vw" }}
                      placeholder="Enter your answer here"
                      className="form-control"
                      defaultValue={answer.text}
                      onChange={(event) =>
                        handleChoiceChange(index, event, "text")
                      }
                    />
                    <FaTrash
                      className="fas fa-trash"
                      style={{
                        color: "grey",
                        cursor: "pointer",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                      onClick={() => {
                        handleDeleteChoice(index);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {selectedQuestion.questionType === "Fill In the Blank" && (
            <ul className="answer-list">
              {selectedQuestion.blanks.map((answer: any, index: any) => (
                <li key={index} style={{ marginBottom: "20px" }}>
                  <div className="d-flex">
                    <input
                      type="text"
                      style={{ width: "40vw" }}
                      placeholder="Enter your answer here"
                      className="form-control"
                      defaultValue={answer}
                      onChange={(event) => handleBlankChange(index, event)}
                    />
                    <FaTrash
                      className="fas fa-trash"
                      style={{
                        color: "grey",
                        cursor: "pointer",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                      onClick={() => {
                        handleDeleteBlank(index);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {selectedQuestion.questionType === "True/False" && (
            <div className="d-flex">
              &nbsp;&nbsp;
              <label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="correctAnswer"
                  value="true"
                  onChange={(e) => {
                    dispatch(
                      setSelectedQuestion({
                        ...selectedQuestion,
                        trueFalseAnswer: true,
                      })
                    );
                  }}
                  checked={selectedQuestion.trueFalseAnswer}
                />
                &nbsp;&nbsp; True
              </label>
              <label>
                &nbsp;&nbsp;
                <input
                  type="radio"
                  className="form-check-input"
                  name="correctAnswer"
                  value="false"
                  onChange={(e) => {
                    dispatch(
                      setSelectedQuestion({
                        ...selectedQuestion,
                        trueFalseAnswer: false,
                      })
                    );
                  }}
                  checked={!selectedQuestion.trueFalseAnswer}
                />
                &nbsp;&nbsp; False
              </label>
            </div>
          )}
          {(selectedQuestion.questionType === "Multiple Choice" ||
            selectedQuestion.questionType === "Fill In the Blank") && (
            <div className="ms-auto">
              {selectedQuestion.questionType === "Fill In the Blank" && (
                <button
                  className="btn btn-danger me-2 wd-add-module"
                  onClick={() => handleAddBlank()}
                >
                  <FaPlus className="fas fa-plus me-2" />
                  Add Answer{" "}
                </button>
              )}
              {selectedQuestion.questionType === "Multiple Choice" && (
                <button
                  className="btn btn-danger me-2 wd-add-module"
                  onClick={handleAddChoice}
                >
                  <FaPlus className="fas fa-plus me-2" />
                  Add Choice{" "}
                </button>
              )}
            </div>
          )}
          <br />
          <div>
            <button
              className="btn btn-secondary wd-module-button"
              onClick={() => {
                dispatch(setSelectedQuestion(dummyQuestion));
                onSubmit();
              }}
            >
              {title === "Add Question" ? "Add Question" : "Update Question"}
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(setSelectedQuestion(dummyQuestion));
                onCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
