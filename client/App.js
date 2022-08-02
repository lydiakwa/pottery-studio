import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../client/components/Home';
import AboutUs from '../client/components/AboutUs';
import Navbar from '../client/components/Navbar/Navbar';
import AllProducts from './components/AllProducts/AllProducts';
import SingleProduct from '../client/components/SingleProduct';
import Login from '../client/components/Login';
import Cart from '../client/components/Cart';
import CreateAccount from './components/CreateAccount';
import Checkout from './components/checkout/Checkout';
import Confirmation from './components/checkout/Confirmation';
import Footer from './components/Footer';

import { autoLogin } from './store/auth';

// Admin
import AdminHome from './components/admin/AdminHome';
import AdminLogin from './components/admin/AdminLogin';
import AllUsers from './components/admin/AllUsers';
import CreateProduct from './components/admin/CreateProduct';
import EditProduct from './components/admin/EditProduct';

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.autoLogin(token);
    }
  }

  render() {
    return (
      <Router>
        <Navbar />
        <main>
          {this.props.auth.isAdmin === true ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<AllProducts />} />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path="/products/:id/edit" element={<EditProduct />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/users" element={<AllUsers />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/shop" element={<AllProducts />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          )}
        </main>
        <Footer />
      </Router>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    autoLogin: (token) => dispatch(autoLogin(token)),
  };
};

export default connect(mapState, mapDispatch)(App);
