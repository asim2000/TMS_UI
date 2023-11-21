import { makeRequest } from "../api/utils"

export default class PriorityService {

 getAll = () => {
    return makeRequest('get','/priority/getAll')
 }
}