import React, { Component } from 'react';

import Search from '../components/Search';
import List from '../components/List';
import Player from '../components/Player';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <List />
        <Player />
      </div>
    );
  }
}

export default App;
