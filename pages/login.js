import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Grid,
  Header,
  Button,
  Form,
  Message,
  Segment
} from "semantic-ui-react";
import catchErrors from "../utils/catchErrors";
import handleLogin from "../utils/auth";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const INITIAL_STATE = {
  email: "",
  password: ""
};

const Login = () => {
  const [user, setUser] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Make request to login user
      const url = `${baseUrl}/api/login`;
      const payload = {
        ...user
      };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      textAlign="center"
      style={{
        height: "70vh"
      }}
      verticalAlign="middle"
    >
      <Grid.Column
        style={{
          maxWidth: 650
        }}
      >
        <Message header="Get Started!">
          <Header as="h2" color="teal">
            Login to your account
          </Header>
        </Message>
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message error header="Oops!" content={error} />
          <Segment>
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              placeholder="Email"
              name="email"
              type="email"
              value={user.value}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              value={user.value}
              onChange={handleChange}
            />
            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              disabled={disabled || loading}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message textAlign="center">
          New to us ? <Link href="/signup"> Sign Up </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
