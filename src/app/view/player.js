import React, { Component } from 'react';
import './../static/css/main.css';

import playImg from './../static/img/play-btn.ico';
import pauseImg from './../static/img/pause-ico.png';
import nextTrack from './../static/img/btn-player-prev.png';
import prevTrack from './../static/img/btn-player-next.png';

import preloader from './../static/img/preloader.gif';
import { play, pause } from './../actions/actions';


class Player extends Component {
    setPlayerState(action){
        if ('track_title' in this.props.track) {
            this.props.changePlayerState(action);    
        }
    }
    render(){
        console.log(this.props)
        let { track, playerState, changePlayerState } = this.props;

        let btnToShow = !playerState ?  <button className="start-play btn-control" onClick={this.setPlayerState.bind(this, play)}>
                                        <img src={playImg} alt="" />
                                    </button> : 
                                    <button className="stop-play btn-control" onClick={this.setPlayerState.bind(this, pause)}>
                                        <img src={pauseImg} alt="" />
                                    </button>

        return (
            <section>
                <div className="player">
                    <div className="player-wrapper">
                        <div className="player-screen">
                            <img className="track-preview" src={track.track_image_file || preloader} alt=""/>
                            <div className="player-controls">
                                <button className="btn-control"> 
                                    <img src={nextTrack} alt="" />
                                </button>
                                <div className="play-section">
                                    { btnToShow }               
                                </div>
                                <button className="btn-control"> 
                                    <img src={prevTrack} alt="" />
                                </button>

                            </div>
                            <p className="track-name">
                                <span>
                                    {track.track_title || ''}
                                </span>
                            </p>
                            <div className="track-progress">
                                
                            </div>
                        </div>
                    </div>
                </div>;
            </section>
        )
    }
}

export default Player;