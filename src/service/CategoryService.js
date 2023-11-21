import { makeRequest } from "../api/utils"

export default class CategoryService {

 getAll = userId => {
    return makeRequest('get','/category/getAll/user/'+userId)
 }

 create = body => {
    return makeRequest('post','/category/create',body)
 }

}