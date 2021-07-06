import '../scss/header.scss';
import SimpleCart from './simplecart'
import {connect} from 'react-redux';
import {addToCart,deleteFromCart} from '../store/cartReducer';
import AppBar from '@material-ui/core/AppBar';
const  Header = (props)=>{
console.log("🚀 ~ file: header.jsx ~ line 6 ~ Header ~ props", props.cartState.results)
    return (
        <>
        <AppBar position="static">
            <h1>Storefront <SimpleCart/><span id ="cartCounter">({props.cartState.results[0]? props.cartState.results.length:0})</span></h1>
            <nav>
            </nav>
        </AppBar>
        <br></br>
            <div id="cartList">
            {
                
            props.cartState.results[0]?props.cartState.results.map ((element,idx) => 
                <li key ={idx}>{element.name}
                    <button onClick={() => props.addToCart(element)}>+</button>
                    <button onClick={() => props.deleteFromCart(element)}>-</button>               
                </li>
            ):null

            }
            </div>
            </>
    );
};
// export default Header;

const mapStateToProps = (state) => ({cartState: state.Cart});

const mapDispatchToProps = {addToCart,deleteFromCart};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
