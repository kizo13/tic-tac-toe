import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Cell from './cell/Cell';
import './Board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>{`${this.props.app.data.isPlayersTurn ? "Player" : "Computer"}'s turn`}</div>
        {this.props.app.data.winner.id && (
          <div>{this.props.app.data.winner.id === 0 ? "Player win" : "Computer wins"}</div>
        )}
        {this.props.app.board.id && (
          <div>{this.props.app.board.boardName}</div>
        )}

        <div className="board">
          {this.props.app.board.cells.map((c, idx) => <Cell key={idx} id={idx} value={c} />)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBoards: (nameSegment) => dispatch(apiActions.getBoards(nameSegment)),
//     emitChange: change => dispatch(formActions.changeForm(change))
//   };
// };

export default withRouter(connect(mapStateToProps, undefined)(Board));
