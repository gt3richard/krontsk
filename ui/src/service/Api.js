import { toJS } from "mobx"
import axios from 'axios'

const url = 'https://e5mozecq8a.execute-api.us-west-2.amazonaws.com/dev'

export function getTasks(userId, accessToken, callback) {
    axios.get(`${url}/task?Id=${userId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
    })
    .then(response => {
        if(response.status !== 200) { callback([])}
        else { 
            console.log(response.data.Item.tasks)
            callback(response.data.Item.tasks)
        }
    }).catch(error => {
        console.log(error)
        callback([])
    })
}

export function putTasks(userId, tasks, accessToken, callback) {
    const body = { 
        Item: {
            'user_id': userId,
            'tasks': toJS(tasks)
        },
        TableName: 'krontsk'
    }

    axios.put(`${url}/task`, body, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
          }
    })
    .then(response => {
        if(response.status !== 200) { callback({})}
        else { 
            callback(response.data)
        }
    }).catch(error => {
        console.log(error)
        callback({})
    })
}
