// import react from 'react';
import  '../scss/storefront.scss';
// import {addToCart,deleteFromCart} from '../store/cartReducer'
// import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';



const SimpleCart = (() =>{

return (
    <>
      <Button component = {Link} to="/checkout">Cart</Button>
    </>
)

});


export default SimpleCart;