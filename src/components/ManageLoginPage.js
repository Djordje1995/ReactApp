import React, { useState } from "react";
import LoginForm from "./LoginForm";
import * as userApi from "./api/UserApi";
import { toast } from "react-toastify";

const ManageLoginPage = props => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function handleChange({ target }) { //destructuring 
    setUser({
      ...user,
      [target.name]: target.value
    });
  }

//   function formIsValid() {
//     const _errors = {};

//     if (!user.email) _errors.email = "Email is required";
//     if (!user.password) _errors.password = "Password is required";

//     setErrors(_errors);
//     // Form is valid if the errors object has no properties
//     return Object.keys(_errors).length === 0;
//   }

  function handleSubmit(event) {
    event.preventDefault();
    // if (!formIsValid()) return;
    // userApi.saveCourse(course).then(() => {
    //   props.history.push("/courses");
    //   toast.success("Course saved.");
    // });  ovde se radi redirect ili poruka ako nevalja
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