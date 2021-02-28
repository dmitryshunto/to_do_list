import React from 'react'
import ToDoTasks from './Components/ToDoTasks/ToDoTasks'
import { Provider } from 'react-redux';
import store from './redux/redux';
import InProgressTasks from './Components/InProgressTasks/InProgressTasks';

const App = () => {
  return (
    <div>
      <ToDoTasks/>
      <InProgressTasks />    
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
