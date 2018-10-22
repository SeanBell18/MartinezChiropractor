import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import AdminOverview from './components/Overview/AdminOverview'
import UserOverview from './components/Overview/UserOverview'
import Calendar from './components/Calendar/Calendar'
import Home from './components/Home/Home'
import About from './components/About/About'
import Nav from './components/Nav/Nav'
import Store from './components/Store/Store'
import Contact from './components/About/Contact/Contact'
import First_Visit from './components/About/First_Visit/First_Visit'
import Staff from './components/About/Staff/Staff'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAdmin: false,
      isUser: false
    }
    this.updateLogin = this.updateLogin.bind(this)
  }
  updateLogin(val) {
    if (val === true) {
      this.setState({ isAdmin: true })
    } else {
      this.setState({ isUser: true })
    }
    console.log(this.state)
  }
  render() {
    return (
      <HashRouter >
        <div>
          <Nav isAdmin={this.state.isAdmin} isUser={this.state.isUser} confirmAdmin={this.confirmAdmin} />
          {this.state.isAdmin ? (
            <Switch>
              <Route path='/adminOverview' component={AdminOverview} />
              <Route path='/calendar' render={() =><Calendar updateLogin={this.updateLogin}/>} />
              <Route path='/store' component={Store} />
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route path='/about/first_visit' component={First_Visit} />
              <Route path='/about/staff' component={Staff} />
              <Route path='/about/contact' component={Contact} />
            </Switch>
          ) : this.state.isUser ? (
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/overview' component={UserOverview} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/store' component={Store} />
              <Route exact path='/about' component={About} />
              <Route path='/about/first_visit' component={First_Visit} />
              <Route path='/about/staff' component={Staff} />
              <Route path='/about/contact' component={Contact} />
            </Switch>
          ) : (
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route path='/about/first_visit' component={First_Visit} />
                  <Route path='/about/staff' component={Staff} />
                  <Route path='/about/contact' component={Contact} />
                  <Route path='/calendar' render={() => <Calendar updateLogin={this.updateLogin} isAdbmin = {this.state.isAdmin} isUser = {this.state.isUser}/>} />
                </Switch>
              )}
        </div>
      </HashRouter>
    );
  }
}

export default App;
