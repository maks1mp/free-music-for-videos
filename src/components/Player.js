import React, { Component } from 'react';
import { connect } from 'react-redux';



class Player extends Component {
    componentDidUpdate(){
        this.updatePlayerState();
    }
    updatePlayerState(){
        const { data, isPlaying } = this.props.track;
        if (!!this.audio_player) {
            isPlaying ? this.audio_player.play() : this.audio_player.pause();
        }
    }
    render(){
        const { track } = this.props,
              { isPlaying } = track;

        let playerTemplate = '';
        if  (track.data) playerTemplate = <div>
                                            <audio src={track.data.track_listen_url}
                                                   ref={(el)=> { this.audio_player = el } }
                                            >
                                            </audio>
                                            <div>
                                                <button>
                                                    prev
                                                </button>
                                                <strong>{ isPlaying ? 'PAUSE' : 'PLAY' }</strong>
                                                <button>
                                                    next
                                                </button>
                                            </div>
                                          </div>
        return (
            <div className="player">
                { playerTemplate }                
            </div>
        )
    }
}

const mapStateToProps = state => {
    
    let trackInListIndex = -1, 
        trackInList = null;

    if (state.currentTrack.data){
        trackInList = state.tracks.find((track, index) => { 
            if (track.id === state.currentTrack.data.track_id) {
                trackInListIndex = index;
                return true;
            }
            return false;
        });
    }

    return {
        track: state.currentTrack,
        index: trackInListIndex,
        params: trackInList,
        tracks_q: state.tracks.length
    }
}

export default connect(mapStateToProps)(Player);