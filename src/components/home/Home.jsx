import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu">
        <Link to="/board">New game</Link>
        <Link to="/load">Load game</Link>
      </div>
    );
  }
}

export default withRouter(Home);
