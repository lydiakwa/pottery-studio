import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../store/auth';
import { clearCart } from '../store/cart';

class Navbar extends React.Component {
  constructor() {
    super();
  }

  getCount = () => {
    let count = 0;
    if (this.props.cart.products !== null) {
      Object.entries(this.props.cart.products).forEach((productArray) => {
        count += productArray[1];
      });
    }

    return count;
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top">
          {/* <!--  Show this only on mobile to medium screens  --> */}
          <Link className="navbar-brand d-md-none" to="/">
            Pottery Studio
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggle"
            aria-controls="navbarToggle"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <!--  Use flexbox utility classes to change how the child elements are justified  --> */}
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarToggle"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
            </ul>

            {/* <!--   Show this only medium screens and up   --> */}
            <Link
              id="center-brand"
              className="navbar-brand d-none d-md-block"
              to="/"
            >
              Pottery Studio
            </Link>


            <ul className="navbar-nav">
              {this.props.isLoggedIn ? (
                <Link className="nav-link" to="/">
                  <button
                    onClick={() => {
                      this.props.handleClick();
                      localStorage.removeItem('token');
                      localStorage.removeItem('cart');
                    }}
                  >
                    Logout <i class="bi bi-box-arrow-right"></i>
                  </button>
                </Link>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="bi bi-cart"></i>
                  <sup>
                    <span className="badge bg-dark">{this.getCount()}</span>
                  </sup>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
// const Navbar = ({ handleClick, isLoggedIn }) => (

// );

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.token,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
