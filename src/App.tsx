import React from 'react'
import ToDoTasks from './Components/ToDoTasks/ToDoTasks'
import { Provider } from 'react-redux';
import store from './redux/redux';
import InProgressTasks from './Components/InProgressTasks/InProgressTasks';
import DoneTasks from './Components/DoneTasks/DoneTasks';
import './App.css'

const App = () => {
  return (
    <div className = {'app'}>
      <ToDoTasks/>
      <InProgressTasks />
      <DoneTasks />    
    </div>
  );
}

const AppContainer = () => {
  return (
    <Provider store = {store}>
      <App />
    </Provider>
  )
}

export default AppContainer;
