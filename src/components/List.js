import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrenTrack } from '../actions';

class List extends Component {
    playTrack(id){
        let { dispatch } = this.props;
        
        dispatch(fetchCurrenTrack(id));
    }
    render(){
        const { tracks } = this.props;
        return (
            <div className="">
                <ul>
                    {
                        tracks.map(track => {
                            return (<li key={track.id} onClick={this.playTrack.bind(this, track.id)}>
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