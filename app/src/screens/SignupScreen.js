import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { Button, Text, useTheme } from "react-native-paper";

const SignupScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const { state, signup, clearErrorMessage } = useContext(AuthContext);

	useEffect(() => {
		clearErrorMessage()
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", backgroundColor: colors.primary }}>
			<AuthForm
				headerText="Sign Up"
				submitButtonText="Sign Up"
				errorMessage={state.errorMessage}
				onSubmit={signup}
			/>
			<Text
				style={{
					color: colors.accent,
					marginLeft: 5,
					marginRight: 5,
					marginTop: 20,
					fontSize: 18,
					alignSelf: "center"
				}}
				onPress={() => navigation.navigate("Signin")}
			>
				Sign In
			</Text>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 200
	}
});

export default SignupScreen;