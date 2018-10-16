import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import AdminOverview from './components/Overview/AdminOverview'
import UserOverview from './components/Overview/UserOverview'
import Calendar from './components/Calendar/Calendar'
import Home from './components/Home/Home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAdmin = false,
      isUser = false
    }
  }
  render() {
    return (
      <HashRouter >
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='' component={} />
          if (isAdmin) {
            <div>
              <Route path='/overview' component={AdminOverview} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/store' component={Store} />
            </div>
          } else if (isUser) {
            <div>
              <Route path='/overview' component={UserOverview} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/store' component={Store} />
            </div>
          }
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
