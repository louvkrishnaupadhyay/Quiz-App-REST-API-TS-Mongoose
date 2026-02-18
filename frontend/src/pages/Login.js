import Styles from './login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'

function Login(){
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleButton = async (e) => {
    e.preventDefault();

    try{
      const res = await API.post("/auth/login",{
        email,
        password
      });
      const token = res.data.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");

    }
    catch(err){
      setError(err.response?.data?.message || "Login Failed")
    }

  }
  return <div className={Styles.container}>
    <form className={Styles.formBox} onSubmit={handleButton}>

      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input className={Styles.input} type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>

      <input className={Styles.input} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>

      <button className={Styles.button} type='submit'>Login</button>

    </form>
  </div>
}

export default Login;