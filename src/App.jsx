import { BrowserRouter, Routes ,Route} from "react-router-dom";
import Home from "./Pages/Home";
import Page from "./Pages/Page";
import NavBar from "./Pages/NavBar";
import Explore from "./Pages/Explore";
import Sign from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Create from "./Pages/Create";

function App(){
    return(
        <>
        <BrowserRouter>
        <div className="layout">
        <NavBar />
        <main className="content">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/quiz/:id" element={<Page/>}/>
            <Route path="/signup" element={<Sign/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/create" element={<Create />} />
        </Routes>
        </main>
        </div>

        </BrowserRouter>
        </>
    )
}
export default App;