import { useState } from 'react';
import { useSelector, useDispatch,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/use-input';
import { authenticate } from '../../store/auth-actions';
import { authActions } from '../../store/auth-slice';
import Alert from '../UI/Alert';
import LoadingSpinner from '../UI/LoadingSpinner'

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const isEmailValid = value => {
  return EMAIL_REGEXP.test(value);
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    switchModeHandler: nameSwitchModeHandler,
    reset: resetNameInput,
  } = useInput(value => !!value);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    switchModeHandler: emailSwitchModeHandler,
    reset: resetEmailInput,
  } = useInput(isEmailValid);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    switchModeHandler: passwordSwitchModeHandler,
    reset: resetPasswordInput,
  } = useInput(value => !!value);

  let formIsValid;

  if (isLogin && enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  } else {
    formIsValid = !isLogin && enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;
  }

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);

    nameSwitchModeHandler();
    emailSwitchModeHandler();
    passwordSwitchModeHandler();
    dispatch(authActions.updateErrorMessage({ errorMessage: null }));
  };

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);

    dispatch(authenticate(isLogin, {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword
    }));

    setIsLoading(false);

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();

    if (isLoggedIn) {
      navigate('/');
    }
  };

  return (
    <>
      <div className="container mt-5 mb-2">
        <div className="row">
          <h2 className="col-12 text-center">{isLogin ? 'Login' : 'Sign up'}</h2>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <form className="col-lg-4 col-md-6 col-sm-8 col-10" onSubmit={submitHandler}>
            {errorMessage && <Alert message={errorMessage}/>}
            {isLoading && <LoadingSpinner/>}

            {!isLogin && <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                required
                className={`form-control ${nameInputHasError && 'is-invalid'}`}
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />
              <div className="invalid-feedback">
                Enter your name
              </div>
            </div>}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                required
                className={`form-control ${emailInputHasError && 'is-invalid'}`}
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
              />
              <div className="invalid-feedback">
                Enter the {enteredEmail && 'correct'} email
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                required
                className={`form-control ${passwordInputHasError && 'is-invalid'}`}
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
              />
              <div className="invalid-feedback">
                Enter the password
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mb-1"
              disabled={!formIsValid}
            >
              {isLogin ? 'Login' : 'Sign up'}
            </button> | <button
              type="button"
              className="btn btn-primary"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
};

export default AuthForm;