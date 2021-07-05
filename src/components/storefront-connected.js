/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import  '../scss/storefront.scss';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {MaterialGrid} from '../Material-UI/MaterialGrid'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@material-ui/core/styles';
import useAjax from "../hooks/useajax";

const styles = {
  paper: {
    // padding: "1vw",
    textAlign: "center",
    color: "#000000",
    whiteSpace: "nowrap",
    background: "#DDDDDD",
    marginTop: "1vh",
    marginBottom: "1vh",
    marginLeft: "2vh",
    marginRight: "2vh",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // width:"30vw"
  }
};

const useStyles = makeStyles(styles);


const storefrontAPI = "https://api-js401.herokuapp.com/api/v1/products";

const Storefront = () => {
  
  const classes = useStyles();

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
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
      <MyButton href="#" onClick={getStorefront} >ELECTRONICS</MyButton>

      <MyButton href="#" onClick={getStorefront} >FOOD</MyButton>

    </nav>
    <h2 id="catageroyHeading">{list[0]?list[0].category.toUpperCase():null}</h2>
    <p id="catageroyDescribtion">{list[0]?'Category Description Goes Here':null}</p>
    {/* <section id="displayedData"> */}
  {/* <MyButton>STOREFRONT</MyButton> */}
  <Grid
        container
        // direction="row"
        cols={2}
        justify="center"
        alignItems="center"
        spacing={2}        
      >


    {

        list.map ((element) => {

        return (
        <Grid item xs={6}>
          <Paper className={classes.paper}>
        <img className="sourceImage" src={ `https://source.unsplash.com/random?${element.name}&quot`} alt=""/>
        <h4 key={element._id}>{element.name}</h4>
        <Button className="cardButton" >ADD TO CART</Button>
        <Button className="cardButton" >VIEW DETAILS</Button>
        </Paper>
        </Grid>
        )
      })
    }
     </Grid>



    </>
  );
};

export default Storefront;
