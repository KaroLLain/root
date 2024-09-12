import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

export default function App () {
  return (
    <Router>
      <Header />
      <main className='mainWrapper'>
        <div className='parentElement'>
          <Routes>
            <Route path='/' Component={HomeScreen} exact />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/register' Component={RegisterScreen} />
            <Route path='/profile' Component={ProfileScreen} />
            <Route path='/shipping' Component={ShippingScreen} />
            <Route path='/placeOrder' Component={PlaceOrderScreen} />
            <Route path='/order/:id' Component={OrderScreen} />
            <Route path='/payment' Component={PaymentScreen} />
            <Route path='/product/:id' Component={ProductScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />

            <Route path='/admin/userList' Component={UserListScreen} />
            <Route path='/admin/user/:id/edit' Component={UserEditScreen} />

            <Route path='/admin/productList' Component={ProductListScreen} />
            <Route
              path='/admin/product/:id/edit'
              Component={ProductEditScreen}
            />

            <Route path='/admin/orderList' Component={OrderListScreen} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  )
}
