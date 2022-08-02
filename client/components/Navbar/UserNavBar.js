import React from 'react';
import { Link } from 'react-router-dom';

function UserNavBar({ handleClick }) {
  return (
    <Link className="nav-link" to="/">
      <button
        onClick={() => {
          handleClick();
          localStorage.removeItem('token');
          localStorage.removeItem('cart');
        }}
      >
        Logout <i class="bi bi-box-arrow-right"></i>
      </button>
    </Link>
  );
}

export default UserNavBar;
