/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import superagent from 'superagent';
import { createSlice } from "@reduxjs/toolkit";

const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";

let initialState = {};

const detailsSlice = createSlice({
  name: 'details',
  initialState: [],
  reducers: {
    detailsAction(state, action) {    
      return action.payload;
    },
  }
});

// export default (state = initialState, action) => {
//   let { type, payload } = action;

//   switch (type) {

//       case 'details':
//           return payload;
          
//       default:
//           return state;
//   }


// }

// export const ItemDetails = (payload) => {
//   return {
//       type: 'details',
//       payload:payload
//   }
// };

export const ItemDetails = (payload) => (dispatch, state) => {
  return superagent.get(`${storefrontAPI}/${payload._id}`)
  .then((results) => {
    dispatch(detailsAction(results.body));
    });
    };

    // export reducer
export default detailsSlice.reducer;
// export actions
export const { detailsAction } = detailsSlice.actions;

