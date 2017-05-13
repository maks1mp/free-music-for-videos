const deafultState = {
    track_name: null,
    tracks_list: [],
};

export default function(state = deafultState, action){
    switch(action.type){
    case 'UPDATE_TRACK_NAME':
        return { ...state, track_name: action.payload }; 
    case 'UPDATE_TRACKS_LIST':
        return { ...state, tracks_list: action.payload }; 
    default:
        return state;
    }
}