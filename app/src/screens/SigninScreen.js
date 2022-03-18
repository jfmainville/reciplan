import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import { Button, useTheme } from "react-native-paper";

const SigninScreen = ({ navigation }) => {
	const { colors } = useTheme()
	const { state, signin, clearErrorMessage } = useContext(AuthContext);

	useEffect(() => {
		clearErrorMessage()
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", backgroundColor: colors.primary }}>
			<AuthForm
				headerText="Sign In"
				submitButtonText="Sign In"
				errorMessage={state.errorMessage}
				onSubmit={signin}
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
				onPress={() => navigation.navigate("Signup")}
			>
				Sign Up
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SigninScreen;