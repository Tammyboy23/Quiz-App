import { useState, useEffect, useRef } from "react";
import { quiz1 } from "./Questions/Quiz1";
import { quiz2 } from "./Questions/Quiz2";

function Page(){
    const [quizStarted, setQuizStarted] = useState(false);
    const quizsel = [quiz1, quiz2];
    const [active, setactive] = useState(0);
    const quiz = quizsel[active];
    const appRef = useRef(null);

    const [mode, setMode] = useState("practice");
    const [selectedQuestions, setSelectedQuestions] = useState(quiz.length);
    const [currentQuestion, setcurrentQuestion] = useState(0);
    const [score, setscore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [assist, setassist] = useState(false);
    const [fullscreenWarning, setFullscreenWarning] = useState(false);
    const [quizCancelled, setQuizCancelled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const countdownTimerRef = useRef(null);
    
    useEffect(() => {
        setSelectedQuestions(prev => Math.min(prev, quiz.length));
        setcurrentQuestion(0);
    }, [active, quiz.length]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (mode !== "exam" || !quizStarted) {
                return;
            }

            if (document.fullscreenElement && fullscreenWarning) {
                // User returned to fullscreen - dismiss warning and continue
                setFullscreenWarning(false);
                setTimeLeft(30);
                if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            } else if (!document.fullscreenElement && quizStarted && !fullscreenWarning) {
                // User exited fullscreen in exam mode - show warning and start countdown
                setFullscreenWarning(true);
                setTimeLeft(30);

                let seconds = 30;
                countdownTimerRef.current = setInterval(() => {
                    seconds -= 1;
                    setTimeLeft(seconds);

                    if (seconds <= 0) {
                        clearInterval(countdownTimerRef.current);
                        setQuizCancelled(true);
                        setFullscreenWarning(false);
                        setQuizStarted(false);
                    }
                }, 1000);
            } else if (!document.fullscreenElement && fullscreenWarning && quizStarted) {
                // User exited fullscreen again while warning was active - cancel quiz
                setQuizCancelled(true);
                setFullscreenWarning(false);
                setQuizStarted(false);
                if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [quizStarted, fullscreenWarning, mode]);

    const quizToShow = quiz.slice(0, selectedQuestions);
    const currentQuiz = quizToShow[currentQuestion];
    
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
        setFullscreenWarning(false)
        setQuizCancelled(false)
        setTimeLeft(30)

        if (mode === "exam") {
            if (appRef.current && appRef.current.requestFullscreen) {
                appRef.current.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            }
        }
    }
    function restart(){
        setQuizStarted(false)
        setcurrentQuestion(0)
        setscore(0)
        setAnswered(false)
        setassist(false)
        setFullscreenWarning(false)
        setQuizCancelled(false)
        setTimeLeft(30)
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
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
        <div className="app" ref={appRef}>
            {quizCancelled ? (
                <div className="screen">
                    <h2>Quiz Cancelled ❌</h2>
                    <div className="quiz-stats" style={{color: "var(--incorrect)"}}>
                        You left fullscreen. Idiot! simple instruction you can't hear.
                    </div>
                    <h2 style={{fontSize: "2rem", color: "var(--incorrect)"}}>FAILED</h2>
                    <button onClick={() => restart()}>Try Again</button>
                </div>
            ) : fullscreenWarning ? (
                <div className="screen">
                    <h2>⚠️ Fullscreen Required</h2>
                    <div className="quiz-stats">
                        You've exited fullscreen. Don't be a fool and return to fullscreen to continue your quiz.
                    </div>
                    <div className="result-percentage">
                        {timeLeft}s
                    </div>
                    <div className="quiz-stats" style={{color: "var(--incorrect)"}}>
                        If you don't return within {timeLeft} seconds, your quiz will be cancelled.
                    </div>
                    <button onClick={() => {
                        if (appRef.current && appRef.current.requestFullscreen) {
                            appRef.current.requestFullscreen().catch(err => {
                                console.error(`Error attempting to enable fullscreen: ${err.message}`);
                            });
                        }
                    }}>Return to Fullscreen</button>
                </div>
            ) : !quizStarted ? (
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
                            <select value={active} onChange={(e) => setactive(Number(e.target.value))}>
                                <option value={0}>PHYSICS</option>
                                <option value={1}>MATHS</option>
                            </select>
                            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                                <option value="practice">Practice Mode</option>
                                <option value="exam">Exam Mode</option>
                            </select>
                        </div>
                        <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
                    </div>
                </div>
            ) : currentQuestion < quizToShow.length ? (
                <div className="quiz">
                    <div className="top">
                        <h3>Question: {currentQuestion + 1}</h3>
                        <h2>{currentQuiz.question}</h2>
                    </div>
                    <div className="progress-wrap">
                        <div className="progress-label">
                            {quizToShow.length - currentQuestion - 1} questions left
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${((currentQuestion + 1) / quizToShow.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        {currentQuiz.options.map((ans) => (
                            <button key={ans} onClick={(e) => handleAns(e, ans)} disabled={answered}>
                                {ans}
                            </button>
                        ))}
                    </div>
                    {assist && (
                        <div className="assist">
                            Ans: {currentQuiz.answer}
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