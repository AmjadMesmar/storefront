/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useContext } from "react";
import Button from '@material-ui/core/Button';
import '../scss/storefront.scss'
import Grid from '@material-ui/core/Grid';
import {MaterialGrid} from '../Material-UI/MaterialGrid'
import Paper from "@material-ui/core/Paper";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {addToCart} from '../store/cartReducer';
import {ItemDetails} from '../store/detailsReducer';



const styles = {
  paper: {
    // padding: "theme.spacing(1)",
    textAlign: "center",
    color: "#000000",
    whiteSpace: "nowrap",
    background: "#DDDDDD",
    marginTop: "1vh",
    marginBottom: "1vh",
    marginLeft: "2vh",
    marginRight: "2vh",
    boxShadow: '5 3px 5px 2px rgba(255, 105, 135, .3)',
    width:"30vw"
  }
};

const MyButton = styled(Button)({
  // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const useStyles = makeStyles(styles);

const Products = (props) => {
console.log("🚀 ~ file: products.jsx ~ line 47 ~ Products ~ props", props.state)

const classes = useStyles();


  return (
    <>
    <main>

    <h2 id="catageroyHeading">{props.state?props.state[0].category.toUpperCase():null}</h2>
    <p id="catageroyDescribtion">{props.state?'Category Description Goes Here':null}</p>
  <Grid s={5}
        container
        // direction="row"
        cols={2}
        justify="center"
        alignItems="center"
        spacing={2}    
      >


    {

        props.state?props.state.map ((element,idx) => {
        return (
          <Paper key={idx} className={classes.paper}>
        <img className="sourceImage" src={ `https://source.unsplash.com/random?${element.name}&quot`} alt=""/>
        <h4 key={element._id}>{element.name}</h4>
        <Button onClick={() => props.addToCart(element)} className="cardButton" >ADD TO CART</Button>
        <Button component={Link} to="/details" onClick={() => props.ItemDetails(element)} className="cardButton" >VIEW DETAILS</Button>
        </Paper>
        )
      }):null
    }
     </Grid>


     </main>
    </>
  );
};

const mapStateToProps = (state) => ({state: state.Categories,cartState: state.Cart});

const mapDispatchToProps = {addToCart,ItemDetails};

export default connect(mapStateToProps,mapDispatchToProps)(Products);

