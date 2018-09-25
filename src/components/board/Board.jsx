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
        <div className={classNames('modal', { 'open': this.props.app.data.showBoardModal })}>
          <h1><span className="bold">Save</span> board</h1>
          <div className="action-panel">
            {!this.props.app.board.isValid && <div className="validation">The <span className="bold">name of the board</span> cannot be longer than 50 characters, and cannot contain space character</div>}
            <input type="text"
              className={classNames({ 'invalid': !this.props.app.board.isValid })}
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
        </div>

        <div className={classNames('error', { 'open': this.props.app.data.showError })}>{this.props.app.data.errorMessage}</div>
        
        <h1>
          <Link to="/" className="backlink">Back</Link>
          {this.props.app.data.isPlayersTurn ? <React.Fragment>It's <span className="bold">your</span> move</React.Fragment> : <React.Fragment><span className="bold">Computer</span> moves</React.Fragment>}
          {this.props.app.board.isLoading && <div className="loading"><i className="fa-li fa fa-spinner fa-spin"></i></div>}
          {this.props.app.board.id && <span className="board-name"><i className="fa fa-table" aria-hidden="true"></i> {this.props.app.board.boardName}</span>}
        </h1>

        <div className="action-panel">
          <button onClick={this.clearBoard.bind(this)}><i className="fa fa-star" aria-hidden="true"></i> New game</button>
          <button onClick={this.gotoLoad.bind(this)}><i className="fa fa-download" aria-hidden="true"></i> Load game</button>
          <button onClick={this.showModal.bind(this)} disabled={!this.isBoardValid()}>
            <i className="fa fa-floppy-o" aria-hidden="true"></i> {this.props.app.board.id ? "Update" : "Save"} game
          </button>
        </div>
        
        {this.props.app.data.winner.id !== null && (
          <div>{this.props.app.data.winner.id === 0 ? "Player win" : this.props.app.data.winner.id === 1 ? "Computer wins" : "It's a draw"}</div>
        )}

        <div className="map">
          {this.props.app.board.cells.map((c, idx) => <Cell key={idx} id={idx} value={c} />)}
        </div>
      </div>
    );
  }

  gotoLoad() {
    this.props.history.push('/load');
  }

  clearBoard() {
    this.props.clearBoard();
  }

  isBoardValid() {
    return this.props.app.board.cells.some(c => c === 0) && this.props.app.board.cells.some(c => c === 1);
  }

  showModal() {
    if (this.props.app.board.id) {
      this.props.updateBoard(this.props.app.board.id);
    } else {
      this.props.showModal(!this.props.app.data.showBoardModal);
    }
  }

  mergeWithCurrentState(change) {
    return Object.assign({}, this.props.form.board, change);
  }

  changeQuery(evt) {
    const newState = this.mergeWithCurrentState({
      name: evt.target.value,
    });
    this.props.emitChange(newState);
    this.props.setBoardValidity(evt.target.value);
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
    updateBoard: (id, board) => dispatch(appActions.updateBoard(id)),
    showModal: (isVisible) => dispatch(appActions.showModal(isVisible)),
    emitChange: (change) => dispatch(formActions.changeForm('board', change)),
    setBoardValidity: (name) => dispatch(appActions.setBoardValidity(name))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
