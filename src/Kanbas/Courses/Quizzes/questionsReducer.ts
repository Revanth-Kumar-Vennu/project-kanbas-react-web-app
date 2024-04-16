
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: Array<any>(),
    selectedQuestion: {
        _id: "123",
        title: "New Title",
        description: "New Description",
        points: 100,
        questionType: "True/False",
        question: "Is the sky blue?",
        correctAnswer: "True",
        options: ["True", "False"],
        quiz: "6611cdf8f4fcf6fe33fef998",
        questionNumber: 1,
        isTrue: true,
    },
    question: {
        _id: "123",
        title: "New Title",
        description: "New Description",
        points: 100,
        questionType: "True/False",
        question: "Is the sky blue?",
        correctAnswer: "True",
        options: ["True", "False"],
        quiz: "6611cdf8f4fcf6fe33fef998",
        questionNumber: 1,
        isTrue: true,
    },
    dummyQuestion: {
        _id: "123",
        title: "New Title",
        description: "New Description",
        points: 100,
        questionType: "True/False",
        question: "Is the sky blue?",
        correctAnswer: "True",
        options: ["True", "False"],
        quiz: "6611cdf8f4fcf6fe33fef998",
        questionNumber: 1,
        isTrue: true,
    },
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
          },
          addQuestion: (state, action) => {
            state.questions = [
              {
                ...state.questions,
                ...action.payload,
                _id: new Date().getTime().toString(),
              },
            ];
          },
          deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
              (questions) => questions._id !== action.payload
            );
          },
          updateQuestion: (state, action) => {
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
