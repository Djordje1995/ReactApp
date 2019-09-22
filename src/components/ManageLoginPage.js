import React, { useState } from "react";
import LoginForm from "./LoginForm";
import userApi from "./api/UserApi";

const ManageLoginPage = props => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function handleChange({ target }) {
    //destructuring
    setUser({
      ...user,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!user.email) _errors.email = "niste uneli email";
    if (!user.password) _errors.password = "niste uneli password";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function successfulCallback(response) {
    if (response.isSuccessful === true) {
      window.sessionStorage.setItem("isAdmin", response.isAdmin);
      window.sessionStorage.setItem("isAuthenticated", true);
      window.location.replace("http://localhost:3000/homePage");
      //});
    } else {
      const _errors = {};
      _errors.email = response.emailErrorMassage
        ? response.emailErrorMassage
        : "";
      _errors.password = response.passwordErrorMassage
        ? response.passwordErrorMassage
        : "";
      setErrors(_errors);
      return;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    userApi
      .validateCredentials(user)
      .then(response => successfulCallback(response.data));
  }

  return (
    <>
      <h2 className="login-header">Login</h2>
      <LoginForm
        errors={errors}
        user={user}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageLoginPage;
