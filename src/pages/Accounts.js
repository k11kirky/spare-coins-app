import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlaidLink, { openLink, dismissLink } from "react-native-plaid-link-sdk";
import { connect } from "react-redux";
import { fonts } from "../theme";

const PLAID_PUBLIC_KEY = "f58ca1be11955fed23620bb2f47598";
const PLAID_ENV = "development";

const onExitPlaid = e => console.log(e);
const handleCallback = e => console.log(e);

const Accounts = props => {
  useEffect(() => {
    console.log("use fired");
    if (props.route.params?.oauth_state_id) {
      const oauth_state_id = props.route.params.oauth_state_id;
      dismissLink({ onExit: () => onExitPlaid() });
      openPlaid(
        oauth_state_id,
        ["transactions"],
        body => handleCallback(body, "plaid"),
        onExitPlaid,
        onExitPlaid
      );
    }
  }, [props.route.params?.oauth_state_id]);
  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <Text style={styles.welcome}>Accounts</Text>
        <Text
          onPress={() =>
            openPlaid(
              undefined,
              ["transactions"],
              handleCallback,
              handleCallback,
              handleCallback
            )
          }
        >
          Add Account
        </Text>
      </View>
    </View>
  );
};

export const openPlaid = (
  oauthStateId,
  products,
  onSuccess,
  onExit,
  onCancelled
) => {
  const props = {
    publicKey: PLAID_PUBLIC_KEY,
    clientName: "Spare Coins",
    env: PLAID_ENV,
    product: products,
    onSuccess: onSuccess,
    onExit: onExit,
    onCancelled: onCancelled,
    language: "en",
    oauthNonce: "longNonce-Nonce-accountID",
    countryCodes: ["GB", "US"],
    oauthRedirectUri: "sparecoins://Accounts",
    oauthStateId: oauthStateId
  };
  return openLink({ ...props });
};

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
