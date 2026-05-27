import { Link } from "react-router-dom";
import { quizes } from "../Questions/quizes";
import { LiaClipboardListSolid , LiaArrowRightSolid} from "react-icons/lia";
import { LuFileStack } from "react-icons/lu";
import Top from "./top";

function Explore() {

  return (
    <>
      <Top />
      <div className="explore">
        <div className="quizes">
          {quizes.map((quiz) => (
            <div className="quizy" key={quiz.quiz}>
              <img src={quiz.img} alt="" />
              <h1>{quiz.name}</h1>
              <p>{quiz.desc}</p>
              <span><LuFileStack /> {quiz.length} Qs</span>
              <Link to={`/quiz/${quiz.quiz}`}>
                <button>Start Quiz <LiaArrowRightSolid /></button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Explore;