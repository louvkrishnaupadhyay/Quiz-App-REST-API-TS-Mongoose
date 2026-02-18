import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import MainMenu from "./Components/MainMenu";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import CreateQuiz from "./pages/CreateQuiz";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyQuizzes from "./pages/MyQuizzes";
import StartExam from "./pages/StartExam";

function App() {
  return (
    <>
      <MainMenu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<VerifyOTP />} />
        <Route path="/CreateQuiz" element={<PrivateRoute><CreateQuiz /></PrivateRoute>} />
        <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/StartExam/:quizId" element={<PrivateRoute><StartExam /></PrivateRoute>} />
        <Route path="/Report" element={<PrivateRoute><Report /></PrivateRoute>} />
        <Route path="/Report/:reportId" element={<PrivateRoute><Report /></PrivateRoute>} />

      </Routes>
    </>
  );
}

export default App;
