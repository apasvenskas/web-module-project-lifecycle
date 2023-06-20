import React from 'react'
import axios from 'axios'

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
          <div id="todos">
            <h2>Todos</h2>
            {
              this.state.todos.reduce((acc, todo) => {
                //debugger
                if (this.state.displayCompleted || !todo.completed) return acc.concat(
                  <div onClick={this.toggleCompleted(todo.id)} key={todo.id}> {todo.name}{todo.completed ? '✔️' : ''}</div>
                )
                return acc
              }, [])
               // return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}> {todo.name}{todo.completed ? '✔️' : ''}</div>
             // })
            }
          </div>
          <form id='todoForm' onSubmit={this.onTodoFormSubmit}>
            <input value={this.state.todoNameInput} onChange={this.todoNameInputChange} type='text' placeholder='Type todo'></input>
            <input type='submit'></input>
          </form>
            <button onClick={this.toggleDispalyCompleted}> {this.state.displayCompleted ? 'Clear' : 'Show'} Completed</button> 
      </div>
    )
  }
}
