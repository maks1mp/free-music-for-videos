const API_KEY = `86MLL630E3X98X0D`;

let freeMusicApi = {
	request: {
		url:'https://freemusicarchive.org/api/get/',
		format: 'json',
		params: {
			api_key: API_KEY,
		}
	},
	parseParams: {
		artist: {
			start: '[',
			end: ']',
		},
		id: { 
			start: '(',
			end: ')',
		},
		track: {
			start: ']',
			end: '('
		}
	},
	toStringParams(params){
		params = params || this.request.params || ({});

		let paramsKeys = Object.keys(params);

		return paramsKeys.map((key, index)=>  `${key}=${params[key]}`  ).join('&');

	},
	getTrack(track_id){
		return `http://freemusicarchive.org/services/track/single/${track_id}.json?api_key=${API_KEY}`
	},
	createRequestUrl(dataset, params){
		return `${this.request.url}${dataset}.${this.request.format}?${this.toStringParams(this.addParams(params))}`;
	},
	addParams(params){
		return { ...params , ...this.request.params };
	},
	searchTrack(trackParams, limit=20){
		return `https://freemusicarchive.org/api/trackSearch?q=${trackParams}&limit=${limit}`
	},
	getTrackParam(text, field){
		let method = this.parseParams[field];

		let indexStart = text.lastIndexOf(method.start)+1,
			indexEnd = text.lastIndexOf(method.end);

		return text.slice(indexStart, indexEnd);
	},
	parseTracksList(arr){
		return arr.map(item => {
			let parseParam = this.getTrackParam.bind(this, item);
			return {
				artist: parseParam('artist'),
				id: parseParam('id'),
				title: parseParam('track')
			}
			
		})
	}
}

export default freeMusicApi; 