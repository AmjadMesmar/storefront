/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import superagent from 'superagent';
import { createSlice } from "@reduxjs/toolkit";

const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";


// let initialState = {
//     results: []
// };
let cartArray = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        results: [],
    },
    reducers: {
        add(state, action) {
            state = { results: [...state.results, action.payload] };
            return state;
        },
        deleteItem(state, action) {
            let data = state.results;
            let selection = data.indexOf(action.payload)
            data.splice(selection, 1)
            return state;
        },
    }
});


// export default (state = initialState, action) => {
//     let { type, payload } = action;

//     switch (type) {

//         case 'add':
//             initialState.results = { results: [...state.results, payload] };
//             return initialState.results;

//         case 'delete':
//             let data = state.results;
//             let selection = data.indexOf(payload)
//             data.splice(selection, 1)
//             return { results: data }

//         default:
//             return state;
//     }


// }

// BELOW ARE THE ACTIONS
// export const addToCart = (payload) => {
//     return {
//         type: 'add',
//         payload:payload
//     }
// };

export const addToCart = (payload) => (dispatch, state) => {
    let body = {
        inStock: payload.inStock - 1
    };
    // payload.inStock = payload.inStock - 1;

    // return superagent.put(`${storefrontAPI}/${payload._id}`).send(payload)
    return superagent.put(`${storefrontAPI}/${payload._id}`).send(body)
        .then((results) => {
            dispatch(add(results.body));

        });
};


export const deleteFromCart = (payload) => (dispatch, state) => {

    // payload.inStock = payload.inStock + 1;

    let body = {
        inStock: payload.inStock + 1
    };

    return superagent.put(`${storefrontAPI}/${payload._id}`).send(body)
        .then((results) => {
            dispatch(deleteItem(results.body));

        });
};


// export const deleteFromCart = (payload) => {
//     return {
//         type: 'delete',
//         payload:payload

//     }
// };

// export reducer
export default cartSlice.reducer;
// export actions
export const { add,deleteItem} = cartSlice.actions;