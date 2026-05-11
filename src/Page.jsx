import { useState } from "react";
import { quiz } from "./Questions/CTM";
function Page(){
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState(quiz.length);
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [score, setscore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [assist, setassist] = useState(false);
    
    const quizToShow = quiz.slice(0, selectedQuestions);
    const currentQuiz = quizToShow[currentQuestion]
    
    function handleAns(e, ans){
        if(answered) return;
        setAnswered(true);
        if(ans === currentQuiz.answer){
            setscore(score + 1);
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");
            setassist(true)
        }
    }
    function startQuiz(){
        setQuizStarted(true)
        setcurrentQuestion(0)
        setscore(0)
        setAnswered(false)
    }
    function restart(){
        setQuizStarted(false)
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
            {/**WELCOME SCREEN MADE BY ME 😘 */}
            {!quizStarted ? (
                <div className="opening">
                    <div className="welcome-content">
                        <h1>Quizora</h1>
                        <p className="welcome-subtitle">Challenge yourself with our amazing questions</p>
                        <div className="question-selector">
                            <label htmlFor="questionCount">Select Number of Questions:</label>
                            <div className="selector-group">
                                <input 
                                    type="range" 
                                    id="questionCount" 
                                    min="1" 
                                    max={quiz.length} 
                                    value={selectedQuestions}
                                    onChange={(e) => setSelectedQuestions(Number(e.target.value))}
                                    className="range-input"
                                />
                                <span className="question-count">{selectedQuestions}/{quiz.length}</span>
                            </div>
                        </div>
                        <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
                    </div>
                </div>
            ) : currentQuestion < quizToShow.length ? (
                /**QUIZ PAGE ITSELF */
                <div className="quiz">
                    <div className="top">
                    <h3>Question: {currentQuestion + 1}</h3>

                    <h2>{currentQuiz.question}</h2>
                    </div>
                    {/**QUESTION OPTION IN FORM OF BUTTONS */}
                    <div className="buttons">
                        {currentQuiz.options.map((ans) => (
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
                        <div className="button-group">
                            <button onClick={skipQuestion} disabled={currentQuestion === quizToShow.length - 1}>
                                Skip
                            </button>
                            <button onClick={nextQuestion} disabled={!answered}>
                                {currentQuestion < quizToShow.length - 1 ? "Next" : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="screen">
                    <h2>Quiz Complete! 🎉 </h2>
                    <h2>{score}/{quizToShow.length}</h2>
                    <div className="quiz-stats">
                        You answered {score} out of {quizToShow.length} questions correctly
                    </div>
                    <div className="result-percentage">
                        {Math.round((score / quizToShow.length) * 100)}%
                    </div>
                    <button onClick={() => restart()}>Take Another Quiz</button>
                </div>
                
            )}
            
        </div>
        </>
    )
}
export default Page;