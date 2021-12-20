import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const recipeReducer = (state, action) => {
	switch (action.type) {
		case "fetch_recipes":
			return action.payload;
		case "delete_recipe":
			return state.filter((recipe) => recipe._id !== action.payload);
		default:
			return state;
	}
};

const fetchRecipes = (dispatch) => async () => {
	const response = await recipeApi.get("/recipes");
	dispatch({ type: "fetch_recipes", payload: response.data });
};

const createRecipe = (dispatch) => async (recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
	await recipeApi.post("/recipes", {
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

const deleteRecipe = (dispatch) => async (recipeId) => {
	await recipeApi.delete(`/recipes/delete/${recipeId}`);
	dispatch({ type: "delete_recipe", payload: recipeId });
};

export const { Provider, Context } = createDataContext(
	recipeReducer,
	{ fetchRecipes, createRecipe, deleteRecipe },
	{ recipeName: "", recipeStyle: "", recipePreparationTime: null, recipeCookTime: null, ingredients: [] }
);