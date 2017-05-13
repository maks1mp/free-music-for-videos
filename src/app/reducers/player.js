export default function(state = {
    currentTrack: null,
    traksIsPlaying: false
}, action){
    switch(action.type){
    case 'UPDATE_CURRENT_TRACK':
        return { ...state, currentTrack: action.payload };
    case 'PLAY':
        return { ...state, traksIsPlaying: true };
    case 'PAUSE':
        return { ...state, traksIsPlaying: false };
    default: return state;
    }
}