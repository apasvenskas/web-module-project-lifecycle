import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    //slices of state
      todos: [],
      error: '',
      todoNameInput: '',
  }
  todoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  // use the the syntax below for any elements created on your own (componentDidMount is a react function different), 
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.fetchAllTodos()
        this.setState({ ...this.state, todoNameInput:''})
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
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
      .catch(err => {
        this.setState({ ...this.state, error: err.reponse.message})
      })
  }
  componentDidMount() {
    // fetch from server (todos); 
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error} </div>
          <div id="todos">
            <h2>Todos</h2>
            {
              this.state.todos.map(todo => {
                return <div key={todo.id}>{todo.name}</div>
              })
            }
          </div>
          <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
            <input value={this.state.todoNameInput} onChange={this.todoNameInputChange} type='text' placeholder='Type todo'></input>
            <input type='submit'></input>
            <button>Clear Completed</button>
          </form>
        
      </div>
    )
  }
}
