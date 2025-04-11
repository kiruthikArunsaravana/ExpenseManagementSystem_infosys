import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { registerNewUser } from "../../Services/LoginService";

const RegisterUser = () => {
  const [expenseUser, setExpenseUser] = useState({
    username: "",
    password: "",
    email: "",
    category: "",
  });

  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!expenseUser.username.trim()) {
      formErrors.username = "Username is required";
      isValid = false;
    }

    if (!expenseUser.password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (expenseUser.password.length < 5 || expenseUser.password.length > 10) {
      formErrors.password = "Password must be between 5 to 10 characters";
      isValid = false;
    }

    if (!password2) {
      formErrors.password2 = "Please confirm your password";
      isValid = false;
    } else if (expenseUser.password !== password2) {
      formErrors.password2 = "Passwords do not match";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expenseUser.email || !emailRegex.test(expenseUser.email)) {
      formErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!expenseUser.category) {
      formErrors.category = "Please select a category";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const saveNewUser = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    registerNewUser(expenseUser)
      .then((response) => {
        alert("User is registered successfully... Go for login");
        navigate("/LoginPage");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        alert("Registration failed. Please try again.");
      });
  };

  const onChangeHandler = (event) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setExpenseUser(values => ({ ...values, [name]: value }));
  };

  return (
    <div className="register-background">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 w-50">
          <h2 className="text-center mb-4 text-primary">New User Registration</h2>

          <form method="post">
            <div className="form-group">
              <label>User Name: </label>
              <input
                placeholder="username"
                name="username"
                className="form-control"
                value={expenseUser.username}
                onChange={onChangeHandler}
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>

            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={expenseUser.password}
                onChange={onChangeHandler}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <div className="form-group">
              <label>Retype/Confirm Password: </label>
              <input
                type="password"
                name="password2"
                className="form-control"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {errors.password2 && <small className="text-danger">{errors.password2}</small>}
            </div>

            <div className="form-group">
              <label>User Email: </label>
              <input
                placeholder="email"
                name="email"
                className="form-control"
                value={expenseUser.email}
                onChange={onChangeHandler}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="form-group">
              <label>Select Category : </label>
              <input
                list="types"
                name="category"
                className="form-control"
                value={expenseUser.category}
                onChange={onChangeHandler}
              />
              <datalist id="types">
                <option value="Customer" />
                <option value="Admin" />
              </datalist>
              {errors.category && <small className="text-danger">{errors.category}</small>}
            </div>

            <br />
            <button className='btn btn-primary' onClick={saveNewUser}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
