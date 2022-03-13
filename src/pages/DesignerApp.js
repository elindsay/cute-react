import { Row, Col } from 'react-bootstrap';
import TopNav from '../elements/TopNav';
import LeftNav from '../elements/LeftNav';
import StickerDesigner from '../elements/StickerDesigner';
import SocketConnector from '../elements/SocketConnector';

const DesignerApp = () => {

  return(
    <div className="ContentContainer">
      <TopNav />
      <Row>
        <LeftNav />
        <Col sm={12} md={9}>
          <StickerDesigner />
          <SocketConnector />
        </Col>
      </Row>
    </div>
  )
}

export default DesignerApp;
