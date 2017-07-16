import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrenTrack, onPause } from '../actions';

class List extends Component {
    playTrack(track){
        let { dispatch } = this.props;
        if (track.isPlaying) {
            dispatch(onPause());
        } else {
            dispatch(fetchCurrenTrack(track.id));
        }
        
    }
    render(){
        const { tracks } = this.props;
        return (
            <div className="">
                <ul>
                    {
                        tracks.map(track => {
                            return (<li key={track.id} onClick={this.playTrack.bind(this, track)}>
                                        { track.isPlaying ? '+' : '-' }
                                        {track.artist}
                                        -
                                        {track.title}
                                    </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tracks: state.tracks  
})

export default connect(mapStateToProps)(List);