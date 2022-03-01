import React, { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
	const { signout, deleteAccount } = useContext(AuthContext);

	return (
		<SafeAreaView forceInset={{ top: "always" }}>
			<Text style={{ fontSize: 48 }}>AccountScreen</Text>
			<Button
				title="Sign Out" onPress={signout}
			/>
			<Button
				title="DeleteAccount" onPress={deleteAccount}
			/>
		</SafeAreaView>
	);
};

AccountScreen.navigationOptions = {
	title: "Account",
	tabBarIcon: <FontAwesome name="gear" size={20}/>
};

export default AccountScreen;