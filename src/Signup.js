import React from "react";
import "./App.css";
import { Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  onSubmit = () => {
    this.props.signUp(this.state);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div className="login-comp">
        <h1> Sign up </h1>
        <div className="signup-box">
          <Form onSubmit={this.onSubmit}>
            <Form.Field
              style={{ "margin-top": "20px" }}
              className="text-fields"
            >
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                placeholder="Name"
                onChange={this.onChange}
              />
            </Form.Field>

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
          <Link to="/login" style={{ "margin-top": "15px" }}>
            Have an account? Log in!
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
