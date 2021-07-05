/* eslint-disable import/no-anonymous-default-export */
import useAjax from "../hooks/useajax";
// this is a reducer

const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";

export default (state = [], action) => {
    let targetCategory = 'this will have the category';
    let [requestHandler] = useAjax();
    let { category, payload } = action;

    switch (category) {
        case 'electronics':
            requestHandler(storefrontAPI, "get")
            .then((results) => {
              let categoryArray =[];
              results.data.results.forEach ((data)=>{
                if(data.category === targetCategory)
                categoryArray.push(data);
              });
              payload = categoryArray;
              console.log(payload);
            });

            return {payload};

            case 'food':
                requestHandler(storefrontAPI, "get")
                .then((results) => {
                  let categoryArray =[];
                  results.data.results.forEach ((data)=>{
                    if(data.category === targetCategory)
                    categoryArray.push(data);
                  });
                  payload = categoryArray;
                  console.log(payload);
                });
    
                return {payload};
            default:
            return payload;
    }


}

// BELOW ARE THE ACTIONS
export const electronics = (payload) => {
    return {
      category: 'electronics',
        payload: payload
    }
};

export const food = (payload) => {
    return {
      category: 'food',
        payload: payload

    }
};
