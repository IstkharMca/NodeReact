
const reducer = (state = {}, {type, payload = null}) => {
    switch (type) {
        case 'persist/REHYDRATE':
            return persist(state, payload);
        default:
            return state
    }
};

function persist(state, payload) {
    console.log('persis');
    console.log(payload);
    console.log('end persisi');
    state = Object.assign({}, state,payload);
    return state;
}

export default reducer