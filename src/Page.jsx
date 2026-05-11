import { useState } from "react";
import { quiz } from "./Questions/CTM";
function Page(){
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [score, setscore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [assist, setassist] = useState(false);
    const currentQuiz = quiz[currentQuestion]
    
    function handleAns(e, ans){
        if(answered) return;
        setAnswered(true);
        if(ans === currentQuiz.correct){
            setscore(score + 1);
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");
            setassist(true)
        }
    }
    function restart(){
        setcurrentQuestion(0)
        setscore(0)
        setAnswered(false)
    }
    function nextQuestion(){
        setAnswered(false)
        setcurrentQuestion(currentQuestion + 1)
        setassist(false)
    }
    function skipQuestion(){
        setAnswered(false)
        setcurrentQuestion(currentQuestion + 1)
        setassist(false)
    }
   
    return(
        <>
        <div className="app">
            {currentQuestion < quiz.length ? (
                <div className="quiz">
                    <div className="top">
                    <h3>Question: {currentQuestion + 1}</h3>
                    <h2>{currentQuiz.question}</h2>
                    </div>
                    <div className="buttons">
                        {currentQuiz.answers.map((ans) => (
                            <button key={ans} onClick={(e) => handleAns(e, ans)} disabled={answered}>
                                {ans}
                            </button>
                        ))}
                    </div>
                    {assist && (
                        <div className="assist">
                            {currentQuiz.explanation}
                        </div>
                    )}
                    <div className="btm">
                        <h4>Score: {score}</h4>
                        <div className="button-group">
                            <button onClick={skipQuestion} disabled={currentQuestion === quiz.length - 1}>
                                Skip
                            </button>
                            <button onClick={nextQuestion} disabled={!answered}>
                                {currentQuestion < quiz.length - 1 ? "Next" : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="screen">
                    <h2>Quiz Complete! 🎉 </h2>
                    <h2>Final Score: {score}/{quiz.length}</h2>
                    <button onClick={() => restart()}>Restart</button>
                </div>
                
            )}
            
        </div>
        </>
    )
}
export default Page;