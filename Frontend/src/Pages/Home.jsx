import {  AiFillFire } from "react-icons/ai";
import Top from "./top";
import {  FaChartLine, FaTrophy } from "react-icons/fa";
import { FaMagnifyingGlass, FaStopwatch } from "react-icons/fa6";
import { LuBell, LuBellDot } from "react-icons/lu";
import { useState } from "react";

function Home(){
    const average = Number(localStorage.getItem("average") || 0);
    const [notication, setnotification] = useState([]);
    const [open, setopen] = useState(false)
    return(
        <>
        <div className="notfication"><button onClick={() => setopen(!open)}>{notication == 0 ? ( <LuBell  color="yellow" size={24}/>) : ( <LuBellDot  color="yellow" size={24}/> )}</button>
        {open ? (<div className="notifications">
            <h3>You have {notication.length} Notfications</h3>
            <div className="line"></div>
        </div>) : (null)}
        </div>
       
        <Top/>
        <div className="home">
        <div className="title">
        <span className="icon">< FaMagnifyingGlass /></span>
        <input type="search" placeholder="Search quizzes or topics..." />
      </div>
        <div className="dashboards">
            <div className="board">
                <div className="board-top"><h3>Average</h3><span style={{
                    background: 'hsl(205, 14%, 53%)',
                }}><FaChartLine size="20" color="blue" /></span></div>
                <h1 style={{
                    color: average > 80 ? 'green' : average > 50 ? 'yellow' :  average > 30 ? 'orange' : 'red',
                }}>{average}%</h1>
            </div>
            <div className="board">
                <div className="board-top"><h3>Streaks</h3> <span style={{
                    background: 'hsl(0, 12%, 48%)',
                }}><AiFillFire  size="20" color="red"/></span></div>
                <h1 style={{
                    color: 'red',
                }}>2 Days</h1>
            </div>
            <div className="board">
                <div className="board-top"><h3>Duration</h3><span style={{
                    background: 'hsl(120, 11%, 44%)',
                }}><FaStopwatch size="20" color="hsl(150, 100%, 47%)"/> </span></div>
                <h1 style={{
                    color: 'lightgreen'
                }}>10s</h1>
            </div>
            <div className="board">
                <div className="board-top">
                    <h3>Rankings</h3>
                    <span style={{
                        background: '#91907b',
                    }}><FaTrophy  size="20" color="orange"/></span>
                </div>
                <h1 style={{
                    color: 'orange',
                }}>#1</h1>
            </div>
        </div>
        </div>
        </>
    )
}
export default Home;