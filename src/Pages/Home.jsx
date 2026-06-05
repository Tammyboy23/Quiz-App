import { AiFillFire } from "react-icons/ai";
import Top from "./top";
import { FaChartLine, FaTrophy } from "react-icons/fa";
import { FaClockRotateLeft , FaMagnifyingGlass } from "react-icons/fa6";

function Home(){
    const average = Number(localStorage.getItem("average") || 0);
    return(
        <>
        <Top/>
        <div className="home">
        <div className="title">
        <span className="icon">< FaMagnifyingGlass /></span>
        <input type="search" placeholder="Search quizzes or topics..." />
      </div>
        <div className="dashboards">
            <div className="board">
                <div className="board-top"><h3>Average</h3><span style={{
                    background: 'hsl(204, 100%, 83%)',
                }}><FaChartLine size="20" color="blue" /></span></div>
                <h1>{average}%</h1>
            </div>
            <div className="board">
                <div className="board-top"><h3>Streaks</h3> <span style={{
                    background: 'hsl(0, 86%, 87%)',
                }}><AiFillFire  size="20" color="red"/></span></div>
                <h1>2 Days</h1>
            </div>
            <div className="board">
                <div className="board-top"><h3>Duration</h3><span style={{
                    background: 'hsl(120, 100%, 90%)',
                }}><FaClockRotateLeft size="20" color="hsl(150, 100%, 47%)"/> </span></div>
                <h1>10s</h1>
            </div>
            <div className="board">
                <div className="board-top">
                    <h3>Rankings</h3>
                    <span style={{
                        background: '#faf9d1',
                    }}><FaTrophy  color="orange"/></span>
                </div>
                <h1>#1</h1>
            </div>
        </div>
        </div>
        </>
    )
}
export default Home;