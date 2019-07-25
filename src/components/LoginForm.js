import React from "react";
import TextInput from "./common/TextInput";
import PasswordInput from "./common/PasswordInput";

function LoginForm(props) {
    return (
        <form onSubmit={props.onSubmit} className="login-context">
        <TextInput
          id="email"
          label="Email"
          onChange={props.onChange}
          name="email"
          value={props.user.email}
          error={props.errors.email}
        />
        <PasswordInput
          id="password"
          label="Password"
          name="password"
          onChange={props.onChange}
          value={props.user.password}
          error={props.errors.password}
        />
        <input type="submit" value="Save" className="button" />
      </form>
    );
}

export default LoginForm;