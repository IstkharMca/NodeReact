import { base_url } from "../../constant/index";
import * as apiUrl from '../../constant/apiUrl';
import * as actions from '../actions/actionsType';

export const addToCart = (token, cartItem) => {
    return async dispatch => {
        try{
            const response = await fetch(`${base_url}/${apiUrl.addtocart}`, {
                headers: {
                    'Content-Type': 'application/json',
                    //'auth-token': token
                },
                body: JSON.stringify(cartItem),
                method: 'POST'
            });
            const jsonResposne = await response.json();
            if(response.status === 201){
                dispatch({
                    type: actions.ADD_TO_CART,
                    cartItem: cartItem
                });
            }

            return jsonResposne;
        }catch(error){
            console.log(error);
        }
    }
}

export const getCartItems = (token, userId) => {
    return async dispatch => {

        try{

            const response = await fetch(`${base_url}/${apiUrl.cartItem}/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    //'auth-token': token
                },
                method: 'GET'
            });

            const jsonResposne = await response.json();
            if(response.status === 200){
                dispatch({
                    type: actions.GET_CART_DETAILS,
                    cartItems: jsonResposne.message[0]
                });
            }

            return jsonResposne.message[0];

        }catch(error){
            console.log(error);
        }
        
    }
}

export const updateCart = (token, userId, product) => {
    return async dispatch => {
        try{

            const response = await fetch(`${base_url}/cart/update/quantity`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'PUT',
                body: JSON.stringify({
                    userId: userId,
                    productId: product.productId,
                    quantity: product.quantity,
                    total: product.total
                })
            });
            const jsonResposne = await response.json();

            if(response.status === 201){
                dispatch({
                    type: actions.UPDATE_CART,
                    item: product
                });
            }

            return jsonResposne.message;


        }catch(error){
            console.log(error);
        }
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: actions.CLEAR_CART,
            payload: null
        });
    }
}