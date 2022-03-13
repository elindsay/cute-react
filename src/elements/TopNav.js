import logo from '../assets/logo.svg';
import { useState } from 'react';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

const TopNav = () => {
  const [open, setOpen] = useState(false);

  return(
    <div>
      <Navbar expand="lg" className="Navbar">
        <Navbar.Brand href="https://cuteanimalstuff.shop/">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="Logo-title">
            Cute Animal Stuff
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="Left-nav" className="Hamburger" onClick={() => setOpen(!open)}/>
      </Navbar>
      { open && <Nav defaultActiveKey="/home" id="Left-nav" className="flex-column Left-nav Sm-only">
        <Nav.Link className="Menu-item" href="/">Home</Nav.Link>
        <Nav.Link className="Menu-item" href="/">Design</Nav.Link>
        <Nav.Link className="Menu-item" href="">About Us</Nav.Link>
        <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/pages/contact">Contact</Nav.Link>
        </Nav>
      }
    </div>
  )
}

export default TopNav;
