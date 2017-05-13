import React, { Component } from 'react';

class Player extends Component {
    render(){
        let { track } = this.props;
        console.log('render');
        return (
            <section>
                { track ? 
                <section>
                    Title: {track.track_handle};
                    
                    <audio controls>
                            <source src={track.track_listen_url} type="audio/mp3" />
                    </audio>
                    
                </section> : 
                <div> Nothing to play </div> }
            </section>
        )
    }
}

export default Player;