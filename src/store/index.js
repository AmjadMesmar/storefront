import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// This dependency enables the Redux Dev Tools in your chrome browser
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './categoriesReducer';
import cartReducer from './cartReducer';
import detailsReducer from './detailsReducer';


let reducers = combineReducers({ Categories: reducer, Cart: cartReducer, Details:detailsReducer });

const store = () => {
    return createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
}

export default store();
