import api from '../api'
import thumper from '../assets/thumper-transparent.gif';
import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';
import { useParams } from "react-router-dom";

const GeneratedProduct = () => {
  const [product, setProduct] = useState({price: 0, paypal_checkout_id: ""})
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    console.log("going to request")
    api.getGeneratedProduct(id).then((result) => {
      console.log("request run")
      console.log(result.data)
      setProduct(result.data)
    })
  }, [])

  const display_price = (price_cents) => {
    return (price_cents/100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true)
    const url = new URL(window.location);
    window.history.pushState({}, '', url);
    api.createOrder( id ).then((result) => {
      window.location.replace('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id='+product['paypal_checkout_id'])
    })
  }

  return(
    <div className="ContentContainer ProductPage">
      <TopNav />
      <Row>
        <LeftNav />
        <Col sm={12} md={9}>
          <Row>
            <Col sm={12} md={6}>
              <img src={product.image_url} className="product_page_main_img" />
            </Col>
            <Col sm={12} md={6}>
               <h2>Title Placeholder</h2>
               <h4>{display_price(product.price)}</h4>
               <i>Free Shipping in the USA!</i>
            </Col>
          </Row>
          <Row>
            <img src={thumper} className={loading ? "thumper" : "hidden"}/>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="paypal-paynow-form" className = {loading ? "hidden" : "paypal"}>
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="generated_product_id" value={id} />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" onClick={submitForm} />
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
          </Row>
          <Row>
            Placeholder Description
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default GeneratedProduct;
