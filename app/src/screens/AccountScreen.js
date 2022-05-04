import React, { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
	const { signout, deleteAccount } = useContext(AuthContext);

	return (
		<SafeAreaView forceInset={{ top: "always" }}>
			<Button
				onPress={signout}
			>
				Sign out
			</Button>
			<Button
				onPress={deleteAccount}
			>
				Delete account
			</Button>
		</SafeAreaView>
	);
};

export default AccountScreen;