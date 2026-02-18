import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Styles from "./report.module.css";

function Report() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const res = await API.get("/report");
      setReports(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>My Exam Reports</h2>

      {error && <p className={Styles.error}>{error}</p>}

      {reports.length === 0 ? (
        <p className={Styles.empty}>No reports available yet.</p>
      ) : (
        <div className={Styles.grid}>
          {reports.map((report) => (
            <div key={report._id} className={Styles.card}>
              <h3>Quiz ID: {report.quizId}</h3>
              <p>Score: {report.score} / {report.total}</p>
              <p>Percentage: {report.percentage}%</p>
              <p>Result: {report.result}</p>

              <button
                className={Styles.button}
                onClick={() => navigate(`/report/${report._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Report;
