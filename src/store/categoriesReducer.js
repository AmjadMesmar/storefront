/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import superagent from 'superagent';
// this is a reducer

const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";

let initialState = {

  products: [
    {
      _id: "5f1a51f01910080017657ed2",
      name: "1TB USB",
      category: "electronics",
      img: "data:image/jpeg;base64,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"

    },
    {
      _id: "5f1a51f71910080017657ed3",
      name: "Monitor",
      category: "electronics",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxh4NgFQ0qc_U3K1eMh_u8eCdI3FDnvdUHzw&usqp=CAU"

    },
    {
      _id: "5f1a51ff1910080017657ed4",
      name: "Mouse",
      category: "electronics",
      img: "data:image/jpeg;base64,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"

    },
    {
      _id: "5f1a52031910080017657ed5",
      name: "Keyboard",
      category: "electronics",
      img: "https://i.shgcdn.com/e5911dbd-c7a4-4daa-a774-292d9157456f/-/format/auto/-/preview/3000x3000/-/quality/better/"

    },
    {
      _id: "5f1a5f761910080017657ed6",
      name: "Apples",
      category: "food",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmVvvGnGl-yBrLVDqL5LZ0vr83qi42YU8XA&usqp=CAU"

    },
    {
      _id: "5f1a5f861910080017657ed7",
      name: "TV",
      category: "electronics",
      img: "data:image/jpeg;base64,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"

    },
    {
      _id: "5f1a5faf1910080017657ed8",
      name: "Calzones",
      category: "food",
      img: "https://embed.widencdn.net/img/beef/pz4eba64j5/1120x840px/beef-pepper-and-onion-pizza-horizontal.tif?keep=c&u=7fueml"

    },

  ]
}


export default (state = null, action) => {

  let { type, payload } = action;
  let categoryArray = [];

  switch (type) {

    case 'electronics':

      payload.forEach((data) => {
        if (data.category === 'electronics')
          categoryArray.push(data);
      });

      return categoryArray;

    case 'food':

      payload.forEach((data) => {
        if (data.category === 'food')
          categoryArray.push(data);
      });

      return categoryArray;

    default:
      return state;
  }


}

export const electronics = (type) => (dispatch, state) => {
  return superagent.get(storefrontAPI)
    .then((results) => {
      dispatch({
        type: 'electronics',
        payload: results.body.results
      })
    });
    };

    export const food = (type) => (dispatch, state) => {
      return superagent.get(storefrontAPI)
        .then((results) => {
          dispatch({
            type: 'food',
            payload: results.body.results
          })
        });
        };


