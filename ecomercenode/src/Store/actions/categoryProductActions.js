import { base_url } from '../../constant';
import  * as apiUrl from '../../constant/apiUrl';
import * as actions  from "../actions/actionsType";

export const getCategories = () => {
    
    return dispatch => {
        fetch(`${base_url}/${apiUrl.categories}`, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            dispatch({
                type: actions.FETCH_CATEGORY,
                categories: jsonResponse.SUCCESS.categories
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const getProducts = () => {
    
    return dispatch => {
        fetch(`${base_url}/${apiUrl.products}`, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            dispatch({
                type: actions.FETCH_PRODUCT,
                product: jsonResponse.SUCCESS.products
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}