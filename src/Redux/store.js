import { createStore } from "redux";
import rootReducer from "./Reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
export const store = createStore(rootReducer, composeWithDevTools());
