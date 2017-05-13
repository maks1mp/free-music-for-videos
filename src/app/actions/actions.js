import fetch from 'node-fetch';
import freeMusicApi from './../api/index';

export const getTracks = (search, dispatch) => {
	let url = freeMusicApi.searchTrack(search);
	fetch(url).then(res => res.json())
			  .then(res => freeMusicApi.parseTracksList(res.aRows))
			  .then(tracks => dispatch(tracks))
			  .catch(e => console.log(e));

};

export const getTrack = (track, dispatch) => {
	let  { id } = track,
		 url = freeMusicApi.getTrack(id);

	fetch(url).then(res => res.json())
			  .then(res => dispatch(res))
			  .catch(e => console.log(e));
} 