import React, { Component } from 'react';
import { getTrack } from './../actions/actions';

class List extends Component {
    render(){
        return (
            <ul>
                {this.props.tracksList.map((track, index)=> <li key={index} onClick={ this.props.onPlay.bind(this, track) }> Artist: {track.artist}, Track Name: {track.title}, Track id {track.id}   </li> )}
            </ul>
        )
    }
}

export default List;