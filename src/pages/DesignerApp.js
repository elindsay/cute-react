import api from '../api'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';
//import StickerDesigner from '../elements/StickerDesigner';
import SocketConnector from '../elements/SocketConnector';
import ReactGA from 'react-ga';

const DesignerApp = () => {
  const [defaultProducts, setDefaultProducts] = useState([]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    api.getResaleComposites().then((result) => {
      console.log(result.data)
      setDefaultProducts(result.data[0].generated_products)
    })
  }, [])

  return(
    <div className="ContentContainer">
      <TopNav />
      <Row>
        <LeftNav />
        <Col sm={12} md={9}>
          <SocketConnector defaultProducts={defaultProducts}  />
        </Col>
      </Row>
    </div>
  )
}

export default DesignerApp;
