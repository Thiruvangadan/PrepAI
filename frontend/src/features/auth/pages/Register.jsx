import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) {
      return;
    }

    const res = await handleRegister({ username, email, password });

    if (res) {
      setErrors((prev) => ({
        ...prev,
        general: res,
      }));
      return;
    }
    navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <div className="form-container">
        <div className={`invalid ${errors.general ? "toast" : ""}`}>
          {errors.general || ""}
        </div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => handleChange("username", e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
            />

            <div className="invalid">{errors.username || ""}</div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
              type="text"
              id="email"
              name="email"
              placeholder="Enter email address"
            />

            <div className="invalid">{errors.email || ""}</div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                handleChange("password", e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />

            <div className="invalid">{errors.password || ""}</div>
          </div>

          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account?<Link to={"/login"}> Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
