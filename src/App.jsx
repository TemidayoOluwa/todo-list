import { useState, useEffect } from 'react'
import './App.css'
import TodoInput from './component/todoInput'
import TodoList from './component/todoList'
function App() {
   const [todos, setTodos] = useState([]);
   const [todoValue, setTodoValue] = useState('');
   
   function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
   }
   function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
   }
   function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
   }
   function handleEditTodo(index){
    const valueToBeEditted = todos[index]
    setTodoValue(valueToBeEditted)
    handleDeleteTodo(index)
   }
   useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
   
    if(!localTodos){
      return
    }
    
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
   }, [])
  return (
    <>
    <h3 >Create Your Todo List For Today</h3>
       <TodoInput setTodoValue={setTodoValue} todoValue={todoValue} handleAddTodos = {handleAddTodos}/>
       <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={ handleDeleteTodo} todos = {todos}/>
    </>
  )
}

export default App
