import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'reactstrap';
import CategoryService from '../../service/CategoryService';
import alertify from 'alertifyjs';
import { getJwt } from '../../utilities/jwt/jwt';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ListCategory = () => {
    const {sub} = jwtDecode(getJwt())
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const categoryService = new CategoryService()
        categoryService.getAll(sub)
        .then(result=>{
            setCategories(result.data)
        }).catch(error=>{
            alertify.error(error.message)
        })
    }, [])
    
  return (
  <Col>
     <Row>
    <Col>
    <Button className='mt-2 mb-2' onClick={()=>navigate('/category/create')}>Create Category</Button>
    </Col>

   </Row>
   <Row>
    <Col>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Category Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{category.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Col>
   </Row>
  </Col>
  );
};

export default ListCategory;
