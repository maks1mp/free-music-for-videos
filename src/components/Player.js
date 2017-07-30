import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onPause, onStartPlay, fetchCurrenTrack } from '../actions';

import '../static/player.css';

const makeDouble = count => parseFloat(count) < 10 ? '0' + count : count;

const modifyTime = time => { 
    let seconds = 0,
        minutes = 0;
    
    if (time >= 60) {
        minutes = Math.floor(time/60);
        seconds = Math.floor(time - minutes*60)
    } else {
        seconds = Math.floor(time);
    }
    
    return {
        seconds: makeDouble(seconds) || '00',
        minutes: makeDouble(minutes) || '00'
    }
};

class Player extends Component {
    constructor(props){
        super(props);

        this.state = {
            minutes: '00',
            seconds: '00',
            minutesLength: '00',
            secondsLength: '00'
        }
    }
    componentDidUpdate(){
        this.updatePlayerState();
    }
    updatePlayerState(){
        const {trackData, isPlaying} = this.props;
        if (trackData && !!this.audio_player) {
            isPlaying ? this.play() : this.pause();
        }
    }
    isInPlaylist(){
        const {trackData, tracks} = this.props;

        return tracks.some(track => track.id === trackData.track_id)
    }
    play(){
        const player = this.audio_player;
        
        player.ontimeupdate = e => {
            const playerControl = e.target,
                  {currentTime} = playerControl,
                  {seconds, minutes} = modifyTime(currentTime),
                  {minutes: minutesLength,seconds: secondsLength} = modifyTime(playerControl.duration);

            if (!playerControl.ended) {
                this.setState({
                    minutes,
                    seconds,
                    minutesLength,
                    secondsLength
                })
            } else {
                this.next();
            }
        };

        player.play();
    }
    pause(){
        this.audio_player.pause();
    }
    next(){
        const inPlaylist = this.isInPlaylist(),
            {dispatch, index, tracks_q, tracks} = this.props;
        let nextTrackIndex = index + 1;

        if (tracks_q === nextTrackIndex || !inPlaylist) {
            nextTrackIndex = 0;
        }

        dispatch(fetchCurrenTrack(tracks[nextTrackIndex].id, nextTrackIndex));
    }
    prev(){
        const inPlaylist = this.isInPlaylist(),
            {dispatch, index, tracks_q, tracks} = this.props;
        let prevIndex = index - 1;

        if (prevIndex < 0 || !inPlaylist) {
            prevIndex = tracks_q - 1;
        }
        dispatch(fetchCurrenTrack(tracks[prevIndex].id, prevIndex));
    }
    togglePlayerState(){
        const {isPlaying, index, dispatch, trackData} = this.props;
        
        if (isPlaying) {
            dispatch(onPause(index));
        } else {
            dispatch(onStartPlay(trackData, index));
        }
    }
    getTrackBar(){
        const {minutes, seconds, minutesLength, secondsLength} = this.state;
        return Math.round(((minutes * 60 + seconds) * 100 / (minutesLength * 60 + secondsLength)).toFixed(0)) || 0;
    }
    render(){
        const { trackData: track, isPlaying, tracks_q } = this.props,
            {minutes, seconds, minutesLength, secondsLength} = this.state;
        let playerTemplate = ''

        // console.log(track);

        if  (track) { 
            playerTemplate = <div className="player-control">
                                <audio src={track.track_listen_url}
                                       ref={instance => { this.audio_player = instance } }>
                                </audio>
                                <div className="player-control-tracks">
                                    <img className="track-image" src={track.track_image_file} alt=""/>
                                    <div className="buttons-panel">
                                        <button className={tracks_q === 0 ? 'disabled': 'enabled'} onClick={this.prev.bind(this)}>
                                            prev
                                        </button>
                                        <strong onClick={this.togglePlayerState.bind(this)}>{ 
                                            isPlaying ? 'PAUSE' : 'PLAY' }
                                        </strong>
                                        <button className={tracks_q === 0 ? 'disabled': 'enabled'} onClick={this.next.bind(this)}>
                                            next
                                        </button>
                                    </div>
                                    
                                    <div className="tracker">
                                        <div>
                                            <h1>
                                                {minutes}:{seconds} 
                                                / 
                                                {minutesLength}:{secondsLength}
                                            </h1>
                                            <h2>{this.getTrackBar()}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
        }
        return (
            <div className="player">
                { playerTemplate }                
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {currentTrack: {data, index, isPlaying}} = state
    return {
        trackData: data,
        isPlaying,
        index,
        tracks_q: state.tracks.length,
        tracks: state.tracks
    }
}

export default connect(mapStateToProps)(Player);