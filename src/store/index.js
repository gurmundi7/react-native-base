import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from "../reducers";

const rootReducer = combineReducers({
	user: userReducer
});

const configureStore = () => {
	return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
