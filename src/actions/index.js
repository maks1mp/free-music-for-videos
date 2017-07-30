import API from '../api';

export const onSearchTrack = (searchValue) => ({
    type: 'SEARCH_NEW_TRACK',
    searchValue 
});

export const successFetchingTracks = (tracks) => ({
    type: 'UPDATE_TRACKS_LIST',
    tracks
});

export const next = index => ({
    type: 'PLAY_NEXT',
    index
});

export const prev = index => ({
    type: 'PLAY_PREV',
    index
});

export const clearTracksList = () => ({
    type: 'CLEAR_TRACKS_LIST'
});

export const startFetch = title => dispatch => {
    API.getTracks(title).then(tracks => {
        dispatch(successFetchingTracks(tracks));
    });
};

export const onStartPlay = (track, index) => ({
    type: 'ON_START_PLAY',
    track,
    index
});

export const onPause = index => ({
    type: 'ON_STOP_PLAY',
    index
});

export const fetchCurrenTrack = (id, index) => dispatch => {
    API.getSingleTrack(id).then(track => {
        dispatch(onStartPlay(track, index));
    });
};
