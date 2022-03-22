import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

const LeftNav = () => {
  const [open, setOpen] = useState(false);

  return(
    <Col sm={0} md={3}>
      <Nav defaultActiveKey="/home" id="Left-nav" className="flex-column Left-nav Lg-only">
        <Nav.Link className="Menu-item" href="/">Home</Nav.Link>
        <Nav.Link className="Menu-item" href="/">Design</Nav.Link>
        <Nav.Link className="Menu-item" href="/about">About Us</Nav.Link>
        <Nav.Link className="Menu-item" href="/contact">Contact</Nav.Link>
      </Nav>
    </Col>
  )
}

export default LeftNav;
