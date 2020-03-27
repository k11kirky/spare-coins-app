import React from "react";
import { View, Text, StyleSheet,NativeEventEmitter, NativeModules  } from "react-native";
import PlaidLink from "react-native-plaid-link-sdk";
import { connect } from "react-redux";
import { fonts } from "../theme";

class Accounts extends React.Component {
  componentDidMount() {
    const emitter = new NativeEventEmitter(Platform.OS === 'ios' ? NativeModules.RNLinksdk : NativeModules.PlaidAndroid);
    this._listener = emitter.addListener('onEvent', (e) => console.log(e));
  }
 
  componentWillUnmount() {
    if (this._listener) {
      this._listener.remove();
    }
  }

  render() {
    console.log("params", this.props.route.params)
    let params = this.props.route.params || {};
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Accounts</Text>
          <PlaidLink
            publicKey="f58ca1be11955fed23620bb2f47598"
            clientName="Spare Coins"
            env="sandbox" // 'sandbox' or 'development' or 'production'
            product={["auth", "transactions"]}
            onSuccess={data => {
              console.log("success: ", data);
            }}
            onExit={data => console.log("exit: ", data)}
            onCancelled={result => {
              console.log("Cancelled: ", result);
            }}
            countryCodes={["GB", "US"]}
            oauthRedirectUri={"sparecoins://Accounts?userId=userId"}
            oauthNonce={"longNonce-Nonce-anasdlkjnkljn"}
            oauthStateId={params.oauth_state_id || undefined}
          >
            <Text>Add Account</Text>
          </PlaidLink>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  homeContainer: {
    alignItems: "center"
  },
  welcome: {
    fontFamily: fonts.light,
    color: "rgba(0, 0, 0, .85)",
    marginBottom: 26,
    fontSize: 22,
    textAlign: "center"
  },
  registration: {
    fontFamily: fonts.base,
    color: "rgba(0, 0, 0, .5)",
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
