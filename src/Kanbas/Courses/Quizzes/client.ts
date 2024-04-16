import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE_URL;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
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
  console.log("quiz in update", quiz);
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const findQuizByID = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  console.log("response", response.data);
  return response.data;
}


export const findQuestionByQuizID = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  console.log("response", response.data);
  return response.data;
}