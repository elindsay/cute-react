import thumper from '../assets/thumper-transparent.gif';
import StickerDesigner from './StickerDesigner';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';

const endPoint = process.env.REACT_APP_URL;
const socket = io.connect(`${endPoint}`);


const SocketConnector = (props) => {
  const [product1, setProduct1] = useState({id: "", image_url: ""})
  const [product2, setProduct2] = useState({id: "", image_url: ""})
  const [product3, setProduct3] = useState({id: "", image_url: ""})
  const [socketId, setSocketId] = useState("")



  useEffect(() => {
    //socket.emit('join', 'abcd');
    console.log("setting up")
    socket.on("connect", () => {
      setSocketId(socket.id)
    })
    console.log(props.defaultProducts)
    if(props.defaultProducts[0]){
      setProduct1(props.defaultProducts[0])
    }
    if(props.defaultProducts[1]){
      setProduct2(props.defaultProducts[1])
    }
    if(props.defaultProducts[2]){
      setProduct3(props.defaultProducts[2])
    }
    getProducts();
  }, [props]);


  const getProducts = () => {
    socket.on("product1", pdMsg => {
      setProduct1(pdMsg)
    });
    socket.on("product2", pdMsg => {
      setProduct2(pdMsg)
    });
    socket.on("product3", pdMsg => {
      setProduct3(pdMsg)
    });
  }

  const loadProducts = () => {
    setProduct1({id: "", image_url: thumper})
    setProduct2({id: "", image_url: thumper})
    setProduct3({id: "", image_url: thumper})
  }

  return (
    <div>
      <StickerDesigner loadProducts={loadProducts} socketId={socketId}/>
      <div>
        <Row>
          <Col sm={12} md={4} className="ProductPreview" key={"product-link-1"}>
            <Link to={"/products/"+product1.id} >
              <img src={product1.image_url} className="product_preview"/>
            </Link>
          </Col>
          <Col sm={12} md={4} className="ProductPreview" key={"product-link-2"}>
            <Link to={"/products/"+product2.id} >
              <img src={product2.image_url} className="product_preview"/>
            </Link>
          </Col>
          <Col sm={12} md={4} className="ProductPreview" key={"product-link-3"}>
            <Link to={"/products/"+product3.id} >
              <img src={product3.image_url} className="product_preview"/>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SocketConnector
