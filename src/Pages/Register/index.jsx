import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const navigate = useNavigate();
  const { name, email, password, error, loading } = data;

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
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required!" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
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
      <h3>Create an Account</h3>
      <form className="form" action="">
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={handleChange} type="text" name="name" />
        </div>
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
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
