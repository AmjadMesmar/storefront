// import react from 'react';
import  '../scss/storefront.scss';
import {electronics,food} from '../store/categoriesReducer'
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';



const MyButton = styled(Button)({
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'blue',
    height: 48,
    padding: '0 30px',
    fontSize: 20,
    borderLeft: 5,
    borderColor: "black"
  });

const Categories = ((props) =>{

return (
    <>
    <h2>Browse our categories</h2>
    <nav>
      <MyButton  onClick={props.electronics} >ELECTRONICS</MyButton>
      <MyButton id="category"  onClick={props.food} >FOOD</MyButton>
    </nav>
    </>
)

});

const mapStateToProps = (state) => ({state:state.Categories});

const mapDispatchToProps = {electronics,food};

export default connect(mapStateToProps,mapDispatchToProps)(Categories);