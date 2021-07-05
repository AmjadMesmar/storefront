import { createStore, combineReducers } from 'redux';

// This dependency enables the Redux Dev Tools in your chrome browser
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './categories';

let reducers = combineReducers({ categories: reducer });

const store = () => {
    return createStore(reducers, composeWithDevTools());
}

export default store();
