import createDataContext from "./createDataContext";
import recipeApi from "../api/recipe";

const recipeReducer = (state, action) => {
	switch (action.type) {
		case "fetch_recipes":
			return action.payload;
		case "update_recipe":
			return state.map((recipe) => {
				return recipe._id === action.payload._id
					? action.payload
					: recipe;
			});
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

const createRecipe = () => async (recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
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

const updateRecipe = (dispatch) => async (recipeId, recipeName, recipeStyle, recipePreparationTime, recipeCookTime, ingredients, callback) => {
	await recipeApi.put(`/recipes/update/${recipeId}`, {
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

const deleteRecipe = (dispatch) => async (recipeId) => {
	await recipeApi.delete(`/recipes/delete/${recipeId}`);
	dispatch({ type: "delete_recipe", payload: recipeId });
};

export const { Provider, Context } = createDataContext(
	recipeReducer,
	{ fetchRecipes, createRecipe, updateRecipe, deleteRecipe },
	[]
);