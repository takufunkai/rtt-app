import './App.css';
import { useEffect, useState } from 'react';
import questionsJson from './questions.json'
import Exam from './Exam';
import ReviewExam from './ReviewExam';

const URL = 'https://guidescroll.com/2020/03/singapore-class-2b-riding-theory-test-question-bank/'
// eslint-disable-next-line import/no-webpack-loader-syntax
let htmlModule = require('raw-loader!./page.html')

// Use this to regenerate a new set of questions json file from a new page.html ol > li list
const parseQuestionHtmlToArray = () => {
    const parser = new DOMParser()
    const virtualDoc = parser.parseFromString(htmlModule.default, 'text/html')
    const questions = virtualDoc.getElementsByClassName('question-list')[0].childNodes

    const questionBank = []

    for (let i = 0; i < questions.length; i++)  {
      const questionJson = {
        title: questions[i].innerHTML.split('<ol')[0],
        answer: -1,
        options: []
      }
      const questionDoc = parser.parseFromString(questions[i].innerHTML, 'text/html')
      const optionElements = questionDoc.getElementsByTagName('li')
      const answer = questionDoc.getElementsByTagName('strong')[0].innerText 
      for (let j = 0; j < 3; j++) {
        const option = optionElements[j].innerText
        questionJson.options[j] = option

        if (option == answer) {
          questionJson.answer = j
        }
      }
      questionBank.push(questionJson)
    }
}

function App() {
  const [pageState, setPageState] = useState('')
  const [questionsToReview, setQuestionsToReview] = useState()
  const [chosenAnswers, setChosenAnswers] = useState()

  const handleStartExam = () => {
    setPageState('mockExam');
  }

  const handleSubmitExam = (questions, answers) => {
    setQuestionsToReview(questions)
    setChosenAnswers(answers)
    setPageState('reviewExam')
  }

  if (pageState == 'mockExam') {
    return <Exam allQuestions={questionsJson} submitExam={handleSubmitExam} returnToMainPage={() => setPageState('')} />
  }

  if (pageState == 'reviewExam') {
    return <ReviewExam questions={questionsToReview} answers={chosenAnswers} returnToMainPage={() => setPageState('')} />
  }


  return (
    <div className="App">
      <h1>RTT mock exam app</h1>
      <button onClick={handleStartExam}>Start mock exam</button>
    </div>
  );
}

export default App;
