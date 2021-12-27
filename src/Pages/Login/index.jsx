import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const navigate = useNavigate();
  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required!" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/");
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h3>Login to Your Account</h3>
      <form className="form" action="">
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={handleChange}
            type="text"
            name="email"
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button onClick={handleSubmit} disabled={loading} className="btn">
            {loading ? "Logging inn..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
