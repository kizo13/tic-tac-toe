import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import appActions from '../../../actions/app.actions';

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
        <td>
          <button onClick={this.loadBoard.bind(this, this.props.id)}>load</button>
          <button onClick={this.deleteBoard.bind(this, this.props.id)}>delete</button>
        </td>
      </tr>
    );
  }

  loadBoard(id) {
    this.props.getBoard(id);
  }

  deleteBoard(id) {
    this.props.deleteBoard(id);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoard: (id) => dispatch(appActions.getBoardById(id)),
    deleteBoard: (id) => dispatch(appActions.deleteBoardById(id))
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(LoadTableRow));
