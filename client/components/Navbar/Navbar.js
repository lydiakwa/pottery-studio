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

  const handleClick = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  const isLoggedIn = !!auth.token;
  console.log({ isLoggedIn });
  return (
    <div>
      {auth.isAdmin ? (
        <AdminNavBar handleClick={handleClick} isLoggedIn={isLoggedIn} />
      ) : (
        <GuestNavBar
          handleClick={handleClick}
          isLoggedIn={isLoggedIn}
          cart={cart}
        />
      )}
    </div>
  );
}

export default Navbar;
