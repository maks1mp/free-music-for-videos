const defaultState = {
    search: '',
    tracks: [],
    currentTrack: {
        isPlaying: false,
        data: null
    }
}

const rootReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SEARCH_NEW_TRACK': return { ...state, search: action.searchValue } 
        case 'UPDATE_TRACKS_LIST': return { ...state, tracks: action.tracks }
        case 'CLEAR_TRACKS_LIST': return { ...state, tracks: [] } 
        case 'ON_START_PLAY': return { ...state, currentTrack: {
                                                    isPlaying: true,
                                                    data: action.track                                  
                                                }
                                     }
        case 'ON_STOP_PLAY': return { ...state, currentTrack: {
                                                    ...state.currentTrack,
                                                    isPlaying: false
                                                } 
                                    }
        default: return state;
    }
}

export default rootReducer;
