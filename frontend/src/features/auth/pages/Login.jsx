import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Loader from "../components/Loader";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    const res = await handleLogin({ email, password });
    if (!res.success) {
      setError("Invalid Creditentials");
      setEmail("");
      setPassword("");
      return;
    }

    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <main>
      <div className="form-container login">
        <div className={`invalid ${error ? "toast" : ""}`}>{error || ""}</div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account?<Link to={"/register"}> Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
