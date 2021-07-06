import { createStore, combineReducers } from 'redux';

// This dependency enables the Redux Dev Tools in your chrome browser
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './categoriesReducer';
import cartReducer from './cartReducer.js';


let reducers = combineReducers({ Categories: reducer, Cart: cartReducer });

const store = () => {
    return createStore(reducers, composeWithDevTools());
}

export default store();
