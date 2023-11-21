import { makeRequest } from "../api/utils"

export default class TaskService {

 getAll = body => {
    return makeRequest('post','/task/getAll',body)
 }

 create = body => {
    return makeRequest('post','/task/create',body)
 }
 update = body => {
   return makeRequest('post','/task/update',body)
}
 getById = id => {
   return makeRequest('get','/task/getById/'+id)
 }
 delete = id => {
   return makeRequest('get','/task/delete/'+id)
 }

}