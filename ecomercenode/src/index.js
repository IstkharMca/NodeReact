import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import Home from '../src/Components/Pages/Home';
import Header from '../src/Components/Common/Header';
import Footer from '../src/Components/Common/Footer';
import About from '../src/Components/Pages/About';
import Contact from '../src/Components/Pages/Contact';
import Blog from '../src/Components/Pages/Blog';
import ProductDetails from '../src/Components/Pages/ProductDetails';
import shoppingCart from '../src/Components/Pages/shoppingCart';
import checkOut from '../src/Components/Pages/checkOut';
import blogDetails from '../src/Components/Pages/blogDetails';
import Cart from './Components/Pages/Cart';
import Login from './Components/Pages/Login';
import SignUp from './Components/Pages/SignUp';
import ForgotPassword from './Components/Pages/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword';




import { Provider } from "react-redux";
import store from './Store/reducers/rootReducers';


const App = () => {
    return <Provider store={store}>
      <Router>
      <Header />
      <Switch>
        <Route  path="/"  exact component={Home} />
        <Route  path="/about-us" exact component={About} />
        <Route  path="/contact-us" exact component={Contact} />
        <Route  path="/blog" exact component={Blog} />
        <Route  path="/product-details" exact component={ProductDetails} />
        <Route  path="/shoping-cart" exact component={shoppingCart} />
        <Route  path="/checkout" exact component={checkOut} />
        <Route  path="/blog-details" exact component={blogDetails} />
        <Route  path="/cart" exact component={Cart} />
        <Route  path="/login" exact component={Login} />
        <Route  path="/signup" exact component={SignUp} />
        <Route  path="/forgot-password" exact component={ForgotPassword} />
        <Route  path="/reset-password/:token" exact component={ResetPassword} />
      </Switch>
      <Footer />
    </Router></Provider>
}

ReactDOM.render(<App />,document.querySelector('#root'))