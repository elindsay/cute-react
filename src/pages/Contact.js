import { Row, Col } from 'react-bootstrap';
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';

const Contact = () => {
  
  return(
    <div className="ContentContainer Contact">
      <TopNav />
      <Row>
        <LeftNav />
        <Col sm={12} md={9}>
          <h2>Contact Us </h2>
          <h4>Email: <b>admin@cuteanimalstuff.shop</b></h4>
          <h4>Facebook Messenger: <b><a href="https://m.me/cuteanimalstuff">CuteAnimalStuff</a></b></h4>
          <h4>Our FB Page: <b><a href="https://facebook.com/cuteanimalstuff">facebook.com/cuteanimalstuff</a></b></h4>
        <Col sm={12} md={9} style={{marginTop: '20px'}}>
          <h4>Return Policy:</h4>
          Because our items are print on demand, we can only guarantee returns or exchanges for damaged or non-delivered items. However, if you are unhappy with your purchase, please reach out and we will try to make it right.
        </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Contact;
