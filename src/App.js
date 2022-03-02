import logo from './assets/logo.svg';
import './App.scss';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import StickerDesigner from './elements/StickerDesigner';
import SocketConnector from './elements/SocketConnector';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <div className="ContentContainer">
        <Navbar expand="lg" className="Navbar">
          <Navbar.Brand href="https://cuteanimalstuff.shop/">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="Logo-title">
              Cute Animal Stuff
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="Left-nav" className="Hamburger" onClick={() => setOpen(!open)}/>
        </Navbar>
        { open &&
          <Nav defaultActiveKey="/home" id="Left-nav" className="flex-column Left-nav Sm-only">
            <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/">Home</Nav.Link>
            <Nav.Link className="Menu-item" eventKey="link-1">Design</Nav.Link>
            <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/collections/stickers">Stickers</Nav.Link>
            <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/collections/all">Catalog</Nav.Link>
            <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/pages/contact">Contact</Nav.Link>
          </Nav>
        }
        <Row>
          <Col sm={0} md={3}>
            <Nav defaultActiveKey="/home" id="Left-nav" className="flex-column Left-nav Lg-only">
              <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/">Home</Nav.Link>
              <Nav.Link className="Menu-item" eventKey="link-1">Design</Nav.Link>
              <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/collections/stickers">Stickers</Nav.Link>
              <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/collections/all">Catalog</Nav.Link>
              <Nav.Link className="Menu-item" href="https://cuteanimalstuff.shop/pages/contact">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col sm={12} md={9}>
            <StickerDesigner />
          </Col>
        </Row>
        <Row>
          <SocketConnector />
        </Row>
      </div>
    </div>
  );
}

export default App;
