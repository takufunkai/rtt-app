const ReviewExam = ({ questions, answers, returnToMainPage }) => {

  const score = answers.filter((answer, questionNumber) => questions[questionNumber].answer === answer)


  return (
    <>
      <div className='ReviewExam'>
        <h1>{score.length}/{questions.length}</h1>
        {questions.map((question, questionNumber) => (
          <>
            <h1>{questionNumber + 1}. {question.title}</h1>
            <ol>
            {question.options.map((option, optionNumber) => {
              const isCorrectAnswer = () => question.answer == optionNumber
              const isChosenAnswer = () => answers[questionNumber] == optionNumber
              return (
                <li 
                  className={`
                    ${isCorrectAnswer() // This is the correct option
                      ? 'CorrectAnswerOption'
                      : isChosenAnswer()
                        ? 'WrongAnswerOption'
                        : ''}
                  `} >{option}{isCorrectAnswer() && ' (Answer)'}{isChosenAnswer() && ' (Chosen)'}</li>
              )
            })}
            </ol>
          </>
        ))}
      </div>
      <p className='ReviewExamBackToMainPage' onClick={returnToMainPage}>
        back to main page
      </p>
    </>
  )

}

export default ReviewExam