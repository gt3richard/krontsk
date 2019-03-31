import {decorate, observable, action, computed} from "mobx"

class TaskStore {
    tasks = [
        { "id": "1", "name":"Wells Fargo Credit Card", "date": "15th", "state":"not-done" },
        { "id": "2", "name":"Chase Credit Card", "date": "18th", "state":"done" },
        { "id": "3", "name":"Rent", "date": "1st", "state":"not-done" }
    ]

    getTask(id) {
        return this.tasks.filter((t) => t.id === id)[0]
    }

    updateTask(id, state) {
        this.tasks = this.tasks.map((t) => {
            if(t.id === id) { t.state = state }
            return t
        })
    }

    addTask(name, date) {
        const task = {"id": (this.tasks.length + 1).toString(), "name": name, "date": date, "state": "not-done"}
        this.tasks.push(task)
        console.log(Array.from(this.tasks))
    }
}

decorate(TaskStore, {
    tasks: observable,
    updateTask: action,
    getTask: action,
    addTask: action
})

const store = new TaskStore();
export default store
export { TaskStore };