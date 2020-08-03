import React from 'react'

import profile from '../../../images/myProfile.jpg'
import Card from '../../../shared/components/Card'

import './index.css'

const AboutUs = () => {

    const contact = () => {
        window.open('https://www.linkedin.com/in/plamen-shumanski-6349a01aa/')
    }

    return (
        <React.Fragment>
            <div className='about-section'>
                <h1>About Us Page</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>
            <hr />
            <br />
            <h2 className='about-heading'>Our Team</h2>
            <div className='about-row'>
                <div className='about-column'>
                </div>
                <div className='about-column'>
                    <Card className='about-card'>
                        <img src={profile} alt='Jane' />
                        <div className='about-container'>
                            <h2>PLAMEN SHUMANSKI</h2>
                            <p className='about-title'>Passionate Web Developer</p>
                            <p>I am Web Developer seeking for
                            opportunity to extend my web
                            development and enhance my skill set in
                            web technologies to develop and
                            implement solutions to meet business
                            needs.
                            </p>
                            <p>plamenshumanski140@gmail.com</p>
                            <p><button className='about-button' onClick={contact}>Contact</button></p>
                        </div>
                    </Card>
                </div>
                <div className='about-column'>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AboutUs