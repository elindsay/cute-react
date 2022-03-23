import me from '../assets/me.jpeg';
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';
import ReactGA from 'react-ga';

const AboutUs = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])
  
  return(
    <div className="ContentContainer Contact">
      <TopNav />
      <Row >
        <LeftNav />
        <Col sm={12} md={9}>
          <div style={{margin: '10px' }}>
            <h2>About Us </h2>
            <Row>
              <Col xs={6}>
                <img src={me} style={{width: '100%'}}/>
              </Col>
              <Col xs={6}>
                <div>
                  Hi! My name's Emma, and I'm the person who made this site.
                </div>
                <div style={{marginTop: '10px'}}>
                  I've been a programmer for about 20 years, and decided to turn some of my attention to a fun project - selling customized items for people who love animals!
                </div>
                <div style={{marginTop: '10px'}}>
                  It's still a work in progress, so reach out if you have any problems - admin@cuteaninalstuff.shop. Or, follow our <a href="https://facebook.com/cuteanimalstuff">facebook page!</a>
                </div>

              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AboutUs;
