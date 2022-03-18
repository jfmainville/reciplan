import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, submitButtonText, errorMessage, onSubmit }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<Spacer>
				<Text style={{ margin: 5, fontSize: 40, color: "white" }}>{headerText}</Text>
			</Spacer>
			<TextInput
				style={styles.textInput}
				label="Email"
				autoCapitalize="none"
				autoCorrect={false}
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.textInput}
				label="Password"
				autoCapitalize="none"
				autoCorrect={false}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			{errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> :
				<Text style={styles.errorMessage}/>}
			<Button
				style={{ marginLeft: 5, marginRight: 5, marginTop: 10, borderColor: "white", borderWidth: 1 }}
				labelStyle={{ fontSize: 25, color: "white" }}
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
		height: 30,
		marginLeft: 15,
		marginTop: 15
	},
});

export default AuthForm;