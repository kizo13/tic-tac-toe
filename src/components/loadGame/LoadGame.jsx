import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import appActions from '../../actions/app.actions';
import formActions from '../../actions/form.actions';

import LoadTableRow from './loadTableRow/LoadTableRow';
import './LoadGame.scss';

class LoadGame extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBoards();
  }

  render() {
    return (
      <div className="load-game">
        <h1>
          <Link to="/" className="backlink">Back</Link>
          <span className="bold">Load</span> games
          {this.props.app.boards.isLoading && <div className="loading"><i className="fa-li fa fa-spinner fa-spin"></i></div>}
        </h1>

        <div className="filter">
          <input type="text"
            id="query"
            name="query"
            value={this.props.form.load.query}
            placeholder="Search board by name"
            onChange={this.changeQuery.bind(this)}
            onKeyPress={this.doSearch.bind(this)}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off" />
          <button onClick={this.searchBoards.bind(this)}><i className="fa fa-filter" aria-hidden="true"></i> Search</button>
        </div>

        {this.props.app.boards.data && (
          <React.Fragment>
            <table>
              <thead>
                <tr>
                  <th className="name">Name</th>
                  <th className="size">Size</th>
                  <th className="actions"></th>
                </tr>
              </thead>
              <tbody>
                {this.props.app.boards.data.map(b => <LoadTableRow key={b.id} id={b.id} name={b.boardName} size={b.boardSize} />)}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </div>
    );
  }

  mergeWithCurrentState(change) {
    return Object.assign({}, this.props.form.load, change);
  }

  changeQuery(evt) {
    const newState = this.mergeWithCurrentState({
      query: evt.target.value,
    });
    this.props.emitChange(newState);
  }

  doSearch(event) {
    const code = event.keyCode || event.which;
    if (code === 13) {
      this.searchBoards();
    } 
  }

  searchBoards() {
    this.props.getBoards(this.props.form.query);
  }
}


const mapStateToProps = (state) => ({
  app: state.app,
  form: state.form
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBoards: (nameSegment) => dispatch(appActions.getBoards(nameSegment)),
    emitChange: change => dispatch(formActions.changeForm('load', change))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadGame));
