import Top from "./top";

function Home(){
    const user = localStorage.getItem("username");
    return(
        <>
        <Top/>
        <div className="home">
        <div className="greet">
            <h2>Welcome {user || "Guest"} 👋 </h2>
        </div>
        <div className="dashboards">
            <div className="board"></div>
            <div className="board"></div>
            <div className="board"></div>
            <div className="board"></div>
        </div>
        </div>
        </>
    )
}
export default Home;