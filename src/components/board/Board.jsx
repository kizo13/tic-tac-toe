import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as classNames from 'classnames';
import appActions from '../../actions/app.actions';
import formActions from '../../actions/form.actions';

import Cell from './cell/Cell';
import './Board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board">
      {/* TODO: if board.id --> update instead of create */}
        <div className={classNames('modal', { 'open': this.props.app.data.showBoardModal })}>
          <input type="text"
            id="name"
            name="name"
            value={this.props.form.board.name}
            placeholder="Add board name"
            onChange={this.changeQuery.bind(this)}
            onKeyPress={this.doSave.bind(this)}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off" />
          <button onClick={this.saveBoard.bind(this)}>Save</button>
          <button onClick={this.showModal.bind(this)}>Cancel</button>
        </div>
        <div>{`${this.props.app.data.isPlayersTurn ? "Player" : "Computer"}'s turn`}</div>
        {this.props.app.data.winner.id !== null && (
          <div>{this.props.app.data.winner.id === 0 ? "Player win" : this.props.app.data.winner.id === 1 ? "Computer wins" : "It's a draw"}</div>
          )}
        {this.props.app.board.id && (
          <div>{this.props.app.board.boardName}</div>
          )}

        <Link to="/" className="button">Main screen</Link>
        <button onClick={this.clearBoard.bind(this)}>New</button>
        <Link to="/load" className="button">Load game</Link>
        <button className="button" onClick={this.showModal.bind(this)} disabled={!this.isBoardValid()}>Save game</button>

        <div className="board">
          {this.props.app.board.cells.map((c, idx) => <Cell key={idx} id={idx} value={c} />)}
        </div>
      </div>
    );
  }

  clearBoard() {
    this.props.clearBoard();
  }

  isBoardValid() {
    return this.props.app.board.cells.some(c => c === 0) && this.props.app.board.cells.some(c => c === 1);
  }

  showModal() {
    this.props.showModal(!this.props.app.data.showBoardModal);
  }

  mergeWithCurrentState(change) {
    return Object.assign({}, this.props.form.board, change);
  }

  changeQuery(evt) {
    const newState = this.mergeWithCurrentState({
      name: evt.target.value,
    });
    this.props.emitChange(newState);
  }

  doSave(event) {
    const code = event.keyCode || event.which;
    if (code === 13) {
      this.saveBoard();
    } 
  }

  saveBoard() {
    this.props.saveBoard(this.props.form.board.name, this.props.app.board.cells);
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
  form: state.form
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearBoard: () => dispatch(appActions.clearBoard()),
    saveBoard: (name, board) => dispatch(appActions.saveBoard(name, board)),
    showModal: (isVisible) => dispatch(appActions.showModal(isVisible)),
    emitChange: (change) => dispatch(formActions.changeForm('board', change))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
