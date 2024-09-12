import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

function ProfileScreen() {
  const [name, setName] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading:loadingOrders, error:errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
        if(!user || !user.name || success || userInfo._id !== user._id) {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        } else {
            setName(user.name)
            setLast_name(user.last_name)
            setEmail(user.email)
        }
    }
  }, [navigate, userInfo, dispatch, user, success]);
 
  const submitHandler = (e) => {
    e.preventDefault();
 
    if(password !== confirmPassword){
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({
        'id': user._id,
        'name':name,
        'last_name':last_name,
        'email':email,
        'password':password,
    }))
        setMessage('')
    }
  }
  return (
      <Row className="profileScreenPadiing">
          <Col md={4}>
              <h3>
                  USER PROFILE
              </h3>
  
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
              className="py-2"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Button type="submit" variant="light" className="px-4 py-3">
            Update
          </Button>
  
        </Form>
  
          </Col >
          <Col md={8} className="px-5">
              <h3>
                  MY ORDERS
              </h3>
              {loadingOrders ? (
                <Loader /> 
              ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
              ) : (
                <Table striped responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th></th>
                    </tr>
                  </thead>
  
                  <tbody>
                    {orders.map(order=>(
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}$</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                          <i className="fas fa-times" style={{color: 'red'}}></i>
                        )}</td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="secondary" className="btn-sm">Details</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
          </Col>
      </Row>
    
  )
}

export default ProfileScreen
