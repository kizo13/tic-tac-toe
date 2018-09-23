import * as React from 'react';
import { withRouter } from 'react-router-dom';

import './LoadTableRow.scss';

class LoadTableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.size}</td>
      </tr>
    );
  }
}

export default withRouter(LoadTableRow);
