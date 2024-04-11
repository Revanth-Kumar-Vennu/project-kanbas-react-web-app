import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


function NavigationTabs() {
  const { courseId } = useParams();
  const pathname = useLocation().pathname;
  const { quizId } = useParams();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link
        to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/DetailsEditor`}
        className={`nav-link ${
          pathname.includes("DetailsEditor") ? "active" : ""
        }`}
      >
        Details
      </Link>
      <Link
        to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/QuestionsEditor`}
        className={`nav-link ${
          pathname.includes("QuestionsEditor") ? "active" : ""
        }`}
      >
        Questions
      </Link>
    </nav>
  );
}
export default NavigationTabs;
