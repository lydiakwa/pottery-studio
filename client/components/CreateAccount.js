import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../store/auth';

//add isAdmin -- and set default to false
function CreateAccount() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormState({ ...formState, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(createUser(formState, navigate));
  };

  return (
    <div className="contianer signup-form-container">
      <h2 id="create-account-title">Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              className="form-control"
              name="firstName"
              type="text"
              onChange={handleChange}
              value={firstName}
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>

            <input
              className="form-control"
              name="lastName"
              type="text"
              onChange={handleChange}
              value={lastName}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="col">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              name="password"
              type="text"
              onChange={handleChange}
              value={password}
            />
          </div>
        </div>

        <div>
          <button className="form-button btn btn-dark" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
