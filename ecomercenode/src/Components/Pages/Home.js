
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Notifications, { notify } from "react-notify-toast";
import * as cartActions from '../../Store/actions/cartActions';
class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }
  
  componentDidMount() {

  }

  addToCart = (id, name, price, image) => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
      return;
    }
    
    const { auth } = this.props;
    const cartData = {
      user: auth.user[0]._id,
      product: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    }

    console.log(cartData);
    this.props.addToCart(auth.token, cartData);

    notify.show(
      <div className="text-right">
        <h3>Item has been added to your cart</h3>
      </div>,
      "success"
    );
  }
  render() {
    const products = this.props.product;
    return (
      <React.Fragment>
        <Notifications />

        {/* <CharacterStics />
            */}
        <div className="container text-center" style={{ marginTop: '50px' }}>
          <h1>Product listing</h1>
          <div class="row">
            {products && products.map((product, index) => (
              <div class="col-sm-4" key={index} style={{ marginTop: '50px' }}>
                <div class="card" style={{ width: '23rem' }}>
                  <img class="card-img-top" src={product.productPic[0].img} alt="Card image cap" />
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <p class="card-text">{product.description}</p>
                    <button class="btn btn-primary" onClick={() => this.addToCart(product._id, product.name, product.price, product.productPic[0].img)}>Add to Cart</button>
                  </div>
                </div>
                {/* <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">{product.description}</p>
                  <a href="#" class="btn btn-primary">Add to cart</a>
                </div>
              </div> */}
                <div className="clearfix"></div>
              </div>
            ))}
            {/* <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Add To Cart</a>
                </div>
              </div>
            </div> 
            <div class="col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div> */}
          </div></div>
        {/* <Brand /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    product: state.categoryProduct.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (token, CartItem) => dispatch(cartActions.addToCart(token, CartItem)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);