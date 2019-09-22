import React from "react";
import TextInput from "./common/TextInput";
import PasswordInput from "./common/PasswordInput";
import Button from "./common/Button";
function LoginForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="login-context">
      <TextInput
        id="email"
        label="email"
        onChange={props.onChange}
        name="email"
        value={props.user.email}
        error={props.errors.email}
        loginClassName="login-form-field-position"
        formGroup={true}
      />
      <PasswordInput
        id="password"
        label="lozinka"
        name="password"
        onChange={props.onChange}
        value={props.user.password}
        error={props.errors.password}
        loginClassName="login-form-field-position"
      />
      <Button type="submit" value="uloguj se" className="button login-button" />
    </form>
  );
}

export default LoginForm;
