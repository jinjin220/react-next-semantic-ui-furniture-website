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

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

const Signup = () => {
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
      console.log(user);
      // Make request to signup user
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "70vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 650 }}>
        <Message header="Get Started!">
          <Header as="h2" color="teal">
            Create a new account
          </Header>
        </Message>

        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
          <Message error header="Something went wrong!" content={error} />
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Name"
              name="name"
              value={user.value}
              onChange={handleChange}
            />
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
              Signup
            </Button>
          </Segment>
        </Form>

        <Message textAlign="center">
          Existing user? <Link href="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;
