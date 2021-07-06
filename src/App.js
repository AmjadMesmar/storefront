import Header from './components/header'
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Products from './components/products'
import Categories from './components/categories'
import Footer from './components/footer'
import Details from './components/details';
import Checkout from './components/checkout'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>

          <Route exact path="/checkout"  >
            <Checkout />
          </Route>

          <Route exact path="/"  >
            <Categories />
            <Products />
          </Route>

          <Route exact path="/details"  >
            <Details />
          </Route>

          <Footer />
        </Switch>
      </Router>
    </>
  );
}

export default App;
