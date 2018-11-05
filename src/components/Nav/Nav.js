import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

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
                <div >
                    <div className='logo'>
                        <button onClick={this.logout} id='login'>Log out</button>
                    </div>
                    <nav>
                        <Link to='/' ><li>Home</li></Link>
                        <Link to='/overview'><li>Overview</li></Link>
                        <Link to='/calendar'><li>Calendar</li></Link>
                        <Link to='/About'><li className='drop-content'>About
                            <ul >
                                <Link to='/about/staff'><li>Staff</li></Link>
                                <Link to='/about/first_visit'><li>First Visit</li></Link>
                                <Link to='/about/contact'><li>Contact</li></Link>
                            </ul>
                        </li></Link>
                        <Link to='/store'><li>Store</li></Link>
                    </nav>
                </div>
            )
        } else if (isUser) {
            return (
                <div>
                    <div className='logo'>
                        <button onClick={this.logout} id='login'>Log out</button>
                    </div>
                    <nav>
                        <Link to='/' ><li>Home</li></Link>
                        <Link to='/overview'><li>Overview</li></Link>
                        <Link to='/calendar'><li>Calendar</li></Link>
                        <Link to='/about'><li className='drop-content'>About
                            <ul>
                                <Link to='/about/staff'><li>Staff</li></Link>
                                <Link to='/about/first_visit'><li>First Visit</li></Link>
                                <Link to='/about/contact'><li>Contact</li></Link>
                            </ul>
                        </li></Link>
                        <Link to='/store'><li>Store</li></Link>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <div className='logo'>
                        <button onClick={this.login} id='login'>Log in</button>
                    </div>
                    <nav>
                        <Link to='/' ><li>Home</li></Link>
                        <Link to='/about'><li className='drop-content'>About
                            <ul>
                                <Link to='/about/staff'><li>Staff</li></Link>
                                <Link to='/about/first_visit'><li>First Visit</li></Link>
                                <Link to='/about/contact'><li>Contact</li></Link>
                            </ul>
                        </li></Link>
                        <Link to='/store'><li>Store</li></Link>
                    </nav>
                </div>
            )
        }
    }
}

export default withRouter(Nav)