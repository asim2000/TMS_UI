// CategoryPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CategoryService from '../../service/CategoryService';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { jwtDecode } from 'jwt-decode';
import { getJwt } from '../../utilities/jwt/jwt';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate()
  const {sub} = jwtDecode(getJwt())
const createCategory = () => {
    const categoryService = new CategoryService()
    categoryService.create({
        userId:sub,
        name
    }).then(result=>{
        alertify.success(result.message)
        navigate('/category/list')
    }).catch(error=>{
        alertify.error(error.message)
    })
}
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2>Add New Category</h2>
          <Form>
            <FormGroup>
              <Label for="name">Category Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <Button color="primary" onClick={()=>createCategory()}>
              Add Category
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCategory;
