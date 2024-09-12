import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import BannerScreen from './BannerScreen'
import {useLocation } from 'react-router-dom'

export default function HomeScreen () {
  const dispatch = useDispatch()

  let keyword = useLocation().search

  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

  return (
    <div className='homeScreenWrapper'>
      {!keyword && <BannerScreen />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='viewWidthWrapper'>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} />
        </div>
      )}
    </div>
  )
}
