import fetch from 'node-fetch';
import freeMusicApi from './../api/index';
import { store } from './../store/index';
import { debounce } from './../utils/utils';

let dispatch = store.dispatch.bind(store);

export const play = () => {
	return {
		type: 'PLAY'
	}
}

export const pause = () => {
	return {
		type: 'PAUSE'
	}
}

export const updateTrackName = (name) => {
	return {
       type: 'UPDATE_TRACK_NAME',
       payload: name
    }
}

export const updateTracksList = data => {
     return {
     	type: 'UPDATE_TRACKS_LIST',
		payload : data
    }
}

export const preloadTracksList = () => {
     return {
     	type: 'GETTING_TRACK_LIST',
    }
}

export const updateCurrentTrackData = track => {
    return {
    	type: 'UPDATE_CURRENT_TRACK',
    	payload: track 
	}
}

export const getTracks = search => {
		console.log(search);
		dispatch(updateTrackName(search));
		if (search) {
			dispatch(preloadTracksList());
			let url = freeMusicApi.searchTrack(search);

			fetch(url)  
				.then(res => res.json())
				.then(res => freeMusicApi.parseTracksList(res.aRows))
				.then(tracks => dispatch(updateTracksList(tracks)))
				.catch(e => console.log(e));

  		} else {
  			dispatch(updateTracksList([]));
  		}
} 

export const getTrack = track => {
		
		let  { id } = track,
			 url = freeMusicApi.getTrack(id);

		fetch(url).then(res => res.json())
				  .then(res => dispatch(updateCurrentTrackData(res)))
				  .catch(e => console.log(e));
	
}
