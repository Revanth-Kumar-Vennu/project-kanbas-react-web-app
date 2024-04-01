import ModuleList from "../Modules/list";
import Status from "../Status";

function Home({ course_id, course}: { course_id: string, course: any}) {
  return (
    <div className="d-flex">
      <ModuleList />
      <Status course_id={course_id} course={course} />
    </div>
  );
}
export default Home;
