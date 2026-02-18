import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import Styles from './VerifyOTP.module.css'

function VerifyOTP() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  console.log("Token received:", token);

  const handleSubmit = async () => {
    if (!token) {
      setError("Invalid verification link.");
      return;
    }

    try {
      const res = await API.post(`/auth/verify-registration-otp/${token}`, { otp });

      alert(res.data.message || "Registration Successful!");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify OTP</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input className={Styles.input} placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>

      <button className={Styles.button} onClick={handleSubmit}>Verify</button>
    </div>
  );
}

export default VerifyOTP;
