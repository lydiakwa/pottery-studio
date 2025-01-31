import React from 'react';
import { Link } from 'react-router-dom';

function AdminHome() {
  return (
    <div className="admin-home-container">
      <div className="row d-flex justify-content-center">
        <div className="card mx-5 col-6" style={{ width: '18rem' }}>
          <img src="user.svg" className="card-img-top" alt="..." />
          <div className="card-body">
            <Link
              to="/admin/users"
              className="btn btn-dark d-flex justify-content-center"
            >
              Manage Users
            </Link>
          </div>
        </div>

        <div className="card mx-5 col-6" style={{ width: '18rem' }}>
          <img src="management.svg" className="card-img-top mt-4" alt="..." />
          <div className="card-body">
            <Link
              to="/shop"
              className="btn btn-dark mt-4 d-flex justify-content-center"
            >
              Manage Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
