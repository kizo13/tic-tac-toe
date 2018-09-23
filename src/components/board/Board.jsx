import * as React from 'react';
import { withRouter } from 'react-router-dom';

import './Board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board">Board</div>
    );
  }
}

export default withRouter(Board);
