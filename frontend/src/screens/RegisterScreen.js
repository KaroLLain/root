import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen() {

  const [name, setName] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
 
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
 
  const submitHandler = (e) => {
    e.preventDefault();
 
    if(password !== confirmPassword){
      setMessage('Password do not match')
    } else {
      dispatch(register(name, last_name, email, password));
 
    }
  }

  return (
    <FormContainer>
      <h1 className="py-5">Register</h1>
      {message && <Message variant="dark">{message}</Message>}
      {error && <Message variant="dark">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId="name" className="pb-3">
          <Form.Label className="font-weight-light">Name</Form.Label>
          <Form.Control
          required
            className="py-2"
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="last_name" className="pb-3">
          <Form.Label className="font-weight-light">Last Name</Form.Label>
          <Form.Control
          required
            className="py-2"
            type="Last name"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="pb-3">
          <Form.Label className="font-weight-light">Email Address</Form.Label>
          <Form.Control
          required
            className="py-2"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="pb-3">
          <Form.Label className="font-weight-light">Password</Form.Label>
          <Form.Control
          required
            className="py-2"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm" className="pb-3">
          <Form.Label className="font-weight-light">Confirm Password</Form.Label>
          <Form.Control
          required
            className="py-2"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="light" className="px-4 py-3">
          Register
        </Button>

      </Form>

      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
