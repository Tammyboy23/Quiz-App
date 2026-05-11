import { useState } from "react";
const quiz = [
    {question: "What is the capital of nigeria",
    answers: [
        "Anambra",
        "Abuja",
        "Lagos",
        "Guinea",
    ],
    correct: "Abuja"
},
{question: "What is the capital of US",
    answers: [
        "DC",
        "Houston",
        "Los Angelos",
        "Texas",
    ],
    correct: "DC"
}
    ]
function Page(){
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [score, setscore] = useState(0);
    const currentQuiz = quiz[currentQuestion]
    
    function handleAns(ans){
        if(ans === currentQuiz.correct){
            setscore(score + 1)
        }
        setcurrentQuestion(currentQuestion + 1);
    }
   
    return(
        <>
        <div className="app">
            <h1>hello quiz app</h1>
            {currentQuestion < quiz.length ? (
                <>
                    <h2>{currentQuiz.question}</h2>
                    <div className="buttons">
                        {currentQuiz.answers.map((ans) => (
                            <button key={ans} onClick={() => handleAns(ans)}>
                                {ans}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <h2>Quiz Complete! Final Score: {score}/{quiz.length}</h2>
            )}
            <h4>Score: {score}</h4>
        </div>
        </>
    )
}
export default Page;