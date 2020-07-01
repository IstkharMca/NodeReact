import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link,Redirect } from 'react-router-dom';
import * as authActions from '../../Store/actions/authActions';


class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			isError: false,
			errorMessage: '',
			isSuccess: false,
			successMessage: ''
		}
	}
	componentDidMount() {
		console.log('props');
		console.log(this.props);
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
		const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
		if (this.state.email === '') {
			this.setError(true, 'Email-id is required'); return;
		}
		else if (!emailPattern.test(this.state.email)) {
			this.setError(true, 'Invalid Email Address'); return;
		} else {
			this.setError(false, '');
			this.setState({ isSuccess: true, successMessage: ''});
		}

		this.props.forgotPassword(this.state.email)
		.then((response) => {
			if (response.status_code == 404) {
				this.setState({isSuccess:false,successMessage:''});
				this.setError(true,response.message);
			} else {
				this.setState({isSuccess:true,successMessage:response.message,email:''});
			}
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
									<div class="contact_form_title">Forgot Password</div>
									{this.state.isError &&
										<div className="col-md-6 alert alert-danger">{this.state.errorMessage}</div>
									}

									{this.state.isSuccess &&
										<div className="col-md-6 alert alert-success">{this.state.successMessage}</div>
									}
									<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
										<input type="text" name="email" value={this.state.email} onChange={this.setInputValue} class="contact_form_name input_field" placeholder="Email-id" required="required" />
									</div>
									<div class="contact_form_button">
										<button type="button" onClick={this.passwordHandler} class="button contact_submit_button">Recovery Password</button>
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
		forgotPassword: (email) => dispatch(authActions.forgotPassword(email))
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);