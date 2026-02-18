import Style from "./home.module.css";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

function Home() {

  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submitHandeler(e) {
    e.preventDefault();

    try{
        const res = await fetch("http://localhost:3002/auth/",{
        
        method:"POST",
        body:JSON.stringify({
          name,
          email,
          password,
          confirmPassword
        }),
        headers: {
          "Content-Type" : "application/json"
        }
      })
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registered Successfully");
        Navigate(`/verify/${data.data.token}`, { replace: true });

      } else {
        alert(data.message || "Registration failed");
      }
    }
    catch(err){
      alert("Backend not working");
      console.log(err);
    }
    

  }

  return (
    <div className={Style.container}>
      <form className={Style.formBox} onSubmit={submitHandeler}>
        <div className={Style.title}>Create Account</div>

        <input className={Style.input} type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>

        <input className={Style.input} type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>

        <input  className={Style.input} type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>

        <input  className={Style.input}  type="password"  placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>

        <button className={Style.button}>Register</button>
      </form>
    </div>
  );
}

export default Home;
