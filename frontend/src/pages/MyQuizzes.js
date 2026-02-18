import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Styles from "./myQuizzes.module.css";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const fetchMyQuizzes = async () => {
    try {
      const res = await API.get("/quiz");
      setQuizzes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  const publishQuiz = async (quizId) => {
    try {
      await API.patch("/quiz/publish", { quizId });
      alert("Quiz Published!");
      fetchMyQuizzes(); // refresh after publish
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h2 className={Styles.title}>My Quizzes</h2>

        <div className={Styles.buttonGroup}>
          <button
            className={Styles.primaryButton}
            onClick={() => navigate("/create-quiz")}
          >
            Create New Quiz
          </button>

          <button
            className={Styles.primaryButton}
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {quizzes.length === 0 ? (
        <p className={Styles.empty}>No quizzes created yet.</p>
      ) : (
        <div className={Styles.quizGrid}>
          {quizzes.map((quiz) => (
            <div key={quiz._id} className={Styles.quizCard}>
              <div className={Styles.quizTitle}>{quiz.name}</div>
              <div className={Styles.quizStatus}>
                Published: {quiz.isPublished ? "Yes" : "No"}
              </div>

              {!quiz.isPublished && (
                <button
                  className={Styles.publishButton}
                  onClick={() => publishQuiz(quiz._id)}
                >
                  Publish Quiz
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyQuizzes;
