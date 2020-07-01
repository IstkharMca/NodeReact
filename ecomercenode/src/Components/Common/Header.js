import React,{Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import NavBar from '../Pages/NavBar';
import Banner from '../Pages/Banner';
import * as authActions from '../../Store/actions/authActions';
import * as categoryActions from '../../Store/actions/categoryProductActions';
import * as cartActions from '../../Store/actions/cartActions';

class Header extends Component {
	constructor() {
		super();
		this.state =  {
			categories :[],
			products : []
		}
    }
    
	componentDidMount() {
            //if(this.props.auth.isAuthenticated) {
             console.log('did mount') 
            this.props.getCartItems(this.props.auth.token, '5ef73c507f39c259d92f9e72')
            // this.props.getToken()
            // .then(result => {
            //     console.log('the result is');
            //     console.log(result);
            //     console.log('end result here');
            //     if(result){
            //         this.props.getCartItems(this.props.auth.token, this.props.auth.user.userId)
            //     }

            // })
            // .catch(error => {
            //     console.log(error);
            // })
        //}

        this.props.getCategories();
        this.props.getProducts();
     }

     logout = () => {
            this.props.logout();
     }
     
    render() {
        console.log(this.props)
        const category = this.props.category;
        let account = <div className="top_bar_user">
                            <div className="user_icon"><img src="/images/user.svg" alt="" /></div>
                            <div><Link to={'signup'}>Register</Link></div>
                            <div><Link to={'login'}>Sign in</Link></div>
                        </div>;
                        
                 if(this.props.auth.isAuthenticated) {
                   account = <div className="top_bar_menu">
                        <ul className="standard_dropdown top_bar_dropdown">
                            <li>
                                <a href="#">{this.props.auth.user[0].first_name}  <i className="fas fa-chevron-down"></i></a>
                                <ul>
                                    <li><Link to={'/profile'}>Profile</Link></li>
                                    <li><Link to={'/orders'}>Orders</Link></li>
                                    <li><Link to={'/change-password'}>Change Password</Link></li>
                                    <li><Link to={''} onClick={() => this.logout()}>Logout</Link></li>
                                </ul>
                            </li>
                        
                        </ul>
                    </div>
        //     account = <div className="top_bar_user">
        //     <div className="user_icon"><img src="/images/user.svg" alt="" /></div>
            
        //     <div><Link to={'orders'}>Order </Link></div>
        //     <div><Link to={''} onClick={() => this.logout()}>Logout</Link></div>
        // </div>
        }

    return (
        <React.Fragment>
            <header className="header">
        <div className="top_bar">
            <div className="container">
                <div className="row">
                    <div className="col d-flex flex-row">
                        <div className="top_bar_contact_item"><div className="top_bar_icon"><img src="/images/phone.png" alt="" /></div>Istkhar Store</div>
                        <div className="top_bar_contact_item"><div className="top_bar_icon"><img src="/images/mail.png" alt="" /></div><Link to={'istkharali1991@gmail.com'}>istkharali1991@gmail.com</Link></div>
                        <div className="top_bar_content ml-auto">
                            {/* <div className="top_bar_user">
                                <div className="user_icon"><img src="/images/user.svg" alt="" /></div>
                                <div><Link to={'signup'}>Register</Link></div>
                                <div><Link to={'login'}>Sign in</Link></div>
                            </div> */}
                            {account}
							<div className="top_bar_user">
                                <div className="cart_text"></div>
                                <div><Link to={'cart'}><span>{this.props.cart.cartCount}</span> Cart</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>		
        </div>
    {/* Main Header */}
    </header>

		<NavBar category={category} />

        {/* <Banner /> */}
	</React.Fragment>);
	}
}


const mapStateToProps = state => {
    return {
		auth: state.auth,
        category : state.categoryProduct.category,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
		getCategories: () => dispatch(categoryActions.getCategories()),
		getProducts: () => dispatch(categoryActions.getProducts()),
        getToken: () => dispatch(authActions.getToken()),
        getCartItems: (token, userId) => dispatch(cartActions.getCartItems(token, userId)),
        logout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);