import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutStatus from '../components/CheckoutStatus'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen () {
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)

  const [itemsPrice, setItemsPrice] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  if (!cart.paymentMethod) {
    navigate('/payment')
    dispatch({ type: ORDER_CREATE_RESET })
  }

  useEffect(() => {
    const calculatePrices = () => {
      const calculatedItemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      const calculatedShippingPrice = calculatedItemsPrice > 100 ? 0 : 10;
      const calculatedTaxPrice = 0.042 * calculatedItemsPrice;
      const calculatedTotalPrice =
        calculatedItemsPrice + calculatedShippingPrice + calculatedTaxPrice;
 
      setItemsPrice(calculatedItemsPrice.toFixed(2));
      setShippingPrice(calculatedShippingPrice.toFixed(2));
      setTaxPrice(calculatedTaxPrice.toFixed(2));
      setTotalPrice(calculatedTotalPrice.toFixed(2));
    };
 
    calculatePrices();
  }, [cart]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [success, navigate])

  const orderPlace = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice
      })
    )
  }

  return (
    <div className='paddingFrameBig'>
      <CheckoutStatus step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>SHIPPING</h4>

              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {'  '}
                {cart.shippingAddress.postalCode},{'  '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4 className='pt-2'>PAYMENT METHOD</h4>

              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4 className='pt-2'>ORDERED ITEMS</h4>
              {cart.cartItems.length === 0 ? (
                <Message variant='success'>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            className='productSmallImage'
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col className='productLinkWrapper'>
                          <Link
                            className='productLink'
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4} className='productLink'>
                          {item.qty} x {item.price}$ ={' '}
                          {(item.qty * item.price).toFixed(2)}$
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>{itemsPrice}$</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{shippingPrice}$</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{totalPrice}$</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='warning'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  variant='light'
                  disabled={cart.cartItems === 0}
                  onClick={orderPlace}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen

