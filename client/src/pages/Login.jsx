import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../components/layout/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

      console.log("Token Saved Successfully");

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <AuthLayout>
      <div
        style={{
          background: "white",
          width: "400px",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome Back</h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Login to continue
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
