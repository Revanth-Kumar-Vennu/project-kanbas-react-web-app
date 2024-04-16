import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: Array<any>(),
  selectedQuestion: {
    _id: "123",
    questionTitle: "New Title",
    points: 100,
    questionType: "Multiple Choice",
    questionText: "",
    choices: [],
    blanks: [],
  },
  question: {
    _id: "123",
    questionTitle: "New Title",
    points: 100,
    questionType: "Multiple Choice",
    questionText: "",
    choices: [],
    blanks: [],
  },
  dummyQuestion: {
    _id: "123",
    questionTitle: "New Title",
    points: 100,
    questionType: "Multiple Choice",
    questionText: "",
    choices: [],
    blanks: [],
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      // console.log("action.payload", action.payload);
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      console.log("action.payload", action.payload);
      state.questions = [
        ...state.questions,
        {
          ...action.payload,
        },
      ];
      // return state;
      console.log("state.questions", state.questions);
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (questions) => questions._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      console.log("action.payload", action.payload);
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
  setSelectedQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;
