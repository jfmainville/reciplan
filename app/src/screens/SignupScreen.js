import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { Button, useTheme } from "react-native-paper";

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
			<Button
				style={{
					marginLeft: 5,
					marginRight: 5,
					marginTop: 10,
					borderColor: "white",
					borderWidth: 1,
					backgroundColor: "white"
				}}
				labelStyle={{ fontSize: 25, color: colors.primary }}
				mode="outlined"
				onPress={() => navigation.navigate("Signin")}
			>
				Sign In
			</Button>
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