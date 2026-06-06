import { useState } from "react";
import { FaLaptop } from "react-icons/fa";
import { LuArrowLeft } from "react-icons/lu";

function Create(){
    const [mode, setmode] = useState("");
    const [number, setnumber] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files?.[0] || null);
    };

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
                <button onClick={() => setmode("")} className="back"> < LuArrowLeft />Back</button>
                {mode === "Text" ? (
                    <div className="written">
                    <h3>Written Mode</h3>
                    <input type="text" placeholder="Enter a name for the Quiz"/>
                    <input type="text" placeholder="Enter subject, topics ...." />
                    <label htmlFor="">Number of Questions</label>
                    <div className="range">
                    <span>{number}</span><input type="range" min="1" max={200} value={number} onChange={(e) => setnumber(e.target.value)}/><span>200</span>
                    </div>
                    <button>Create <FaLaptop /></button>
                    </div>
                ): (
                    <div className="pd">
                        <h3>PDF MODE</h3>
                        <input type="text"placeholder="Enter name of Quiz" />
<form className="file-upload-form">
  <label className="file-upload-label" htmlFor="file">
    <div className="file-upload-design">
      <svg height="1em" viewBox="0 0 640 512">
        <path
          d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
        ></path>
      </svg>
      <p>{selectedFile ? "Document attached" : "Drag and Drop"}</p>
      <p>{selectedFile ? "Tap to change file" : "or"}</p>
      <span className="browse-button">{selectedFile ? selectedFile.name : "Browse file"}</span>
    </div>
    <input type="file" id="file" onChange={handleFileChange} accept=".pdf,application/pdf" />
  </label>
</form>
<div className="range">
                    <span>{number}</span><input type="range" min="1" max={200} value={number} onChange={(e) => setnumber(e.target.value)}/><span>200</span>
                    </div>
{selectedFile && <p className="file-attached-note">Attached: {selectedFile.name}</p>}
<button>Create <FaLaptop /></button>
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