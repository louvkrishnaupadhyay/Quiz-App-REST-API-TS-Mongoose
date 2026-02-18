import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Styles from "./startExam.module.css";

function StartExam() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/exam/${quizId}`);
        setQuiz(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading quiz");
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) return <p className={Styles.loading}>Loading...</p>;

  const questionList = quiz.questionList;
  const question = questionList[currentQuestion];

  const handleOptionSelect = (optionKey) => {
    setAnswers({
      ...answers,
      [question.questionNumber]: optionKey
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questionList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitExam = async () => {
    try {
      const res = await API.post("/exam", {
        quizId,
        attemptedQuestion: answers
      });

      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  if (result) {
    return (
      <div className={Styles.resultContainer}>
        <h2>Exam Result</h2>
        <p>Total Questions: {result.total}</p>
        <p>Your Score: {result.score}</p>
        <p>Result: {result.result}</p>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h2>{quiz.name}</h2>

        {error && <p className={Styles.error}>{error}</p>}

        <h3>
          Question {currentQuestion + 1} of {questionList.length}
        </h3>

        <p className={Styles.question}>{question.question}</p>

        <div className={Styles.options}>
          {Object.entries(question.options).map(([key, value]) => (
            <button
              key={key}
              className={
                answers[question.questionNumber] === key
                  ? Styles.selectedOption
                  : Styles.option
              }
              onClick={() => handleOptionSelect(key)}
            >
              {key}. {value}
            </button>
          ))}
        </div>

        <div className={Styles.navigation}>
          <button onClick={prevQuestion} disabled={currentQuestion === 0}>Previous</button>

          {currentQuestion === questionList.length - 1 ? (
            <button className={Styles.submitBtn} onClick={submitExam}>Submit Exam</button>
          ) : (
            <button onClick={nextQuestion}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartExam;
