import React, { Component } from 'react';

import Search from '../components/Search';
import List from '../components/List';
import Player from '../components/Player';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <div className="player-controls">
          <List />
          <Player />
        </div>
        
      </div>
    );
  }
}

export default App;
