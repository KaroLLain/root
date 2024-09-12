import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen () {
  const productId = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [lightRequirements, setLightRequirements] = useState('')
  const [watering, setWatering] = useState('')
  const [plantSize, setPlantSize] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productList')
    } else {
      if (!product.name || product._id !== Number(productId.id)) {
        dispatch(listProductDetails(productId.id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setLightRequirements(product.lightRequirements)
        setWatering(product.watering)
        setPlantSize(product.plantSize)
        setCategory(product.category)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
    }
  }, [product, productId, dispatch, navigate, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId.id,
        name,
        price,
        image,
        lightRequirements,
        watering,
        plantSize,
        category,
        description,
        countInStock
      })
    )
  }

  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', productId.id)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post(
        '/api/products/upload/',
        formData,
        config
      )

      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <div className='paddingFrameBig'>
      <Link to='/admin/productList' className='btn btn-success my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1 className='py-5'>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='pb-3'>
              <Form.Label className='font-weight-light'>Name</Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='pb-3'>
              <Form.Label className='font-weight-light'>Price</Form.Label>
              <Form.Control
                className='py-2'
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='pb-3'>
              <Form.Label className='font-weight-light'>Image</Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                // id='image-file'
                type="file"
                label='Choose File'
                custom='true'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId='lightRequirements' className='pb-3'>
              <Form.Label className='font-weight-light'>
                Light Requirements
              </Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter Light Requirements'
                value={lightRequirements}
                onChange={e => setLightRequirements(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='watering' className='pb-3'>
              <Form.Label className='font-weight-light'>Watering</Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter Watering'
                value={watering}
                onChange={e => setWatering(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='plantSize' className='pb-3'>
              <Form.Label className='font-weight-light'>Plant Size</Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter Plant Size'
                value={plantSize}
                onChange={e => setPlantSize(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='pb-3'>
              <Form.Label className='font-weight-light'>Category</Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='pb-3'>
              <Form.Label className='font-weight-light'>Description</Form.Label>
              <Form.Control
                className='py-2'
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='pb-3'>
              <Form.Label className='font-weight-light'>Stock</Form.Label>
              <Form.Control
                className='py-2'
                type='number'
                placeholder='Enter Stock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='light' className='px-4 py-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen
