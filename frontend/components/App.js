import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    //slices of state
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleted: true,
  }
  todoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  resetForm = () =>  this.setState({ ...this.state, todoNameInput:''})
  setAxiosResponseError = err => this.setState({ ...this.state, error: err.reponse.data.message })
  // use the the syntax below for any elements created on your own (componentDidMount is a react function different), 
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        // check out video could be done differently
        this.fetchAllTodos()
        this.resetForm()
      })
      .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = e => {
    e.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res =>{
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
      // this.fetchAllTodos() // adtional way to make the function work for the completed checkmark (not as eficient tho).
         this.setState({ 
          ...this.state, todos: this.state.todos.map(todo =>{
           if (todo.id !== id) return todo
          return res.data.data
        })
       }
       )
      })
      .catch(this.setAxiosResponseError)
  }

  toggleDispalyCompleted = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }

  componentDidMount() {
    // fetch from server (todos); 
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error} </div>
        <TodoList 
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}
        />
        
          {/* need to add props for the form to function as intended */}
          <Form 
            onTodoFormSubmit={this.onTodoFormSubmit}
            todoNameInput={this.state.todoNameInput}
            todoNameInputChange={this.todoNameInputChange}
            toggleDispalyCompleted={this.toggleDispalyCompleted}
            displayCompleted={this.state.displayCompleted}
          />
      </div>
    )
  }
}
