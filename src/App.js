import React from 'react'
import Home from './component/home/Home'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import { Container, Row } from 'reactstrap'
import { Route, Routes } from 'react-router-dom'
import Navi from './component/navi/Navi'
import Footer from './component/footer/Footer'
import Success from './component/success/Success'
import ForgotPassword from './component/auth/ForgotPassword'
import ListCategory from './component/category/ListCategory'
import CreateCategory from './component/category/CreateCategory'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import ListTask from './component/task/ListTask'
import CreateTask from './component/task/CreateTask'
import UpdateTask from './component/task/UpdateTask'
import { isAuthenticated } from './utilities/jwt/isAuthenticate'
import NotFound from './component/NotFound/NotFound'

export default function App() {
  return (
       <Container>
        <Row>
            <Navi/>
        </Row>
        <Row>
        <Routes>
            <Route exact path="/" Component={()=>isAuthenticated()?<ListTask/>:<Login/>} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route exact path="/category" Component={ProtectedRoute} >
              <Route path="list" Component={ListCategory} />
              <Route path="create" Component={CreateCategory} />
            </Route>
            <Route exact path="/task" Component={ProtectedRoute} >
              <Route path="list" Component={ListTask} />
              <Route path="create" Component={CreateTask} />
              <Route path="update/:id" Component={UpdateTask} />
            </Route>
            <Route path="/forgotPassword" Component={ForgotPassword} />
            <Route path='/*' Component={NotFound}/>
    </Routes>
        </Row>
        <Row>
            <Footer/>
        </Row>
    </Container>
    
  )
}
