import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
    render(){
        console.log(this.props);
        return (
            <div className="player">
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentTrack: state.currentTrack
})

export default connect(mapStateToProps)(Player);