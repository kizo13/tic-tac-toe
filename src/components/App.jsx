import * as React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import LoadGame from './loadGame/LoadGame';
import Board from './board/Board';
import './App.scss';

const NoMatch = ({ location }) => (
  <div className="not-found">Page not found :(</div>
);

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact strict path="/" component={Home}/>
        <Route exact path="/load" component={LoadGame}/>
        <Route exact path="/board" component={Board}/>
        <Route path="*" component={NoMatch}/>
      </Switch>
    );
  }
}

export default withRouter(App);
