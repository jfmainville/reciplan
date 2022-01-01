import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const groceryReducer = (state, action) => {
	switch (action.type) {
		case "fetch_groceries":
			return action.payload;
		case "update_grocery":
			return state.map((recipe) => {
				return recipe._id === action.payload._id
					? action.payload
					: recipe;
			});
		case "delete_grocery":
			return state.filter((recipe) => recipe._id !== action.payload);
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

const createGrocery = () => async (recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
	await recipeApi.post("/groceries", {
		recipeName,
		recipeStyle,
		recipePreparationTime,
		recipeCookTime,
		ingredients
	});
	if (callback) {
		callback();
	}
};

const updateGrocery = (dispatch) => async (recipeId, recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
	await recipeApi.put(`/groceries/update/${recipeId}`, {
		recipeName,
		recipeStyle,
		recipePreparationTime,
		recipeCookTime,
		ingredients
	});

	dispatch({
		type: "update_recipe", payload: {
			recipeName,
			recipeStyle,
			recipePreparationTime,
			recipeCookTime,
			ingredients
		}
	});

	if (callback) {
		callback();
	}
};

const deleteGrocery = (dispatch) => async (recipeId) => {
	await recipeApi.delete(`/groceries/delete/${recipeId}`);
	dispatch({ type: "delete_recipe", payload: recipeId });
};

export const { Provider, Context } = createDataContext(
	groceryReducer,
	{ fetchGroceries, addRecipeIngredients, createGrocery, updateGrocery, deleteGrocery },
	[]
);