import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import AdminOverview from './components/Overview/AdminOverview'
import UserOverview from './components/Overview/UserOverview'
import Calendar from './components/Calendar/Calendar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Nav from './components/Nav/Nav'
import Store from './components/Store/Store'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAdmin: false,
      isUser: true
    }
  }
  render() {
    return (
      <HashRouter >
        <div>
          <Nav isAdmin={this.state.isAdmin} isUser={this.state.isUser} />
          {this.state.isAdmin ? (
            <Switch>
              <Route path='/adminOverview' component={AdminOverview} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/store' component={Store} />
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
            </Switch>
          ) : this.state.isUser ? (
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/overview' component={UserOverview} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/store' component={Store} />
              <Route path='/about' component={About} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
            </Switch>
              )}
        </div>
      </HashRouter>
    );
  }
}

export default App;
