import '../scss/header.scss';
import SimpleCart from './simplecart'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart,deleteFromCart} from '../store/cartReducer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {ItemDetails} from '../store/detailsReducer';
const  Header = (props)=>{
console.log("🚀 ~ file: header.jsx ~ line 6 ~ Header ~ props", props.cartState.results)
    return (
        <>
        <AppBar component={Link} to="/" position="static">
            <h1>Storefront <SimpleCart/><span id ="cartCounter">({props.cartState? props.cartState.results.length:0})</span></h1>
            <nav>
            </nav>
        </AppBar>
        <br></br>
            <div id="cartList">
            {
                
            props.cartState.results[0]?props.cartState.results.map ((element,idx) => 
                <Button component={Link} to="/details"  onClick={() => props.ItemDetails(element)} key ={idx}>{element.name}
                    <button onClick={() => props.addToCart(element)}>+</button>
                    <button onClick={() => props.deleteFromCart(element)}>-</button>               
                </Button>
            ):null

            }
            </div>
            </>
    );
};

const mapStateToProps = (state) => ({cartState: state.Cart});

const mapDispatchToProps = {addToCart,deleteFromCart,ItemDetails};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
