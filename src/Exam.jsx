import { useState, useMemo } from "react"

const NUMBER_OF_QUESTIONS = 25

const randomSubarray = (array, subarrayLength) => {
  let subarray = [];

  while (subarray.length < subarrayLength) {
    var randomIndex = Math.floor(Math.random() * array.length)
    if (randomIndex > array.length || subarray.indexOf(randomIndex) !== -1) continue

    subarray.push(randomIndex)
  }

  return subarray.map(index => array[index]);
}


const Exam = ({ allQuestions, returnToMainPage, submitExam }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0) // question 0 to (NUM_OF_QUESTIONS - 1)
  const [chosenAnswers, setChosenAnswers] = useState([]);

  const questions = useMemo(() => randomSubarray(allQuestions, NUMBER_OF_QUESTIONS), [allQuestions])

  if (!allQuestions || !questions) {
    return <div className='Exam'>Loading...</div>
  }

  const question = questions[currentQuestion]

  const handleSelectAnswer = (optionNumber) => () => {
    let newAnswers = [...chosenAnswers]
    newAnswers[currentQuestion] = optionNumber
    setChosenAnswers(newAnswers)
  }

  const handleFinish = () => {
    const incompleteQuestions = []
    for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
      if (chosenAnswers[i] == undefined) {
        incompleteQuestions.push(i + 1)
      }
    }
    if (incompleteQuestions.length > 0) {
      alert('You have not completed all questions yet: ' + incompleteQuestions)
      return
    }

    submitExam(questions, chosenAnswers)
  }

  return  (
    <div className="Exam">
      <div>
        <h1>{currentQuestion + 1}. {question.title}</h1>
        <ol>
          {question.options.map((op, optionNumber) => (
            <li 
              className={`Option ${chosenAnswers[currentQuestion] == optionNumber ? 'Selected' : ''}`} 
              onClick={handleSelectAnswer(optionNumber)}
            >
              <p style={{ textDecoration: 'underline'}}>{op}</p>
            </li>
          ))}    
        </ol>
      </div>
      <div>
        <button onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}>Previous</button>
        {currentQuestion < NUMBER_OF_QUESTIONS - 1 
          ? <button 
              onClick={() => currentQuestion < (NUMBER_OF_QUESTIONS - 1) && setCurrentQuestion(currentQuestion + 1)}>
                Next
            </button>
          : <button onClick={handleFinish}>Finish</button>}
        <p></p>
        <p className='ReturnToMainPage' onClick={returnToMainPage}>Exit mock test</p>
      </div>
    </div> 
  )
}

export default Exam;
