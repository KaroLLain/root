import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  listProductDetails,
  createProductReview
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen () {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const match = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview
  } = productReviewCreate

  useEffect(() => {
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(match.id))
  }, [dispatch, match.id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${match.id}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createProductReview(
      match.id, {
        rating,
        comment
      }
    ))
  }

  return (
    <div className='paddingFrameBig centeredProductScreen'>
      <Link to='/' className='btn btn-success buttonGreen my-3'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='centeredProductScreen'>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup className='firstList' variant='flush'>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} reviews`}
                    color={'#2C3834'}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <table className='table'>
                    <thead>
                      <tr className='table-default'>
                        <th itemScope='row'>Price</th>
                        <td>${product.price}</td>
                      </tr>
                      <tr className='table-default'>
                        <th itemScope='row'>Plant size</th>
                        <td>{product.plantSize}</td>
                      </tr>
                      <tr className='table-default'>
                        <th itemScope='row'>Description</th>
                        <td>{product.description}</td>
                      </tr>
                      <tr className='table-default'>
                        <th itemScope='row'>Watering</th>
                        <td>{product.watering}</td>
                      </tr>
                      <tr className='table-default'>
                        <th itemScope='row'>Light</th>
                        <td>{product.lightRequirements}</td>
                      </tr>
                    </thead>
                  </table>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={2}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block btn-dark btn-lg'
                      disabled={product.countInStock === 0}
                      type='button'
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h5>REVIEWS</h5>
              {product.reviews.length === 0 && (
                <Message variant='light'>No Reviews</Message>
              )}

              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#b9816d' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>

                  {loadingProductReview && <Loader />}
                  {successProductReview && <Message variant='success'>Review Submitted</Message>}
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}


                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <h5>YOUR REVIEW</h5>
                      <Form.Group controlId='rating'>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select rating...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>

                        <Form.Group controlId='comment' className='py-1'>
                          <Form.Control
                            as='textarea'
                            row='5'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Form.Group>

                      <Button disabled={loadingProductReview} type='submit' className='buttonGreen'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='light'>
                      To write review please <Link to='/login'>login</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default ProductScreen
