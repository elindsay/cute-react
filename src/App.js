import logo from './assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <div className="ContentContainer">
        <Navbar expand="lg" className="Navbar">
          <Navbar.Brand href="#home">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="Logo-title">
              Cute Animal Stuff
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="Left-nav" className="Hamburger" onClick={() => setOpen(!open)}/>
        </Navbar>
        { open &&
          <Nav defaultActiveKey="/home" id="Left-nav" className="flex-column Left-nav">
            <Nav.Link className="Menu-item" href="/home">Home</Nav.Link>
            <Nav.Link className="Menu-item" eventKey="link-1">Design</Nav.Link>
            <Nav.Link className="Menu-item" eventKey="link-2">Stickers</Nav.Link>
            <Nav.Link className="Menu-item" eventKey="link-2">Catalog</Nav.Link>
            <Nav.Link className="Menu-item" eventKey="link-2">Contact</Nav.Link>
          </Nav>
        }
        <Nav defaultActiveKey="/home" id="Left-nav" className="flex-column Left-nav Lg-only">
          <Nav.Link className="Menu-item" href="/home">Home</Nav.Link>
          <Nav.Link className="Menu-item" eventKey="link-1">Design</Nav.Link>
          <Nav.Link className="Menu-item" eventKey="link-2">Stickers</Nav.Link>
          <Nav.Link className="Menu-item" eventKey="link-2">Catalog</Nav.Link>
          <Nav.Link className="Menu-item" eventKey="link-2">Contact</Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default App;
