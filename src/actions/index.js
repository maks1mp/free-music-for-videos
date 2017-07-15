import API from '../api';

export const onSearchTrack = (searchValue) => ({
    type: 'SEARCH_NEW_TRACK',
    searchValue 
});

export const successFetchingTracks = tracks => ({
    type: 'UPDATE_TRACKS_LIST',
    tracks
});

export const clearTracksList = () => ({
    type: 'CLEAR_TRACKS_LIST'
});

export const startFetch = title => dispatch => {
    API.getTracks(title).then(tracks => {
        dispatch(successFetchingTracks(tracks));
    });
};

export const onStartPlay = track => ({
    type: 'ON_START_PLAY',
    track
});

export const onPause = () => ({
    type: 'ON_STOP_PLAY'
});

export const fetchCurrenTrack = id => dispatch => {
    API.getSingleTrack(id).then(track => {
        dispatch(onStartPlay(track));
    });
};
