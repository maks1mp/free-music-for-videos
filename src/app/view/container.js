import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { debounce } from './../utils/utils';

import Search from './search';
import Track from './track';
import List from './list';
import Player from './player';

import { getTracks } from './../actions/actions';

class App extends Component {
  
  render() {
    let storeProps = this.props.main;
    return (
      <main>
        <Search search={ this.props.onSearch }/>
        <Track params={ storeProps.track_request } name={ storeProps.track_name }/>
        <Player />
        <List tracksList={storeProps.tracks_list} onPlay={ this.props.onPlay }/>
      </main>
    );
  }
}

export default connect(
  state => ({
    ...state
  }),
  dispatch => ({
    onSearch: (search_by) => {
      dispatch({
        type: 'UPDATE_TRACK_NAME',
        payload: search_by
      });
      if (search_by && search_by !== ' ') { 
        getTracks(search_by, (data)=> dispatch({
          type: 'UPDATE_TRACKS_LIST',
          payload : data
        }));
      } else dispatch({
        type: 'UPDATE_TRACKS_LIST',
        payload : []
      }) 
    },
    gettingTracksList:() => {
      dispatch({
        type: 'UPLOADING_TRACKS_LIST'
      });
    },
    onPlay(track){
      dispatch({
        type: 'UPDATE_CURRENT_TRACK',
        payload: track 
      });

      // dispatch({
      //   type: 'UPDATE_CURRENT_TRACK', 
      // });
    }
  })
)(App);
