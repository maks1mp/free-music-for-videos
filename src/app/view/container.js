import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './search';
import Track from './track';
import List from './list';

class App extends Component {
  render() {
    let storeProps = this.props.state.main;
    return (
      <main>
        <Search search={ this.props.onSearch }/>
        <Track params={ storeProps.track_request } name={ storeProps.track_name }/>
        <List />
      </main>
    );
  }
}

export default connect(
  state => ({
    state
  }),
  dispatch => ({
    onSearch: (search_by) => {
      let track_name = search_by.length ? search_by[search_by.length-1] : '';

      dispatch({  
        type: 'SEARCH',
        payload: search_by
      });

      dispatch({
        type: 'UPDATE_TRACK_NAME',
        payload: track_name
      });
    }
  })
)(App);
