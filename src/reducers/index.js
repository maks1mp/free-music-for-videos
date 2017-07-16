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
                                                },
                                                tracks: state.tracks.map(track => ({
                                                    ...track,
                                                    isPlaying: action.track.track_id === track.id
                                                }))
                                     }
        case 'ON_STOP_PLAY': return { ...state, currentTrack: {
                                                    ...state.currentTrack,
                                                    isPlaying: false
                                                },
                                                tracks: state.tracks.map(track => ({
                                                    ...track,
                                                    isPlaying: false
                                                }))

                                    }
        default: return state;
    }
}

export default rootReducer;
