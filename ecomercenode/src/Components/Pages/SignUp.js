import React, {Fragment,Component} from 'react';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import * as authActions from '../../Store/actions/authActions';
import Error from '../Pages/Error';


class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			first_name:'',last_name:'',email:'',mobile:'',address:'',password:'',confirm_password:'',
			isError: false,
			errorMessage: '',
			isSuccess: false,
			successMessage:''
		}
	}

	setInputValue = (event) => {
		const { value, name } = event.target;
        this.setState({ [name]: value });
	}
    setError = (error, message) => {
        this.setState({
            isError: error,
            errorMessage: message
        })
	}
	
	SignUpHandler = (event) => {
		event.preventDefault();
		this.setState({isSuccess:false,successMessage:''});
		const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
		if(this.state.first_name === ''){
            this.setError(true, 'First name is required.'); return;
		}
		if(this.state.last_name === ''){
            this.setError(true, 'Last name is required'); return;
		}
		else if(this.state.email === ''){
            this.setError(true, 'Email-id is required'); return;
		}
        else if(!emailPattern.test(this.state.email)){
            this.setError(true, 'Invalid Email Address'); return;
        }
		else if(this.state.mobile === ''){
            this.setError(true, 'Mobile field is required'); return;
		}
		else if(this.state.address === ''){
            this.setError(true, 'Address field is required'); return;
		}
		else if(this.state.password === ''){
            this.setError(true, 'Password is required'); return;
		}
		else if(this.state.confirm_password === ''){
            this.setError(true, 'Confirm password field is required'); return;
		}
		else if(this.state.confirm_password != this.state.password ) {
            this.setError(true, 'Password and confirm password did not matches'); return;
		} else {
            this.setError(false, '');
		}

		const userInfo = {
			first_name : this.state.first_name,
			last_name : this.state.last_name,
			email : this.state.email,
			mobile : this.state.mobile,
			password : this.state.password,
			address : this.state.address
		}

		this.props.signup(userInfo)
		.then((response) => {
			if (response.API_STATUS == 'FAIL') {
				this.setState({isSuccess:false,successMessage:''});
				this.setError(true,response.ERROR.MESSAGE);
			} else {
				this.setState({isSuccess:true,successMessage:response.SUCCESS.MESSAGE});
				this.setState({isError:false,errorMessage :'',first_name:'',last_name:'',email:'',mobile:'',address:'',password:'',confirm_password:''})
			}
		})
		.catch((error) => {
			console.log('error');
			console.log(error);
		})

	}
    render() {
		if(this.props.auth.isAuthenticated){
            return <Redirect to="/" />
		}
		
    return (
        <Fragment>
    <div class="panel-group">
     <div clasName="contact_form">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
						<div class="contact_form_title" style={{marginLeft:'500px',marginTop:'50px'}}>Registration</div>
						{this.state.isError &&
						  <div className="alert alert-danger">{this.state.errorMessage}</div>						
						}

						{this.state.isSuccess &&
						  <div className="alert alert-success">{this.state.successMessage}</div>
						}
						<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
							<input type="text" name="first_name" onChange={this.setInputValue} value={this.state.first_name} class="contact_form_name input_field" placeholder="First Name" />
							<input type="text" name="last_name" onChange={this.setInputValue} value={this.state.last_name} class="contact_form_email input_field" placeholder="Last Name" />
							<input type="text" name="email" onChange={this.setInputValue} value={this.state.email} class="contact_form_phone input_field" placeholder="Email-id" />
						</div>
						<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
							<input type="text" name="mobile" onChange={this.setInputValue}  value={this.state.mobile} class="contact_form_name input_field" placeholder="Mobile-no" />
							<input type="text" name="address"  onChange={this.setInputValue} value={this.state.address} class="contact_form_email input_field" placeholder="Address" required="required" />
							<input type="password" name="password" onChange={this.setInputValue} value={this.state.password} id="form_password" class="contact_form_email input_field" placeholder="Password" />
						</div>
						<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
							<input type="password" name="confirm_password" onChange={this.setInputValue} value={this.state.confirm_password} id="form_confirm_password" class="contact_form_name input_field" placeholder="Confirm Password" />			
						</div>
						<div class="contact_form_button">
							<button type="button" onClick={this.SignUpHandler} class="button contact_submit_button">Sign Up</button>
							<Link to={'login'} class="btn">Login</Link>
						</div>

					</div>
			</div>
		</div>
		<div class="panel"></div>
	</div>
	</div>	
        </Fragment>
    );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (userinfo) => dispatch(authActions.signup(userinfo)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        cate : state.categoryProduct
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);