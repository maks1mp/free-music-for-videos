import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { debounce } from './../utils/utils';

import Search from './search';
import Track from './track';
import List from './list';
import Player from './player';
import { getTracks, getTrack } from './../actions/actions';

class App extends Component {
  render() {
    let storeProps = this.props.main,
        { player } = this.props;

    return (
      <main>
        <Search search={  getTracks }/>
        <Track name={ storeProps.track_name }/>
        <Player track={ player.currentTrack } playerState={player.traksIsPlaying} changePlayerState={this.props.onChangePlayerState}/>
        <List tracksList={storeProps.tracks_list} onPlay={ getTrack }/>
      </main>
    );
  }
}




export default connect(
  state => ({
    ...state
  }),
  dispatch => ({
    onChangePlayerState(actionCreator){
      dispatch(actionCreator());
    }
  })
)(App);
