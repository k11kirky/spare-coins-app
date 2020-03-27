import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SHOW_SIGN_IN_CONFIRMATION_MODAL,
  SHOW_SIGN_UP_CONFIRMATION_MODAL,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  CONFIRM_LOGIN,
  CONFIRM_LOGIN_SUCCESS,
  CONFIRM_LOGIN_FAILURE
} from './reducers/auth'

import { Alert } from 'react-native'
import { Auth } from 'aws-amplify'

function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err
  }
}

export function createUser(password, email) {
  return (dispatch) => {
    dispatch(signUp())
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email
      }
    })
    .then(data => {
      console.log('data from signUp: ', data)
      dispatch(signUpSuccess(data))
      dispatch(showSignUpConfirmationModal())
    })
    .catch(err => {
      console.log('error signing up: ', err)
      dispatch(signUpFailure(err))
    });
  }
}

function logIn() {
  return {
    type: LOG_IN
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}

export function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,
    error: err
  }
}

export function authenticate(username, password) {
  return (dispatch) => {
    dispatch(logIn())
    Auth.signIn(username, password)
      .then(user => {
        dispatch(logInSuccess(user))
        dispatch(showSignInConfirmationModal())
      })
      .catch(err => {
        console.log('error from signIn: ', err)
        dispatch(logInFailure(err))
        if (err.name == "UserNotConfirmedException") {
          dispatch(showSignInConfirmationModal())
        }
      });
  }
}

export function showSignInConfirmationModal() {
  return {
    type: SHOW_SIGN_IN_CONFIRMATION_MODAL
  }
}

export function showSignUpConfirmationModal() {
  return {
    type: SHOW_SIGN_UP_CONFIRMATION_MODAL
  }
}

export function confirmUserLogin(authCode) {
  return (dispatch, getState) => {
    dispatch(confirmLogIn())
    const { auth: { user }} = getState()
    console.log('state: ', getState())
    Auth.confirmSignIn(user, authCode)
      .then(data => {
        console.log('data from confirmLogin: ', data)
        dispatch(confirmLoginSuccess(data))
      })
      .catch(err => {
        console.log('error signing in: ', err)
        dispatch(confirmSignUpFailure(err))
      })
  }
}

function confirmLogIn() {
  return {
    type: CONFIRM_LOGIN
  }
}

function confirmLoginSuccess(user) {
  return {
    type: CONFIRM_LOGIN_SUCCESS,
    user
  }
}

function confirmLoginFailure() {
  return {
    type: CONFIRM_LOGIN_FAILURE,
    user
  }
}

export function confirmUserSignUp(username, authCode) {
  return (dispatch) => {
    dispatch(confirmSignUp())
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        console.log('data from confirmSignUp: ', data)
        dispatch(confirmSignUpSuccess())
        setTimeout(() => {
          Alert.alert('Successfully Signed Up!', 'Please Sign In')
        }, 0)
      })
      .catch(err => {
        console.log('error signing up: ', err)
        dispatch(confirmSignUpFailure(err))
      });
  }
}

function confirmSignUp() {
  return {
    type: CONFIRM_SIGNUP
  }
}

function confirmSignUpSuccess() {
  return {
    type: CONFIRM_SIGNUP_SUCCESS
  }
}

function confirmSignUpFailure(error) {
  return {
    type: CONFIRM_SIGNUP_FAILURE,
    error
  }
}
