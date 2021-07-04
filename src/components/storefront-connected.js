/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import  '../scss/storefront.scss';
import { CardHeader,Button, Grid , GridList } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useAjax from "../hooks/useajax";


const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";

const Storefront = () => {
  

  let [requestHandler] = useAjax();
  const [list, setList] = useState([]);

  let getData = [];
  const _addItem = async (item) => {
    item.due = new Date();
    try {
      let savedItem = await requestHandler(storefrontAPI, "post", item);
      setList([...list, savedItem.data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const _toggleComplete = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let url = `${storefrontAPI}/${id}`;
      try {
        let savedItem = await requestHandler(url, "put", item);
        setList(
          list.map((listItem) =>
            listItem._id === item._id ? savedItem.data : listItem
          )
        );
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  
  const getStorefront =   (e) => {

    let targetCategory = e.target.textContent.toLowerCase();
    requestHandler(storefrontAPI, "get")
    .then((results) => {
      let categoryArray =[];
      results.data.results.forEach ((data)=>{
        if(data.category === targetCategory)
        categoryArray.push(data);
      });
      setList(categoryArray);
      console.log(list);
    })

    .catch(console.error);
    
  };

  const handleDelete = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      let url = `${storefrontAPI}/${id}`;
      try {
        await requestHandler(url, "delete", item);
        let dataId = list.indexOf(item);
        let newList = [...list];
        newList.splice(dataId,1);
        setList(newList);
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  const handleEdit = (id, value) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.text = value;

      let url = `${storefrontAPI}/${id}`;

      requestHandler(url, "put", item)
        .then((savedItem) => {
          setList(
            list.map((listItem) =>
              listItem._id === item._id ? savedItem.data : listItem
            )
          );
        })
        .catch(console.error);
    }
  };

  // useEffect(getStorefront, []);
  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
  return (
    <>
    <h2>Browse our categories</h2>
    <nav id="category">
      <a href="#" onClick={getStorefront} >ELECTRONICS</a>

      <a href="#" onClick={getStorefront} >FOOD</a>

    </nav>
    <h2 id="catageroyHeading">{list[0]?list[0].category.toUpperCase():null}</h2>
    <p id="catageroyDescribtion">{list[0]?'Category Description Goes Here':null}</p>
    {/* <section id="displayedData"> */}
  {/* <MyButton>STOREFRONT</MyButton> */}
  <GridList
        container
        // direction="row"
        cols={3}
        // justify="center"
        // alignItems="center"
        // spacing={5}
        
      >


    {

        list.map ((element) => {

        return (
        <div>
        <img className="sourceImage" src="https://productmanagementfestival.com/wp-content/uploads/2017/01/sell-your-product-online.jpg" alt=""/>
        <h4 key={element._id}>{element.name}</h4>
        <a className="cardLink" href="#" >ADD TO CART</a>
        <a className="cardLink" href="#" >VIEW DETAILS</a>
        </div>
        )
      })
    }
     </GridList>



    </>
  );
};

export default Storefront;
