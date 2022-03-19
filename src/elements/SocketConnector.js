import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';

const endPoint = process.env.REACT_APP_URL;
const socket = io.connect(`${endPoint}`);


const SocketConnector = () => {
  const [messages, setMessages] = useState([""]);
  const [message, setMessage] = useState("");
  const [imgUrls, setImgUrls] = useState([])
  const [productIds, setProductIds] = useState([])



  useEffect(() => {
    //socket.emit('join', 'abcd');
    console.log("setting up")
    socket.on("connect", () => {
      console.log(socket.id);
    })
    getMessages();
    getImages();
    getProductIds();
  }, []);

  const getMessages = () => {
    socket.on("message", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      console.log("getting message")
      setMessages([...messages, msg]);
    });
  };

  const getImages = () => {
    socket.on("image", imgMsg => {
      console.log("setting image")
      console.log(imgUrls.length)
      setImgUrls(imgUrls => [...imgUrls, imgMsg])
    });
  }

  const getProductIds = () => {
    socket.on("product_id", pdMsg => {
      console.log("setting produt")
      setProductIds(productIds => [...productIds, pdMsg])
    });
  }

  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg, ix) => (
          <Row key={'message-'+ix}>
            <p>{msg}</p>
          </Row>
        ))}
      <Row>
        { imgUrls.map((imgUrl, ix) => (
          <Col sm={12} md={4} className="ProductPreview" key={"product-link-"+ix}>
            <Link to={"/products/"+productIds[ix]} >
              <img src={imgUrl} className="product_preview"/>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SocketConnector
