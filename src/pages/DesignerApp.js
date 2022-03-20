import api from '../api'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';
//import StickerDesigner from '../elements/StickerDesigner';
import SocketConnector from '../elements/SocketConnector';

const DesignerApp = () => {
  const [defaultProducts, setDefaultProducts] = useState([]);

  useEffect(() => {
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
