import React from 'react'
import { StatusBar } from 'react-native'

import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import { logInSuccess } from "./actions";

import Tabs from './auth/Tabs'
import Nav from './nav/Nav'

class App extends React.Component {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user, isLoading: false })
    } catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user })
    } catch (err) {
      console.log(err)
      this.setState({ user: {} })
    }
  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user.username) {
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <Nav/>
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchLoggedInUser: user => logInSuccess(user)
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
