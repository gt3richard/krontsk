import axios from 'axios'

const url = ''

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