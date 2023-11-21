import { makeRequest } from "../api/utils"

export default class ProgressService {

 getAll = () => {
    return makeRequest('get','/progress/getAll')
 }
}