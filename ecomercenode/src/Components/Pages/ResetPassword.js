import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link,Redirect } from 'react-router-dom';
import * as authActions from '../../Store/actions/authActions';



class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirm_password: '',
			isError: false,
			errorMessage: '',
			isSuccess: false,
			successMessage: '',
			isLoading : false
		}
	}
	componentDidMount() {
		console.log(this.props.match.params.token);
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

	passwordHandler = (event) => {
		event.preventDefault();
		this.setState({ isSuccess: false, successMessage: '' });

		if (this.state.password === '') {
			this.setError(true, 'Password field is required.'); return;
		} else if (this.state.confirm_password === '') {
			this.setError(true, 'Confirm Password field is required.'); return;
		} else if (this.state.password != this.state.confirm_password) {
			this.setError(true, 'Password and confirm password field is required.'); return;
		} else {
			this.setError(false, '');
			this.setState({ isSuccess: true, successMessage: '' });
		}
		
		const data = {
			token:this.props.match.params.token,
			password:this.state.password
		}
		this.setState({isLoading:true});
		this.props.resetPassword(data)
		.then((res) => {
			
			if (res.status_code == 404) {
				this.setState({isSuccess:false,successMessage:''});
				this.setError(true,res.message);
			} else {
				this.setState({isSuccess:true,successMessage:res.message,password:'',confirm_password:''});
			}
			this.setState({isLoading:false});
		})
		.catch((errors) => {
			console.log(errors);
		})
	}

	render() {
		if (this.props.auth.isAuthenticated) {
			return <Redirect to="/" />
		}
		return (
			<Fragment>
				<div class="panel-group">
					<div clasName="contact_form" style={{ marginLeft: '600px', marginTop: '50px' }}>
						<div class="container">
							<div class="row">
								<div class="col-lg-12">
									<div class="contact_form_title">Reset Password</div>
									{this.state.isError &&
										<div className="col-md-6 alert alert-danger">{this.state.errorMessage}</div>
									}
									{this.state.isSuccess &&
										<div className="col-md-6 alert alert-success">{this.state.successMessage}</div>
									}
									<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
										<input type="text" name="password" value={this.state.password} onChange={this.setInputValue} class="contact_form_name input_field" placeholder="New Password" />
									</div>
									<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
										<input type="text" name="confirm_password" value={this.state.confirm_password} onChange={this.setInputValue} class="contact_form_name input_field" placeholder="New Password" />
									</div>
									<div class="contact_form_button">
										<button type="button" onClick={this.passwordHandler} class="button contact_submit_button" disabled={this.state.isLoading}>Set Password</button>
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
		resetPassword: (userInfo) => dispatch(authActions.resetPassword(userInfo))
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

// https://www.youtube.com/watch?v=hojHabSBiZE