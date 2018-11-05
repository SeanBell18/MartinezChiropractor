import React from 'react'
import {Link} from 'react-router-dom'
import '../About.css'

export default function Contact() {
    return (
        <div>
            <Link to='/about/staff'><h1 className='subtitle'>Staff</h1></Link>
            <Link to ='/about/first_visit'><h1 className='subtitle'v>First Visit</h1></Link>
            <h1 className='subtitle'>Contact</h1>
            <h6>For additional information, to schedule or adjust an appointment or for a free consultation, call (925) 372-0700</h6>
            <div className = "address">
                <p className = "subheader">Address: </p>
                <p>3755 Alhambra Avenue, Suite 5</p>
                <p>Martinez, CA 94553</p>
            </div>
            <div className="hours">
            <p className = "subheader">Business Hours:</p>
            <p>Monday: 8:15a-6:00p</p>
            <p>Tuesday: 8:15a-4:45p</p>
            <p>Wednesday: 12p-6:00p</p>
            <p>Thursday: 8:15a-4:45</p>
            <p>Friday: 8:15a-6:00p</p>
            <p>Saturday by appointment</p>
            </div>
            <img src={require('../../images/mtz_Chiro_map.PNG')} alt='Map to Martinez Chiropractic in Martinez, CA' id= 'map' />
        </div>
    )
} 