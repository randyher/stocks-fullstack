import React from "react";
import "./App.css";
import { Button, Checkbox, Form } from "semantic-ui-react";

class Login extends React.Component {
  render() {
    return (
      <div className="login-comp">
        <h1> Login </h1>
        <div className="login-box">
          <Form>
            <Form.Field
              style={{ "margin-top": "20px" }}
              className="text-fields"
            >
              <label>Email</label>
              <input placeholder="Email" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
          <a href="#home" style={{ "margin-top": "15px" }}>
            No account? Sign up!
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
