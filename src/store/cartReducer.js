/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import superagent from 'superagent';
const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";


let initialState = {
    results: []
};


export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {

        case 'add':
            initialState.results = { results: [...state.results, payload] };
            return initialState.results;

        case 'delete':
            let data = state.results;
            let selection = data.indexOf(payload)
            data.splice(selection, 1)
            return { results: data }

        default:
            return state;
    }


}

// BELOW ARE THE ACTIONS
// export const addToCart = (payload) => {
//     return {
//         type: 'add',
//         payload:payload
//     }
// };

export const addToCart = (payload) => (dispatch, state) => {
    console.log("🚀 ~ file: cartReducer.js ~ line 43 ~ addToCart ~ payload", payload)
    payload.inStock = payload.inStock-1;

    return superagent.put(`${storefrontAPI}/${payload._id}`).send(payload)
        .then((results) => {
            dispatch({
                type: 'add',
                payload: payload
            })
        });
};


export const deleteFromCart = (payload) => (dispatch, state) => {
    console.log("🚀 ~ file: cartReducer.js ~ line 43 ~ addToCart ~ payload", payload)
    payload.inStock = payload.inStock+1;

    return superagent.put(`${storefrontAPI}/${payload._id}`).send(payload)
        .then((results) => {
            dispatch({
                type: 'delete',
                payload: payload
            })
        });
};


// export const deleteFromCart = (payload) => {
//     return {
//         type: 'delete',
//         payload:payload

//     }
// };
