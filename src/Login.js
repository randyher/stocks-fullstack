import React from "react";
import "./App.css";
import { Button, Form } from "semantic-ui-react";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = () => {
    this.props.signIn(this.state);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div className="login-comp">
        <h1> Sign In </h1>
        <div className="login-box">
          <Form onSubmit={this.onSubmit}>
            <Form.Field
              style={{ "margin-top": "20px" }}
              className="text-fields"
            >
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.onChange}
              />
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
