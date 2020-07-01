import React, {Fragment,Component} from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../Store/actions/authActions';
import Error from '../Pages/Error';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password :'',
            isError : false,
            ErrorMessage :"",
			successMessage:'',
			redirectToReferrer : false,
        }
    }
    componentDidMount() {
        console.log(this.props.cate);
        console.log(this.props.auth);

    }
    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };
    
    handleLogin = (e) => {
        this.props.authenticate(this.state.email,this.state.password)
        .then((response) => {
			console.log(response);
			this.setState({isError:false,
			successMessage:response.SUCCESS.MESSAGE,
			redirectToReferrer:true});
			
        }).catch((errors) => {
            if (errors.API_STATUS == 'FAIL') {
              this.setState({isError:true,ErrorMessage:errors.ERROR.MESSAGE});
            }
        })
        
        
    }
    render() {
		if(this.props.auth.isAuthenticated){
            return <Redirect to="/" />
        }
    return (
        <Fragment>
    <div className="panel-group">
     <div clasName="contact_form" style={{marginLeft:'600px',marginTop:'50px'}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                        <div className="contact_form_title">Login</div>
                            <Error> 
                              {this.state.ErrorMessage}
                             {this.state.successMessage}
                            </Error>
                            <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                                <input type="text" name="email" onChange={this.handleChange} id="contact_form_name" className="contact_form_name input_field" placeholder="Your Email-id" />
                                </div>
                            <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                                <input type="password" name="password" onChange={this.handleChange} id="contact_form_name" className="contact_form_name input_field" placeholder="Your Password" />
                                </div>
                            <div className="contact_form_button">
                                <button type="button" onClick={this.handleLogin} className="button contact_submit_button">Login</button>
                                <Link to={'signUp'} className="btn">Create Account</Link>
                                <Link to={'forgot-password'} className="btn">Forgot Password</Link>
                            </div>
                    </div>
            </div>
        </div>
        <div className="panel"></div>
    </div>
    </div>  
        </Fragment>
    );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password) => dispatch(authActions.authenticate(email, password)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        cate : state.categoryProduct
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);