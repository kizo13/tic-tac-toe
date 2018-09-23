import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as classNames from 'classnames';
import appActions from '../../../actions/app.actions';

import './Cell.scss';

class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={classNames('cell', { 'cell-user': this.props.value === 0, 'cell-computer': this.props.value === 1 })}
        onClick={this.handleClick.bind(this, this.props.id)}>
      </div>
    );
  }

  handleClick(id) {
    if (this.props.value !== null || !this.props.app.data.isPlayersTurn) {
      return;
    }
    this.props.selectCell(id, this.props.app.data.isPlayersTurn);
  }
}

const mapStateToProps = (state) => ({
  app: state.app
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectCell: (id, isPlayersTurn) => dispatch(appActions.selectCell(id, isPlayersTurn))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cell));
