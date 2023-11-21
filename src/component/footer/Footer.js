import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-dark p-3">
      <Container>
        <Row>
          <Col>
            {/* Additional footer content */}
            <p>&copy; 2023 My Website. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
