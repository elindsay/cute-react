import api from '../api'
import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';
import { useParams } from "react-router-dom";

const FinishedDesign = () => {
  const [composite, setComposite] = useState({generated_image_url: ""})
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    api.getComposite(id).then((result) => {
      console.log(result.data)
      setComposite(result.data)
    })
  }, [])

  return(
    <div className="ContentContainer FinishedDesignPage">
      <TopNav />
      <Row>
        <LeftNav />
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <img src={composite.generated_image_url} className="finished_design"/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default FinishedDesign;
