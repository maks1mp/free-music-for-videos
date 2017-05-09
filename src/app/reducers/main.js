const deafultState = {
    track_request: [],
    track_name: null
};

export default function(state = deafultState, action){
    switch(action.type){
    case 'SEARCH':
        return { ...state, track_request: action.payload }; 
    case 'UPDATE_TRACK_NAME':
        return { ...state, track_name: action.payload }; 
    default:
        return state;
    }
}