import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalid = !username.trim() || !email.trim() || !password.trim();

    setIsInvalid(invalid);

    if (invalid) {
      return;
    }

    const res = await handleRegister({ username, email, password });
    if (!res.success) {
      setIsInvalid(true);
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
        {isInvalid && <div className="invalid">All fields are required!!</div>}
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
                setIsInvalid(false);
              }}
              type="text"
              id="username"
              name="username"
              //required

              placeholder="Enter username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setIsInvalid(false);
              }}
              type="email"
              id="email"
              name="email"
              //required
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setIsInvalid(false);
              }}
              type="password"
              id="password"
              //required
              name="password"
              placeholder="Enter password"
            />
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
