import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/auth';

function AdminLogin() {
  const [formData, setFromData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFromData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(loginUser(formData, navigate));
  };

  return (
    <div className="contianer admin-login-form-container">
      <h2>Management System</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="form-label">
            <small>Email</small>
          </label>
          <input
            className="form-control"
            name="email"
            onChange={handleChange}
            type="text"
            value={formData.email}
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            <small>Password</small>
          </label>
          <input
            className="form-control"
            name="password"
            onChange={handleChange}
            type="password"
            value={formData.password}
          />
        </div>
        <button className="form-button btn btn-dark" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
