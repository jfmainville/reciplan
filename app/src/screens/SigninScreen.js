import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import { Text, useTheme } from "react-native-paper";

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
			<Text
				style={{
					color: colors.accent,
					marginLeft: 5,
					marginRight: 5,
					marginTop: 20,
					fontSize: 18,
					alignSelf: "center"
				}}
				onPress={() => navigation.navigate("Signup")}
			>
				Sign Up
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SigninScreen;