import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: Array<any>(),
  selectedQuiz: {
    _id: "123",
    title: "New Title",
    course: "6611cdf8f4fcf6fe33fef998",
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "When correct answers are shown to students",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2022-12-31",
    availableDate: "2022-12-01",
    untilDate: "2022-12-31",
    isPublished: true
  },
  quiz:{},
  dummyQuiz: {
    _id: "123",
    title: "New Title",
    course: "6611cdf8f4fcf6fe33fef998",
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "When correct answers are shown to students",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2022-12-31",
    availableDate: "2022-12-01",
    untilDate: "2022-12-31",
    isPublished: true
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [
        {
          ...state.quizzes,
          ...action.payload,
          _id: new Date().getTime().toString(),
        },
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quizzes) => quizzes._id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setSelectedQuiz: (state, action) => {
      state.selectedQuiz = action.payload;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setSelectedQuiz,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
