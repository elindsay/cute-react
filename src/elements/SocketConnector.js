import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { Row, Col } from 'react-bootstrap';

const endPoint = process.env.REACT_APP_URL;
const socket = io.connect(`${endPoint}`);


const SocketConnector = () => {
  const [messages, setMessages] = useState([""]);
  const [message, setMessage] = useState("");
  const [imgUrl, setImgUrl] = useState("");



  useEffect(() => {
    //socket.emit('join', 'abcd');
    console.log("setting up")
    socket.on("connect", () => {
      console.log(socket.id);
    })
    getMessages();
    getImages();
  }, [messages.length]);

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
      console.log("getting image")
      setImgUrl(imgMsg)
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
        <Col sm={12} md={4} className="ProductPreview">
          <img src={imgUrl} className="product_preview"/>
        </Col>
      </Row>
    </div>
  );
};

export default SocketConnector
