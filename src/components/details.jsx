import React from 'react';
import { connect } from 'react-redux';
import { useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {addToCart,deleteFromCart} from '../store/cartReducer';
import { When } from 'react-if';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {ItemDetails} from '../store/detailsReducer';

// import SimpleCart from '../cart/simple-cart';

const UseStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    productName: {
      textTransform: 'uppercase'
    },
    layout: {
      boxSizing: "border-box",
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    data: {
      padding: theme.spacing(3),
    },
    related: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    relatedItem: {
      padding: theme.spacing(2),
    },
    price: {
      textAlign: "right",
      color: theme.secondary,
    },
    buyButton: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      width: "100%",
    },
    more: {
      width: "100%"
    },
    image: {
      maxWidth: "100%"
    }
  }));

function Details(props) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(ItemDetails(props));
  // },[props,dispatch]);

    const classes = UseStyles();
    let detailsData =props.detailsState;
    return (
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" className={classes.productName} align="center" color="textPrimary" gutterBottom>
            {detailsData.name}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {detailsData.description}
          </Typography>
          <div className={classes.layout}>
            <Paper>
              <Grid container className={classes.data}>
                <Grid item xs={12}>
                  <img alt={detailsData.name} className={classes.image} src={`https://source.unsplash.com/random?${detailsData.name}`} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5" color="textSecondary" paragraph>
                    In Stock: <strong>{detailsData.inStock}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.price}>
                  <Typography variant="h5" paragraph>
                    ${detailsData.price}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <When condition={detailsData.inStock >= 1}>
              <Button className={classes.buyButton} variant="contained" color="primary"onClick={ ()=>{props.addToCart(detailsData)}}>Buy</Button>
            </When>
            <Grid container className={classes.related}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom={true}>Related Items</Typography>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.relatedItem}>Suggestion 1</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.relatedItem}>Suggestion 2</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.relatedItem}>Suggestion 3</Paper>
              </Grid>
            </Grid>
            <Typography variant="h4" gutterBottom={true}>Product Details</Typography>

          </div>
        </Container>
      </div >
      
    )

}


const mapStateToProps = (state) => ({detailsState: state.Details});

const mapDispatchToProps = {addToCart,deleteFromCart,ItemDetails};
export default connect(mapStateToProps,mapDispatchToProps)(Details)