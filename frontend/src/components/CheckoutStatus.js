import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function CheckoutStatus({ step1, step2, step3 }) {
  return (
    <Nav className='justify-content-center mb-4'>

        <Nav.Item>
            {step1 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link><p className='linkDecorator'>Shipping</p></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link><p className='linkDecorator'>Payment</p></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Payment</Nav.Link>
            )}
        </Nav.Item>

        <Nav.Item>
            {step3 ? (
                <LinkContainer to='/placeOrder'>
                    <Nav.Link><p className='linkDecorator'>Place Order</p></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutStatus
