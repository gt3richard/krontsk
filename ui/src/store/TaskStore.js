import {decorate, observable, action} from "mobx"

class TaskStore {

    edit = false

    tasks = [
        { "id": "1", "name":"Wells Fargo Credit Card", "date": "15", "state":"not-done" },
        { "id": "2", "name":"Chase Credit Card", "date": "18", "state":"done" },
        { "id": "3", "name":"Rent", "date": "1", "state":"not-done" }
    ]

    getTask(id) {
        return this.tasks.filter((t) => t.id === id)[0]
    }

    updateTaskState(id, state) {
        this.tasks = this.tasks.map((t) => {
            if(t.id === id) { t.state = state }
            return t
        })
    }

    updateTask(id, name, date) {
        this.tasks = this.tasks.map((t) => {
            if(t.id === id) { 
                t.name = name 
                t.date = date
            }
            return t
        })
    }

    addTask(name, date) {
        const task = {"id": (this.tasks.length + 1).toString(), "name": name, "date": date, "state": "not-done"}
        this.tasks.push(task)
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(f => f.id !== id)
    }

    month = {
        "1": "1st",
        "2": "2nd",
        "3": "3rd",
        "4": "4th",
        "5": "5th",
        "6": "6th",
        "7": "7th",
        "8": "8th",
        "9": "9th",
        "10": "10th",
        "11": "11th",
        "12": "12th",
        "13": "13th",
        "14": "14th",
        "15": "15th",
        "16": "16th",
        "17": "17th",
        "18": "18th",
        "19": "19th",
        "20": "20th",
        "21": "21th",
        "22": "22th",
        "23": "23th",
        "24": "24th",
        "25": "25th",
        "26": "26th",
        "27": "27th",
        "28": "28th",
        "29": "29th",
        "30": "30th",
        "31": "31th"
      }
}

decorate(TaskStore, {
    edit: observable,
    tasks: observable,
    updateTaskState: action,
    updateTask: action,
    getTask: action,
    addTask: action,
    deleteTask: action,
    month: observable
})

const store = new TaskStore();
export default store
export { TaskStore };