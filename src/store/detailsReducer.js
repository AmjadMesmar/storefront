/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */

let initialState = {};


export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {

      case 'details':
          return payload;
          
      default:
          return state;
  }


}

export const ItemDetails = (payload) => {
  return {
      type: 'details',
      payload:payload
  }
};

