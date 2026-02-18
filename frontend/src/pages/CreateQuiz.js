import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Styles from "./createQuiz.module.css";

function CreateQuiz() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("test");
  const [passingPercentage, setPassingPercentage] = useState(50);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionNumber: questions.length + 1,
        question: "",
        options: { A: "", B: "", C: "", D: "" },
        answer: ""
      }
    ]);
  };

  const handleOptionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index].options[key] = value;
    setQuestions(updated);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (questions.length === 0) {
      setError("Please add at least one question.");
      return;
    }

    for (let q of questions) {
      if (!q.answer) {
        setError("Please select correct answer for all questions.");
        return;
      }
    }

    try {
      let answers = {};
      questions.forEach((q) => {
        answers[q.questionNumber] = q.answer;
      });

      await API.post("/quiz", {
        name,
        category,
        passingPercentage,
        questionList: questions.map((q) => ({
          questionNumber: q.questionNumber,
          question: q.question,
          options: q.options
        })),
        answers,
        attemptsAllowedPerUser: 3,
        isPublicQuiz: true,
        allowedUser: []
      });

      alert("Quiz Created Successfully!");
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Error creating quiz");
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Create Quiz</h2>

        {error && <p className={Styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className={Styles.input}
            type="text"
            placeholder="Enter Quiz Name"
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className={Styles.select}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="test">Test</option>
            <option value="exam">Exam</option>
          </select>

          

          <input
            className={Styles.input}
            type="number"
            value={passingPercentage}
            onChange={(e) => setPassingPercentage(e.target.value)}
          />

          <button
            type="button"
            className={Styles.buttonPrimary}
            onClick={addQuestion}
          >
            Add Question
          </button>

          {questions.map((q, index) => (
            <div key={index} className={Styles.questionCard}>
              <input
                className={Styles.input}
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />

              <div className={Styles.optionGrid}>
                {["A", "B", "C", "D"].map((opt) => (
                  <input
                    key={opt}
                    className={Styles.input}
                    placeholder={`Option ${opt}`}
                    onChange={(e) =>
                      handleOptionChange(index, opt, e.target.value)
                    }
                  />
                ))}
              </div>

              <select
                className={Styles.select}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
              >
                <option value="">Select Correct Answer</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          ))}

          <button type="submit" className={Styles.buttonSecondary}>
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;
