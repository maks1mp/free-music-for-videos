import fetch from 'node-fetch';

const API_KEY = `86MLL630E3X98X0D`;

export default {
    getTracks(title, limit = 20){
        return fetch(`https://freemusicarchive.org/api/trackSearch?q=${title}&limit=${limit}&api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => data.aRows.map(item => {
                        let indexOfArtist = item.indexOf(']'),
                            indexOfId = item.lastIndexOf('(');

                        let artist = item.slice(1, indexOfArtist),
                            id = item.slice(indexOfId + 1, -1),
                            title = item.slice(indexOfArtist + 1, indexOfId);

                        return {
                            artist,
                            id,
                            title
                        }
                    }))
    },
    getSingleTrack(id){
        return fetch(`http://freemusicarchive.org/services/track/single/${id}.json?api_key=${API_KEY}`)
                .then(response => response.json())
    }
}