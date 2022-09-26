import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { createUser } from '../store/auth';

//add isAdmin -- and set default to false
function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="contianer signup-form-container">
      <h2 id="create-account-title">Create Account</h2>
      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
        onSubmit={(values, { setErrors }) =>
          dispatch(createUser(values, navigate, setErrors))
        }
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          return errors;
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
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
                  error={!!errors.firstName}
                  onChange={handleChange}
                  value={values.firstName}
                />
                {errors.firstName ? (
                  <div className="field-error-text">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>

                <input
                  className="form-control"
                  name="lastName"
                  type="text"
                  error={!!errors.lastName}
                  onChange={handleChange}
                  value={values.lastName}
                />
                {errors.lastName ? (
                  <div className="field-error-text">{errors.lastName}</div>
                ) : null}
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
                  error={!!errors.email}
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email ? (
                  <div className="field-error-text">{errors.email}</div>
                ) : null}
              </div>
              <div className="col">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  error={!!errors.password}
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password ? (
                  <div className="field-error-text">{errors.password}</div>
                ) : null}
              </div>
            </div>

            <div>
              <button className="form-button btn btn-dark" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateAccount;
