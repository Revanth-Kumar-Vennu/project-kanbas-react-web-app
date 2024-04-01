import {
  FaCaretDown,
  FaCog,
  FaFileExport,
  FaFileImport,
  FaFilter,
} from "react-icons/fa";
import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import "./index.css";
function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div style={{ marginRight: 55 }}>
      <div className="d-flex">
        <div className="main-theme">
          GradeBook <FaCaretDown />
        </div>
        <div className="ms-auto">
          <button type="button" className="btn btn-light wd-grades-buttons">
            <FaFileImport
              className="fas fa-file-import"
              style={{ color: "#000000" }}
            />{" "}
            Import
          </button>
          <button type="button" className="btn btn-light wd-grades-buttons">
            <FaFileExport
              className="fas fa-file-export"
              style={{ color: "#000000" }}
            />{" "}
            Export
          </button>
          <button type="button" className="btn btn-light wd-grades-buttons">
            <FaCog className="fas fa-cog" style={{ color: "#000000" }} />
          </button>
        </div>
      </div>

      <div className="d-flex">
        <div className="flex-grow-1">
          <div>
            <label>
              <b>Assignment Names</b>
            </label>
          </div>
          <div className="wd-search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search Assignments"
              id="search-assignment"
            />
          </div>
        </div>
        <div className="flex-grow-1 wd-search-student-div">
          <div>
            <label>
              <b>Student Names</b>
            </label>
          </div>
          <div className="wd-search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search Students"
              id="search-student"
            />
          </div>
        </div>
      </div>

      <div className="wd-apply-filter">
        <button type="button" className="btn btn-light wd-grades-buttons">
          <FaFilter className="fas fa-filter" style={{ color: "#000000" }} />{" "}
          Apply Filter
        </button>
      </div>
      <br />

      <div className="table-responsive">
        <table className="table table-striped table-bordered wd-grade-table">
          <thead>
            <th
              className="table-active"
              
              style={{ width: "15%", textAlign: "left" }}
            >
              Student Name
            </th>
            {as.map((assignment) => (
              <th  className="table-active col-4">
                {assignment.title}
              </th>
            ))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                  <td style={{ textAlign: "left" }}>
                    <span className="main-theme">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </td>
                  {as.map((assignment) => {
                    const grade = grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id
                    );
                    return <td align="center"><input style={{width:'20%'}} type="number" className="form-control" value={grade?.grade || ""}/></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Grades;
