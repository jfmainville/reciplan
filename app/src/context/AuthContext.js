import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, NativeModules } from 'react-native'
import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const authReducer = (state, action) => {
	switch (action.type) {
		case "add_error":
			return { ...state, errorMessage: action.payload };
		case "signin":
			return { token: action.payload, loading: false, errorMessage: "" };
		case "signout":
			return { token: null, loading: false, errorMessage: "" };
		case "clear_error_message":
			return { ...state, errorMessage: "" };
		default:
			return state;
	}
};

const tryLocalSignin = (dispatch) => async () => {
	const token = await AsyncStorage.getItem("token");
	if (token) {
		dispatch({ type: "signin", payload: token });
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
	try {
		const deviceLanguage =
			Platform.OS === 'ios'
				? NativeModules.SettingsManager.settings.AppleLocale ||
				NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
				: NativeModules.I18nManager.localeIdentifier;
		const response = await recipeApi.post("/signup", { email, password, deviceLanguage });
		await AsyncStorage.setItem("token", response.data.token);
		await AsyncStorage.setItem("email", email);
		dispatch({ type: "signin", payload: response.data.token });
	} catch (err) {
		console.log(err);
		dispatch({
			type: "add_error",
			payload: "Something went wrong with sign up"
		});
	}
};

const signin = (dispatch) => async ({ email, password }) => {
	try {
		const response = await recipeApi.post("/signin", { email, password });
		await AsyncStorage.setItem("token", response.data.token);
		await AsyncStorage.setItem("email", email);
		dispatch({ type: "signin", payload: response.data.token });
	} catch (err) {
		dispatch({
			type: "add_error",
			payload: "Something went wrong with sign in"
		});
	}
};

const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem("token");
	await AsyncStorage.removeItem("email");
	dispatch({ type: "signout" });
};

const deleteAccount = (dispatch) => async () => {
	const email = await AsyncStorage.getItem("email")
	await recipeApi.post("/user/delete", { email });

	await AsyncStorage.removeItem("token");
	await AsyncStorage.removeItem("email");
	dispatch({ type: "signout" });
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ tryLocalSignin, signup, signin, signout, deleteAccount, clearErrorMessage },
	{ token: null, loading: true, errorMessage: "" }
);