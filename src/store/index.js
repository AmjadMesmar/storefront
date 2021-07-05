import { createStore, combineReducers } from 'redux';

// This dependency enables the Redux Dev Tools in your chrome browser
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './categoriesReducer';
console.log("🚀 ~ file: index.js ~ line 7 ~ reducer", reducer)

let reducers = combineReducers({ Categories: reducer });

const store = () => {
    return createStore(reducers, composeWithDevTools());
}

export default store();
