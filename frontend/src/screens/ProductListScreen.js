import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let keyword = useLocation().search

  const productList = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product:createdProduct } = productCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


    useEffect(() => {
      dispatch({type:PRODUCT_CREATE_RESET})

      if (!userInfo.isAdmin) {
        navigate('/login')
      } 

      if(successCreate) {
        navigate(`/admin/product/${createdProduct._id}/edit`)
      }else{
        dispatch(listProducts(keyword))
      }

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

  const deleteHandler = id => {
    if(window.confirm("Are you sure, you want to delete this product?")) {
        dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    //Create product
    dispatch(createProduct())
  }

  return (
    <div className='paddingFrameBig'>
      <Row className='align-items-center'>
        <Col>
            <h2>PRODUCTS</h2>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' variant='success' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Table
            variant='light'
            striped
            bordered
            hover
            responsive
            className='table-l backgroundColorBeige'
          >
            <thead className='bordered'>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>LIGHT REQUIREMENTS</th>
                <th>WATERING</th>
                <th>PLANT SIZE</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className='bordered'>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.lightRequirements}</td>
                  <td>{product.watering}</td>
                  <td>{product.plantSize}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  
  
                  <td className='centered'>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='secondary' className='btn-sm px-3'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm px-3'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}/>
        </div>
      )}
    </div>
  )
}

export default ProductListScreen