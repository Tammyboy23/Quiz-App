function Page(){
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
    return(
        <>
        <div className="app">
            <h1>hello quiz app</h1>
            
        </div>
        </>
    )
}
export default Page;