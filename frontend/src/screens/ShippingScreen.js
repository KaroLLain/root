import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStatus from '../components/CheckoutStatus'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen () {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
  }

  return (
    <FormContainer>
        <CheckoutStatus step1/>
        <h2>SHIPPING</h2>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId="address" className="pb-3">
                <Form.Label className="font-weight-light">Address</Form.Label>
                <Form.Control
                required
                    className="py-2"
                    type="text"
                    placeholder="Enter address"
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                >   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="city" className="pb-3">
                <Form.Label className="font-weight-light">City</Form.Label>
                <Form.Control
                required
                    className="py-2"
                    type="text"
                    placeholder="Enter city"
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                >   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="pb-3">
                <Form.Label className="font-weight-light">Postal Code</Form.Label>
                <Form.Control
                required
                    className="py-2"
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                >   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="country" className="pb-3">
                <Form.Label className="font-weight-light">Country</Form.Label>
                <Form.Control
                required
                    className="py-2"
                    type="text"
                    placeholder="Enter country"
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                >   
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='secondary'>Continue</Button>
        </Form>
    </FormContainer>)
}

export default ShippingScreen
