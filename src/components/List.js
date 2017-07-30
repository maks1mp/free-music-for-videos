import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrenTrack, onPause } from '../actions';

import '../static/list.css';
import playBtn from '../static/images/play.png';
import pauseBtn from '../static/images/pause.png';

class List extends Component {
    constructor(props){
        super(props);

        this.state = {
            touched: false
        }
    }

    playTrack(index){
        let { dispatch, currentTrack, tracks } = this.props;

        if (currentTrack){
            if (currentTrack.isPlaying && currentTrack.data.track_id === tracks[index].id) {
                dispatch(onPause(index));
            } else {
                dispatch(fetchCurrenTrack(tracks[index].id, index));
            }
        } else {
            dispatch(fetchCurrenTrack(tracks[index].id, index));
        }

        this.setState({touched: true});
    }
    isPlayingTrack(index){
        const { tracks, currentTrack } = this.props;
        if (currentTrack.data) {
            return index === currentTrack.index 
                   && currentTrack.isPlaying
                   && tracks.some(track => track.id === currentTrack.data.track_id);  
        }
        return false;
    }
     
    render(){
        const { tracks, currentTrack } = this.props,
            {touched} = this.state;

        return (
            <div className={touched ? "player-list player-list--short" : "player-list player-list--wide"}>
                <ul className={tracks.length === 0 ? 'player-list-items player-list--empty' : 'player-list-items player-list--full'}>
                    {
                        tracks.map((track, index) => {
                            return (<li key={track.id} 
                                        className="player-list-item"
                                        onClick={this.playTrack.bind(this, index)}>
                                        <div className="player-track">
                                            {this.isPlayingTrack(index)
                                                ? (
                                                    <span className="play-icon">
                                                        <img className="play-image" src={playBtn} alt=""/>
                                                    </span>
                                                )
                                                : (
                                                    <span className="pause-icon">
                                                        <img className="pause-image" src={pauseBtn} alt=""/>
                                                    </span>
                                                )
                                            }
                                            <div className="track-description">
                                                <h5 className="player-track-title">
                                                    {track.title}
                                                </h5>
                                                <p className="player-list-artist">
                                                    {track.artist}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="player-track-info">
                                            {/* <button className="show-info">
                                                info
                                            </button> */}
                                        </div>
                                    </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {tracks, currentTrack} = state;
    
    return {
        tracks,
        currentTrack
    }
     
}

export default connect(mapStateToProps)(List);