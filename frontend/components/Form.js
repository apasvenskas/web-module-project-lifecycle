import React from "react";

export default class Form extends React.Component {
  render() {
    const { onTodoFormSubmit,  } = this.props
    return (
      <>
        {/* added props so function can use state and this in the Form.js */}
        <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
          <input
            value={this.props.todoNameInput}
            onChange={this.props.todoNameInputChange}
            type="text"
            placeholder="Type todo"
          ></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.props.toggleDispalyCompleted}>
          {" "}
          {this.props.displayCompleted ? "Clear" : "Show"} Completed
        </button>
      </>
    );
  }
}
