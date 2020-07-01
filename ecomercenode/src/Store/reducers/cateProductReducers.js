import * as  actions  from "../actions/actionsType";

const initState = {
    category: [],
    products : []
}

const cateProductReducers = (state = initState, action) => {    
     switch(action.type){ 
        case actions.FETCH_CATEGORY:
            state = {
                ...state,
                category : action.categories
            }
            break;
        case actions.FETCH_PRODUCT:
            state = {
                ...state,
                products : action.product
            }
            break;
        default:
            return state;
    }
    return state;
}

export default cateProductReducers;