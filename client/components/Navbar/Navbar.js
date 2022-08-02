import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import { autoLogin, logout } from '../../store/auth';
import { logout } from '../../store/auth';
import { clearCart } from '../../store/cart';

import GuestNavBar from './GuestNavBar';
import UserNavBar from './UserNavBar';

function Navbar() {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCount = () => {
    let count = 0;
    if (cart.products !== null) {
      Object.entries(cart.products).forEach((productArray) => {
        count += productArray[1];
      });
    }

    return count;
  };

  const handleClick = (navigate) => {
    dispatch(logout(navigate));
    dispatch(clearCart());
  };

  const isLoggedIn = !!auth.token;

  return (
    <div>
      {auth.isAdmin ? (
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
                  <Link className="nav-link" to="/admin">
                    Admin Home
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
                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin/login"
                      onClick={() => {
                        handleClick();
                        localStorage.removeItem('token');
                      }}
                    >
                      Logout <i class="bi bi-box-arrow-right"></i>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      ) : (
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
                {isLoggedIn ? (
                  <UserNavBar handleClick={handleClick} />
                ) : (
                  <GuestNavBar />
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="bi bi-cart"></i>
                    <sup>
                      <span className="badge bg-dark">{getCount()}</span>
                    </sup>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

// const mapState = (state) => {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.token,
//     cart: state.cart,
//   };
// };

// const mapDispatch = (dispatch, { history }) => {
//   return {
//     autoLogin: (token) => dispatch(autoLogin(token)),
//     handleClick(history) {
//       dispatch(logout(history));
//       dispatch(clearCart());
//     },
//   };
// };

export default Navbar;
