import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Styles from "./dashboard.module.css";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await API.get("/quiz/allpublishedquiz");
      setQuizzes(res.data.data);
    } catch (err) {
      setError("Failed to load quizzes");
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h2 className={Styles.title}>Published Quizzes</h2>

        <button className={Styles.button} onClick={() => navigate("/my-quizzes")}> My Quizzes</button>
      </div>

      {error && <p className={Styles.empty}>{error}</p>}

      {quizzes.length === 0 ? (
        <p className={Styles.empty}>No published quizzes available</p>
      ) : (
        <div className={Styles.quizGrid}>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className={Styles.quizCard}>
              <div className={Styles.quizTitle}>{quiz.name}</div>
              <div className={Styles.quizCategory}> Category: {quiz.category}</div>

              <button className={Styles.startButton} onClick={() => navigate(`/StartExam/${quiz._id}`)}> Start Exam</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
