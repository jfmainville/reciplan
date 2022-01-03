import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const groceryReducer = (state, action) => {
	switch (action.type) {
		case "fetch_groceries":
			return action.payload;
		case "delete_grocery":
			return state.filter((grocery) => grocery.name !== action.payload);
		case "check_grocery":
			return state.map(grocery => action.payload.find(({ _id }) => _id === grocery._id) || grocery);
		default:
			return state;
	}
};

const fetchGroceries = (dispatch) => async () => {
	const response = await recipeApi.get("/groceries");
	dispatch({ type: "fetch_groceries", payload: response.data });
};

const addRecipeIngredients = () => async (recipe) => {
	await recipeApi.post("/groceries/ingredients", {
		recipe
	});
};

const createGrocery = () => async (groceryQuantity, groceryWeightUnit, groceryName, callback) => {
	await recipeApi.post("/groceries/create", {
		groceryQuantity,
		groceryWeightUnit,
		groceryName
	});
	if (callback) {
		callback();
	}
};

const deleteGrocery = (dispatch) => async (groceryName) => {
	await recipeApi.delete(`/groceries/delete/${groceryName}`);
	dispatch({ type: "delete_grocery", payload: groceryName });
};

const checkGrocery = (dispatch) => async (groceryName, groceryCheck) => {
	const response = await recipeApi.post("/groceries/check", {
		groceryName,
		groceryCheck
	});
	dispatch({ type: "check_grocery", payload: response.data });
};

export const { Provider, Context } = createDataContext(
	groceryReducer,
	{ fetchGroceries, addRecipeIngredients, createGrocery, deleteGrocery, checkGrocery },
	[]
);