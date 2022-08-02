import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../store/auth';
import { clearCart } from '../../store/cart';

import GuestNavBar from './GuestNavBar';
import AdminNavBar from './AdminNavBar';

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
        <AdminNavBar handleClick={handleClick} isLoggedIn={isLoggedIn} />
      ) : (
        <GuestNavBar
          handleClick={handleClick}
          isLoggedIn={isLoggedIn}
          getCount={getCount}
        />
      )}
    </div>
  );
}

export default Navbar;
