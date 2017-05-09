import React, { Component } from 'react';

class Track extends Component {
    render(){
        let tracksTemplate;

        if (this.props.name) {
            tracksTemplate = <div>
                                <h2> Search track: {this.props.name} </h2>
                             </div>
        } else tracksTemplate = <h2> Enter track name </h2>
        return (
            <section>
                { tracksTemplate }
            </section>
        )
    }
}

export default Track;