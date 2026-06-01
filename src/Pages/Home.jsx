import Top from "./top";
import { FaChartLine } from "react-icons/fa";
import { FaFire , FaTimesCircle} from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";

function Home(){
    const user = localStorage.getItem("username");
    const average = localStorage.getItem("average");
    return(
        <>
        <Top/>
        <div className="home">
        <div className="greet">
            <h2>Welcome {user || "Guest"} 👋 </h2>
        </div>
        <div className="dashboards">
            <div className="board">
                <h3>Average</h3>
                <h1>{average}</h1>
                <span><FaChartLine/></span>
            </div>
            <div className="board"></div>
        </div>
        </div>
        </>
    )
}
export default Home;