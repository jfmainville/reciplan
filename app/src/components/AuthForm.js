import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, submitButtonText, errorMessage, onSubmit }) => {
	const { colors } = useTheme()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<Spacer>
				<Text style={{ margin: 5, fontSize: 40, color: colors.accent }}>{headerText}</Text>
			</Spacer>
			<TextInput
				style={styles.textInput}
				label="Email"
				autoCapitalize="none"
				autoCorrect={false}
				value={email}
				onChangeText={setEmail}
				testID="#email"
			/>
			<TextInput
				style={styles.textInput}
				label="Password"
				autoCapitalize="none"
				autoCorrect={false}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				testID="#password"
			/>
			{errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> :
				<Text style={styles.errorMessage}/>}
			<Button
				style={{ marginLeft: 5, marginRight: 5, marginTop: 10, borderColor: colors.accent, borderWidth: 1 }}
				labelStyle={{ fontSize: 25, color: colors.accent }}
				mode="outlined"
				onPress={() => onSubmit({ email, password })}
			>
				{submitButtonText}
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		marginRight: 5,
		marginLeft: 5,
		marginTop: 5,
		backgroundColor: "white"
	},
	errorMessage: {
		fontSize: 16,
		color: "white",
		height: 20,
		marginTop: 10,
		marginLeft: 5
	},
});

export default AuthForm;