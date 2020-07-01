import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Cart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const cartItem = this.props.cart.cartItem;
		console.log(this.props.cart);
		console.log('the cart item is ');
		console.log(cartItem);
		return (
			<Fragment>

				<div class="cart_section">
					<div class="container">
						<div class="row">
							<div class="col-lg-10 offset-lg-1">
								<div class="cart_container">
									<div class="cart_title">Shopping Cart</div>
									<div class="cart_items">
										<table class="table">
											<thead>
												<tr>
													<th scope="col">Image</th>
													<th scope="col">Name</th>
													<th scope="col">Price</th>
													<th scope="col">Quantity</th>
													<th scope="col">Total</th>

												</tr>
											</thead>
											<tbody>
												{cartItem && cartItem.map((item) => (
													<tr key={item._id}>
														<th scope="row"><img src={item.image} style={{ width: '100px' }} /></th>
														<td>{item.name}</td>
														<td>{item.price}</td>
														<td>{item.quantity}</td>
														<td>{item.total}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									<div class="order_total">
										<div class="order_total_content text-md-right">
											<div class="order_total_title">Order Total:</div>
											<div class="order_total_amount">{this.props.cart.totalAmount}</div>
										</div>
									</div>

									<div class="cart_buttons">
										<Link to={'/'} class="button cart_button_clear">Continue Shopping</Link>
										<Link to={'/checkout'} class="button cart_button_clear">Checkout</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Fragment>
		);
	}
}


const mapStateToProps = state => {
	return {
		auth: state.auth,
		category: state.categoryProduct.category,
		cart: state.cart
	}
}


export default connect(mapStateToProps, null)(Cart);
// export default connect(mapStateToProps)(Cart);