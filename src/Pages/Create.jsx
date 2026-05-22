import { useState } from "react";

function Create(){
    const [mode, setmode] = useState("");
    return(
        <>
        <div className="create">
            <div className="create-box">
        {mode === "" ? (
            <div className="first">
            <div className="create-top">
                <h1>Create Quiz</h1>
                <p>Create your own quiz your customizable way to success</p>
                </div>
                <select value={mode} onChange={(e) => setmode(e.target.value)}>
                    <option value="">Select Mode</option>
                    <option value="Text">Written Mode</option>
                    <option value="Pdf">Pdf Mode</option>
                </select>
                </div>
        ) : (
            <div className="second">
                <button onClick={() => setmode("")}>Back</button>
                {mode === "Text" ? (
                    <div className="written">

                    </div>
                ): (
                    <div className="pd">

                    </div>
                )}
            </div>
        )}
            </div>
        </div>
        </>
    )
}
export default Create;