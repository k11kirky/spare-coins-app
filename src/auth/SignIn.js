import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal
} from "react-native";

import { connect } from "react-redux";

import { authenticate, confirmUserLogin } from "../actions";
import { fonts, colors } from "../theme";

import Input from "../components/Input";
import Button from "../components/Button";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    accessCode: ""
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  signIn() {
    const { email, password } = this.state;
    this.props.dispatchAuthenticate(email, password);
  }

  confirm() {
    const { authCode } = this.state;
    this.props.dispatchConfirmUserLogin(authCode);
  }

  render() {
    const { fontsLoaded } = this.state;
    const {
      auth: {
        signInErrorMessage,
        isAuthenticating,
        signInError,
        showSignInConfirmationModal
      }
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.greeting}>Spare Coins</Text>
        </View>
        <Text style={[styles.greeting]}>Welcome back,</Text>
        <Text style={[styles.greeting2]}>sign in to continue</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            type="email"
            onChangeText={this.onChangeText}
            value={this.state.email}
          />
          <Input
            placeholder="Password"
            type="password"
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
          />
        </View>

        <Button
          isLoading={isAuthenticating}
          title="Sign In"
          onPress={this.signIn.bind(this)}
        />
        <Text style={[styles.errorMessage, signInError && { color: "black" }]}>
          Error logging in. Please try again.
        </Text>
        <Text style={[styles.errorMessage, signInError && { color: "black" }]}>
          {signInErrorMessage}
        </Text>
        {showSignInConfirmationModal && (
          <Modal>
            <View style={styles.modal}>
              <Input
                placeholder="Authorization Code"
                type="authCode"
                keyboardType="numeric"
                onChangeText={this.onChangeText}
                value={this.state.authCode}
                keyboardType="numeric"
              />
              <Button
                title="Confirm"
                onPress={this.confirm.bind(this)}
                isLoading={isAuthenticating}
              />
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
  dispatchAuthenticate: (email, password) => authenticate(email, password)
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    flexDirection: "row"
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: "transparent",
    fontFamily: fonts.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.light
  },
  greeting2: {
    color: "#666",
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.light
  }
});
