import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { manifest } = Constants;

const instance = axios.create({
	baseURL: manifest.debuggerHost ? `http://${manifest.debuggerHost.split(":").shift()}:3000` : "http://localhost:3000"
});

instance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;