import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
	const { state, signin, clearErrorMessage } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<AuthForm
				headerText="Sign In to Your Account"
				submitButtonText="Sign In"
				errorMessage={state.errorMessage}
				onSubmit={signin}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 250
	}
});

export default SigninScreen;