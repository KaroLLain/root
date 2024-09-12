import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
 
function CartScreen() {
  const navigate = useNavigate()
  const location = useLocation();
  const {id} = useParams();
  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
 
  const dispatch = useDispatch();
 
  const cart = useSelector((state) => state.cart);
  const userIsLoggedIn = useSelector(state => state.userLogin)
  const { cartItems } = cart;
 
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
 
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    navigate('/cart')
  }
 
  const checkoutHandler = () => {
    if (userIsLoggedIn.userInfo) {
        // User is logged in, redirect to the shipping page
        navigate('/shipping');
      } else {
        // User is not logged in, redirect to the login page
        navigate('/login');
      }
}
 
  return (
    <Row className='paddingFrameBig'>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='light'>
            {' '}
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}/`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                  <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                  </Col>
                  <Col md={1} >
                    <Button type='button' variant='light' onClick={ () => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'/>
 
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
 
            <ListGroup.Item>
              <h2>Items in cart: {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}</h2>
              <h4>Total price: ${cartItems.reduce((acc, item) => acc + Number(item.qty) * item.price, 0).toFixed(2)}</h4>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item className='text-center'>
            <Button type='button'
            variant='secondary'
            className='btn-block btn-lg col-10 m-3'
              disabled={cartItems.length===0}
              onClick={ checkoutHandler}>
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}
 
export default CartScreen;