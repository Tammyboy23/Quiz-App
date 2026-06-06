import { AiFillFire } from "react-icons/ai";
import { FaChartLine, FaTrophy } from "react-icons/fa";
import { FaMagnifyingGlass, FaStopwatch } from "react-icons/fa6";
import Top from "./top";

function Home() {
  const average = Number(localStorage.getItem("average") || 0);

  return (
    <>
      <Top />

      <div className="home">
        <div className="title">
          <span className="icon">
            <FaMagnifyingGlass />
          </span>
          <input type="search" placeholder="Search quizzes or topics..." />
        </div>

        <div className="dashboards">
          <article className="board">
            <div className="board-top">
              <h3>Average</h3>
              <span className="board-icon board-icon--blue">
                <FaChartLine size="20" color="blue" />
              </span>
            </div>
            <h1>{average}%</h1>
          </article>

          <article className="board">
            <div className="board-top">
              <h3>Streaks</h3>
              <span className="board-icon board-icon--red">
                <AiFillFire size="20" color="red" />
              </span>
            </div>
            <h1>2 Days</h1>
          </article>

          <article className="board">
            <div className="board-top">
              <h3>Duration</h3>
              <span className="board-icon board-icon--green">
                <FaStopwatch size="20" color="hsl(150, 100%, 47%)" />
              </span>
            </div>
            <h1>10s</h1>
          </article>

          <article className="board">
            <div className="board-top">
              <h3>Rankings</h3>
              <span className="board-icon board-icon--gold">
                <FaTrophy size="20" color="orange" />
              </span>
            </div>
            <h1>#1</h1>
          </article>
        </div>
      </div>
    </>
  );
}

export default Home;