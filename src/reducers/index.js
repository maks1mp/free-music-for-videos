const defaultState = {
    search: '',
    tracks: [],
    currentTrack: {
        isPlaying: false,
        data: null,
        index: null
    }
}

const rootReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SEARCH_NEW_TRACK': return { ...state, search: action.searchValue } 
        case 'UPDATE_TRACKS_LIST': return { ...state, tracks: action.tracks, showInList: true }
        case 'CLEAR_TRACKS_LIST': return { ...state, tracks: [] } 
        case 'ON_START_PLAY': return {...state, 
                                        currentTrack: {
                                            isPlaying: true,
                                            data: action.track,
                                            index: action.index                                
                                        },
                                        showInList: true
                                     }
        case 'ON_STOP_PLAY': return { ...state, 
                                        currentTrack: {
                                            ...state.currentTrack,
                                            index: action.index,
                                            isPlaying: false
                                        },
                                        showInList: true
                                    };
        default: return state;
    }
}

export default rootReducer;
