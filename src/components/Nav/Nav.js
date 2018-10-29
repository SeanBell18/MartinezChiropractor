import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Nav extends Component {
    login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env

        //window.location.origin -> fancy way of saying http://localhost:3000
        let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
    }
    logout = () => {
        axios.get('/auth/logout').then(res => {
                this.props.resetState()
            })
        this.props.history.push('/')
    }
    render() {
        let { isAdmin, isUser } = this.props
        if (isAdmin) {
            return (
                <div>
                    <nav>
                        <Link to='/' ><li>Home</li></Link>
                        <Link to='/overview'><li>Overview</li></Link>
                        <Link to='/calendar'><li>Calendar</li></Link>
                        {/* <Link to= '/'><li>User Info</li></Link> */}
                        <li className='drop-content'>About
                        <ul >
                                <Link to='/about/staff'><li>Staff</li></Link>
                                <li>First Visit</li>
                                <li>Contact</li>
                            </ul>
                        </li>
                        <li>Store</li>
                    </nav>
                    <button onClick ={this.logout}>Log out</button>
                </div>
            )
        } else if (isUser) {
            return (
                <div>
                    <nav>
                        <li>Home</li>
                        <li>Overview</li>
                        <li>Calendar</li>
                        <li className='drop-content'>About
                        <ul>
                                <li>Staff</li>
                                <li>First Visit</li>
                                <li>Contact</li>
                            </ul>
                        </li>
                        <li>Store</li>
                        <li>Cart</li>
                    </nav>
                    <button onClick = {this.logout}>Log out</button>
                </div>
            )
        } else {
            return (
                <div>
                    <nav>
                        <li>Home</li>
                        <li className='drop-content'>About
                        <ul>
                                <li>Staff</li>
                                <li>First Visit</li>
                                <li>Contact</li>
                            </ul>
                        </li>
                        <li>Store</li>
                    </nav>
                    <button onClick={this.login} id='login'>Log in</button>
                </div>
            )
        }
    }
}

export default withRouter(Nav)