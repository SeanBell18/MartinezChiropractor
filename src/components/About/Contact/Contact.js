import React, { Component } from 'react'

export default function Contact() {
    return (
        <div>
            <h3>Contact</h3>
            <h6>For additional information, to schedule or adjust an appointment or for a free consultation, call (925) 372-0700</h6>
            <div className = "address">
                <p className = "subheader">Address: </p>
                <p>3755 ALhambra Avenue, Suite 5</p>
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
        </div>
    )
}