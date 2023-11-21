import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CategoryService from '../../service/CategoryService';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { jwtDecode } from 'jwt-decode';
import { getJwt } from '../../utilities/jwt/jwt';
import TaskService from '../../service/TaskService';
import PriorityService from '../../service/PriorityService';

const CreateTask = () => {
  const navigate = useNavigate()
  const {sub} = jwtDecode(getJwt())
  const [categoryId, setCategoryId] = useState()
  const [categories, setCategories] = useState([])
  const [priorities, setPriorities] = useState([])
  const [selectedPriority, setSelectedPriority] = useState([])
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [deadline, setDeadline] = useState('')
  useEffect(() => {
    const categoryService = new CategoryService()
    categoryService.getAll(sub)
    .then(result=>{
        setCategories(result.data)
    }).catch(error=>{
        alertify.error(error.message)
    })

    const priorityService = new PriorityService()
    priorityService.getAll()
    .then(result=>{
        setPriorities(result.data)
    }).catch(error=>{
        alertify.error(error.message)
    })
  }, [])

const createTask = (e) => {
    e.preventDefault()
    const taskService = new TaskService()
    taskService.create({
        categoryId:categoryId,
        priority:selectedPriority,
        title:title,
        description:description,
        deadline:deadline
    }).then(result=>{
        alertify.success(result.message)
        navigate('/task/list')
    }).catch(error=>{
        alertify.error(error.message)
    })
}
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2>Add New Task</h2>
          <Form onSubmit={createTask}>
          <FormGroup>
            <Label for="category">Select Category</Label>
            <Input required type="select" name="categoryId" id="category" value={categoryId} onChange={event=>setCategoryId(event.target.value)}>
                <option value="">Select...</option>
                {
                    categories.map(category=>{
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })
                }
            </Input>
      </FormGroup>
      <FormGroup>
            <Label for="priority">Select Priority</Label>
            <Input required type="select" name="priority" id="priority" value={selectedPriority} onChange={event=>setSelectedPriority(event.target.value)}>
                <option value="">Select...</option>
                {
                    priorities?.map(priority=>{
                        return <option key={priority} value={priority}>{priority}</option>
                    })
                }
            </Input>
      </FormGroup>
      <FormGroup>
        <Label for="deadline">Select Deadline</Label>
        <Input
          type="date"
          name="deadline"
          id="deadline"
          value={deadline}
          pattern='\d{4}-\d{2}-\d{2}'
          onChange={e=>setDeadline(e.target.value)}
        />
      </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter title name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
              
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter description name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FormGroup>
            <Button type='submit' color="primary">
              Add Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTask;
