import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillEdit, AiOutlineArrowLeft } from 'react-icons/ai'
import { AiFillCopy } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'
import {AiFillEye} from 'react-icons/ai'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import CategoryService from '../../service/CategoryService';
import alertify from 'alertifyjs';
import { getJwt } from '../../utilities/jwt/jwt';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import TaskService from '../../service/TaskService';
import PriorityService from '../../service/PriorityService';
import ProgressService from '../../service/ProgressService';
const ListTask = () => {
    const {sub} = jwtDecode(getJwt())
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [progreses, setProgreses] = useState([])
    const [priorities, setPriorities] = useState([])
    const [categoryId, setCategoryId] = useState()
    const [priority, setPriority] = useState()
    const [progress, setProgress] = useState()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedRow(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    const taskService = new TaskService()
    taskService.delete(selectedRow).then(result=>{
      getTasks(sub)
      alertify.success('Successfully deleted task')
    }).catch(error=>{
      alertify.error(error.message)
    })
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
    useEffect(() => {
      const priorityService = new PriorityService()
      priorityService.getAll().then(result=>{
        setPriorities(result.data)
      }).catch(error=>{
        alertify.error(error.message)
      })
      const progressService = new ProgressService()
      progressService.getAll().then(result=>{
        setProgreses(result.data)
      }).catch(error=>{
        alertify.error(error.message)
      })
      const categoryService = new CategoryService()
      categoryService.getAll(sub).then(result=>{
        setCategories(result.data)
      }).catch(error=>{
        alertify.error(error.message)
      })
       getTasks()
    }, [])
    function getTasks(){
      const taskService = new TaskService()
        
      taskService.getAll({
        userId:sub,
        categoryId:(categoryId=='' || undefined?null:categoryId),
        priority:(priority=='' || undefined?null:priority),
        progress:(progress=='' || undefined?null:priority)
      })
      .then(result=>{
          setTasks(result.data)
      }).catch(error=>{
        setTasks([])
          alertify.error(error.message)
      })
    }
    const clearFilter = () => {
     setCategoryId('')
     setPriority('')
     setProgress('')
    };
    const getBgColor = task => {
      return task.progress=='CONFIRMED'?'lightgreen':''
    }
  return (
  <Col>
     <Row>
    <Col>
    <Button className='mt-2 mb-2' onClick={()=>navigate('/task/create')}>Create Task</Button>

    </Col>

   </Row>
   <Row>
    <Col>
    <FormGroup>
            <Label for="category">Select Category</Label>
            <Input required type="select" name="categoryId" id="category" value={categoryId} onChange={event=>setCategoryId(event.target.value)}>
                <option value=''>Select...</option>
                {
                    categories.map(category=>{
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })
                }
            </Input>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
            <Label for="priority">Select Priority</Label>
            <Input required type="select" name="priority" id="priority" value={priority} onChange={event=>setPriority(event.target.value)}>
                <option value=''>Select...</option>
                {
                    priorities?.map(priority=>{
                        return <option key={priority} value={priority}>{priority}</option>
                    })
                }
            </Input>
      </FormGroup>
    </Col>
    <Col>
      <FormGroup>
            <Label for="priority">Select Progress</Label>
            <Input required type="select" name="priority" id="priority" value={progress} onChange={event=>setProgress(event.target.value)}>
                <option value=''>Select...</option>
                {
                    progreses?.map(progress=>{
                        return <option key={progress} value={progress}>{progress}</option>
                    })
                }
            </Input>
      </FormGroup>
    </Col>
    <Col>
      <Button style={{marginTop:'30px',width:'150px'}} className='pr-5 pl-5' onClick={()=>getTasks()}>Search</Button>
      <Button style={{marginTop:'30px',marginLeft:'5px'}} onClick={()=>clearFilter()}>Clear Filter</Button>
    </Col>
   </Row>
   <Row>
    <Col>
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Progress</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: '#f2f2f2', color: 'black' }}>
        {tasks.map((task, index) => (
          <tr key={index} style={{ backgroundColor: 'lightgreen' }}>
            <th style={{ backgroundColor: getBgColor(task) }} scope="row">{index + 1}</th>
            <td style={{ backgroundColor: getBgColor(task) }}>{task.category.name}</td>
            <td style={{ backgroundColor: getBgColor(task) }}>{task.title}</td>
            <td style={{ backgroundColor: getBgColor(task) }}>{task.description}</td>
            <td style={{ backgroundColor: getBgColor(task) }}>{task.priority}</td>
            <td style={{ backgroundColor: getBgColor(task) }}>{task.progress}</td>
            <td style={{ backgroundColor: getBgColor(task) }}>
                <AiFillEdit title='edit' color='black' onClick={()=>navigate('/task/update/'+task.id)} className='ms-3' />
                <GiCancel color='red' title='cancel' onClick={() => handleDeleteClick(task.id)} className='ms-3' />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Delete Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <Button color="secondary" onClick={handleCloseModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Col>
   </Row>
  </Col>
  );
};

export default ListTask;
