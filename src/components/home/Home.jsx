import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <h1><span className="bold">Tic</span> <span className="regular">Tac</span> Toe</h1>
        <div className="menu">
          <Link to="/board">New game</Link>
          <Link to="/load">Load game</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
