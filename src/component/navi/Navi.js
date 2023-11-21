import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Home from '../home/Home';
import Login from '../auth/Login';
import { useNavigate } from 'react-router-dom';

const Navi = () => {
  const navigate = useNavigate();
  return (
    <Navbar color="light" className='p-3' light expand="md">
      <NavbarBrand href="/">Task Management System</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink onClick={()=>navigate('/')}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={()=>navigate('/task/list')}>Task</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={()=>navigate('/category/list')}>Category</NavLink>
        </NavItem>
        <NavItem>
          <NavLink  onClick={()=>navigate('/login')}>Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={()=>navigate('/register')}>Register</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Navi;
