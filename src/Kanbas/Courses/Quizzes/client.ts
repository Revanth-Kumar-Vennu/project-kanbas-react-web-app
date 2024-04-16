import axios from "axios";
import exp from "constants";
const API_BASE = process.env.REACT_APP_API_BASE_URL;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;
export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  console.log("response", response.data);
  return response.data;
};
export const createQuiz = async (courseId: any, quiz: any) => {
  console.log("courseId", courseId);
  console.log("module", quiz);
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quiz: { _id: any }) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const findQuizByID = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
}

export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const deleteQuestion = async (questionId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/questions/${questionId}`);
  return response.data;
};

export const createQuestion = async (quizId: any, question: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (question: { _id: any }) => {
  const response = await axios.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return response.data;
};

export const findQuestionByID = async (questionId: any) => {
  const response = await axios.get(`${QUIZZES_API}/questions/${questionId}`);
  return response.data;
};


export const findQuestionByQuizID = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  console.log("response", response.data);
  return response.data;
}


