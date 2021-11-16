import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const recipeReducer = (state, action) => {
	switch (action.type) {
		case "fetch_tracks":
			return action.payload;
		default:
			return state;
	}
};

const fetchRecipes = (dispatch) => async () => {
	const response = await trackerApi.get("/tracks");
	dispatch({ type: "fetch_tracks", payload: response.data });
};

const createRecipe = (dispatch) => async (name, locations) => {
	await trackerApi.post("/tracks", { name, locations });
};

export const { Provider, Context } = createDataContext(
	recipeReducer,
	{ fetchRecipes, createRecipe },
	[]
);