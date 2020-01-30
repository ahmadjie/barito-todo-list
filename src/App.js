import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      add: "",
      todos: ["Todo satu", "Todo Dua"],
      search: '',
      date: '',
      loading: true
    }
  }

  componentDidMount() {
    axios
      .get(`http://worldtimeapi.org/api/timezone/Asia/Jakarta`)
      .then(res => {
        this.setState({
          date: res.data.datetime,
          loading: false
        })
      })
  }

  handleSearch = e => {
    this.setState({ search: e.target.value })
  }

  onChangeAdd = e => {
    this.setState({
      add: e.target.value
    })
  }


  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        add: "",
        todos: [...this.state.todos, this.state.add]
      })
    }
  }
  removeTodo(e) {
    const todosCopy = [...this.state.todos]; // make a separate copy of the array
    todosCopy.splice(e, 1)
    this.setState({ todos: todosCopy })
  }


  render() {
    const { add, todos, date, search, loading } = this.state
    const lowerCaseSearch = search.toLowerCase();
    const searchTodos = todos.filter(todo => {
      return todo.toLowerCase().includes(lowerCaseSearch)
    })

    if (loading) {
      return (
        <div className="container" >
          <ReactLoading type="spinningBubbles" />
        </div>
      )
    }
    return (
      <div className="container">
        <div className='content'>
          <h1>Todo List</h1>
          <h4>Tanggal : {date.substr(0, 10)}</h4>
          <input type="text" onChange={this.onChangeAdd} value={add} placeholder="Add new list.." className="new-item" onKeyDown={this.handleKeyDown} />
          <input type="text" placeholder="Search..." value={search} onChange={this.handleSearch} className="search" />
          {
            searchTodos.map((item, index) => {
              return (
                <div key={index} className="wrapper-list">
                  <div className="list">
                    <p className="text-list">{item}</p>
                  </div>
                  <button type="submit" onClick={() => this.removeTodo(index)} className="close">x</button>
                  <br />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}


export default App;