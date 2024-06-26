import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

function Assignment5() {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  return (
    <div>
      <h1>Assignment 5</h1>
      <a href={API_BASE + "/a5/welcome"}>Welcome</a>
      <div>
        <EncodingParametersInURLs />
        <WorkingWithArrays />
        <WorkingWithObjects />
      </div>
    </div>
  );
}
export default Assignment5;
