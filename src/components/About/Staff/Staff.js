import React from 'react'
import { Link } from 'react-router-dom'
import './../About.css'

export default function Staff() {
    return (
        <div>
            <h1 className='subtitle'>Staff</h1>
            <h2>Dr. Jaromy Bell</h2>
            <div className='description'>
                <img src={require('../../images/Dr.Bell.jpg')} alt='Dr. Jaromy Bell' />
                <p>Dr. Bell graduated from Logan College of Chiropractic with his Doctor of Chiropractic Degree as well as a Masters in Sports Medicine and Rehabilitation. Dr. Bell has had advanced training in treating muscle and joint injuries, sports injuries, TMJ, and musculoskeletal pains in pregnancy<br /><br /></p>
            </div>
            <p>He has worked with exceptional chiropractors including:</p>
            <ol>
                <li>Dr. Mike Murphy (chiropractor for the St. Louis Rams and Blues)</li>
                <li>Dr. Paul Walton (chiropractor for Cal Berkeley athletes)</li>
                <li>Dr. Earle Paynton (local chiropractor who is well respected and treats high school, collegiate, and professional athletes in the Bay Area.</li>
            </ol>
            <p><br></br></p>
            <h2>Annalyse</h2>
            <div className='description'>
                <img src={require('../../images/receptionist.jpg')} alt='Receptionist Annalyse' />
                <p>When you come in or call Martinez Chiropractic you will be greeted by Annalyse who has been working for thisoffice for over nine years. She will be happy to assist you with all your service needs including insurance coverage, car accident cases, worker’s compensation injuries, claims, payment option’s or any other questions you may have.</p>
            </div>
            <h1 className='subtitle' v>First Visit</h1>
            <h1 className='subtitle'>Contact</h1>
        </div>
    )
}