import React, {Fragment} from 'react';
import {Link,Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

class checkOut extends React.Component {
    constructor(props){
        super(props);
    }
  

    render() {
        
        if(!this.props.auth.isAuthenticated){
            return <Redirect to="/login" />
        }

    return (
        <Fragment>
            
    <div class="panel-group">
     <div clasName="contact_form">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
						<div class="contact_form_title" style={{marginLeft:'500px',marginTop:'50px'}}>Checkout</div>
						<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
							<input type="text" id="form_name" class="contact_form_name input_field" placeholder="First Name" />
							<input type="text" id="form_email" class="contact_form_email input_field" placeholder="Last Name" />
							<input type="text" id="form_phone" class="contact_form_phone input_field" placeholder="Email-id" />
							 
						</div>
						<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
							<input type="text" id="form_mobile" class="contact_form_name input_field" placeholder="Mobile-no" />
							<input type="text" id="form_address" class="contact_form_email input_field" placeholder="Address" required="required" />
							<input type="password" id="form_password" class="contact_form_email input_field" placeholder="Password" />
						</div>
						<div class="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
							<input type="password" id="form_confirm_password" class="contact_form_name input_field" placeholder="Confirm Password" />
						</div>
						<div class="contact_form_button">
							<button type="button" class="button contact_submit_button">Sign Up</button>
							<Link to={'login'} class="btn">Login</Link>
						</div>

					</div>
			</div>
		</div>
		<div class="panel"></div>
	</div>
	</div>	
        </Fragment>
    )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart : state.cart
    }
}

export default connect(mapStateToProps)(checkOut);