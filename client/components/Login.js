import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { loginUser } from '../store/auth';

function Login() {
  // const [formState, setFormState] = useState({
  //   email: '',
  //   password: '',
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleChange = (evt) => {
  //   setFormState({ ...formState, [evt.target.name]: evt.target.value });
  // };

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   dispatch(loginUser(formState, navigate));
  // };

  return (
    <div className="container">
      <div className="login-form-container">
        <h2>Pottery Studio</h2>
        <div>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setErrors }) =>
              dispatch(loginUser(values, navigate, setErrors))
            }
            validate={(values) => {
              const errors = {};
              return errors;
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <form className="login-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    <small>Email</small>
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    <small>Password</small>
                  </label>
                  <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    value={values.password}
                  />
                </div>
                {errors.form ? (
                  <div className="field-error-text">{errors.form}</div>
                ) : null}
                <div>
                  <button className="btn btn-dark" type="submit">
                    Login
                  </button>
                  <button className="btn btn-dark" type="button">
                    Forgot Password
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
