import { base_url } from '../../constant';
import  * as apiUrl from '../../constant/apiUrl';
import * as actions  from "../actions/actionsType";


export const signup = (user) => {
    return async dispatch => {
        try{
           const response = await fetch(`${base_url}/${apiUrl.userSignUp}`, {
               headers: {
                   'Content-Type': 'application/json',
                   //'Accepts': 'application/json'
               },
               method: 'POST',
               //body : user
               body: JSON.stringify({
                   first_name: user.first_name,
                   last_name: user.last_name,
                   email: user.email,
                   password: user.password,
                   mobile :user.mobile,
                   address:user.address
               })
           });
           const jsonResponse = await response.json();
           return jsonResponse;
        }catch(error){
            console.log(error);
        }
    }
}

export const authenticate = (email, password) => {
    return async dispatch => {
        const response = await fetch(`${base_url}/${apiUrl.userLogin}`, {
            headers: {
                'Content-Type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const jsonResponse = await response.json();
        if(response.status === 200) {
            window.localStorage.setItem('auth', JSON.stringify(jsonResponse.SUCCESS.data.token));

            dispatch({
                type: actions.AUTHENTICATE_USER,
                auth: jsonResponse.SUCCESS.data
            });
           
            return Promise.resolve(true);

        }

        return Promise.reject(jsonResponse);
    }
}

export const logout = () => {
    return dispatch => {
        const authData = window.localStorage.getItem('auth');
        if(authData){
            window.localStorage.clear();
            dispatch({
                type: actions.LOGOUT_USER,
                payload: ''
            });
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

export const getToken = () => {
    return dispatch => {
        const authData = window.localStorage.getItem('auth');
        if(authData){
            const auth = JSON.parse(authData);
            if(auth.hasOwnProperty('token') && auth.token !== '') {

                dispatch({
                    type: actions.AUTHENTICATE_USER,
                    auth: auth
                });

                return Promise.resolve(true);

            }
        }
        
        return Promise.resolve(false);
        
    }
}

export const forgotPassword = (email) => {
    return async dispatch => {
        try{
           const response = await fetch(`${base_url}/${apiUrl.forgotPassword}`, {
               headers: {
                   'Content-Type': 'application/json',
                   //'Accepts': 'application/json'
               },
               method: 'POST',
               body: JSON.stringify({
                   email: email,
               })
           });
           const jsonResponse = await response.json();
           return jsonResponse;
        }catch(error){
            console.log(error);
        }
    }
}

export const resetPassword = (userInfo) => {
    return async dispatch => {
        try{
           const response = await fetch(`${base_url}/${apiUrl.resetPassword}`, {
               headers: {
                   'Content-Type': 'application/json',
                   //'Accepts': 'application/json'
               },
               method: 'POST',
               body: JSON.stringify({
                   token: userInfo.token,
                   password:userInfo.password,
               })
           });
           const jsonResponse = await response.json();
           return jsonResponse;
        }catch(error){
            console.log(error);
        }
    }
}