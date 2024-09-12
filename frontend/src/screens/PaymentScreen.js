import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStatus from '../components/CheckoutStatus'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen () {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeOrder')
  }

  return (
    <FormContainer>
      <CheckoutStatus step1 step2 />
      <h2>PAYMENT METHOD</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Col className='pt-3 pb-1'>
            <Form.Check
              type='radio'
              label='PayPal'
              id='paypal'
              name='paymentMethod'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>

          <Col className='pb-1'>
            <Form.Check
              type='radio'
              label='CreditCard'
              id='creditCard'
              name='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled
            ></Form.Check>
          </Col>

          <Col className='pb-4'>
            <Form.Check
              type='radio'
              label='BLIK'
              id='blik'
              name='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='secondary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
