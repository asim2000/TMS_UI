import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import alertify from 'alertifyjs';
import { setJwt } from '../../utilities/jwt/jwt';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigate = useNavigate()
  const handleLogin = () => {
   const authService = new AuthService()
   authService.login({
    username,
    password,
    isRememberMe
   }).then(result=>{
    setJwt(result.data)
    navigate('/')
    alertify.success(result.message)
   }).catch(error=>{
    alertify.error(error.message)
   })
  };

  const handleForgotPassword = () => {
    // Add your "Forgot Password" logic here
    console.log('Forgot Password clicked');
    // You can navigate to a forgot password page or show a modal, etc.
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2>Login</h2>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                id="rememberMe"
                label="Remember Me"
                checked={isRememberMe}
                onChange={() => setIsRememberMe(!isRememberMe)}
              />
              <Label for="rememberMe">Remember Me</Label>
            </FormGroup>
            <Button color="primary" onClick={handleLogin}>
              Login
            </Button>
            <div className="mt-2">
              <Button color="link" onClick={()=>navigate('/forgotPassword')}>
                Forgot Password?
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
