import * as React from 'react';
import { withRouter } from 'react-router-dom';

import './LoadGame.scss';

class LoadGame extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="load-game">Load games</div>
    )
  }
}

export default withRouter(LoadGame);
