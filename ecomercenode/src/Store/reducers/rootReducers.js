import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import catePrductReducers from '../reducers/cateProductReducers';
import cartReducers from '../reducers/cartReducers'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import reduxReset from 'redux-reset'
import persist from '../reducers/persistStore';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}

const rootReducers = combineReducers({
    auth : authReducer,persist,
    categoryProduct : catePrductReducers,
    cart: cartReducers
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk),
        reduxReset()
    )
);


persistStore(store);
export default store;