import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthService from '../../service/AuthService';
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const handleForgotPassword = () => {
    const authService = new AuthService();
    authService.forgotPassword({email}).then(result=>{
    alertify.success(result.message);
    navigate('/login')
    }).catch(error=>{
      alertify.error(error.message)
    })
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" onClick={handleForgotPassword}>
              Reset Password
            </Button>
            {message && <div className="mt-2 text-success">{message}</div>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
