import { Link } from "react-router-dom";
import { quizes } from "../Questions/quizes";
import Top from "./top";

function Explore() {

  return (
    <>
      <Top />
      <div className="explore">
        <div className="quizes">
          {quizes.map((quiz) => (
            <div className="quiz" key={quiz.quiz}>
              <h1>{quiz.name}</h1>
              <p>{quiz.desc}</p>
              <Link to={`/quiz/${quiz.quiz}`}>
                <button>Start</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Explore;