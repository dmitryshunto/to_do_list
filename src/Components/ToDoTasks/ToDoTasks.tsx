import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { connect } from 'react-redux'
import { AppStoreType } from '../../redux/redux'
import { TaskType, actions } from '../../redux/to_do_tasks_reducer'
import { actions as in_progress_actions } from '../../redux/in_progress_tasks_reducer'

const ToDoTasks: React.FC<MaDispatchToPropsType & MapStateToPropsType> = (props) => {
    let [new_task_text, set_new_task_text] = useState<string>('')
    let tasks = null
    if(props.tasks) {
        tasks = props.tasks.map((task: TaskType) => <CurrentTask key = {task.id}
                                                                 id = {task.id}
                                                                 add_task_to_in_progress_list = {props.add_task_to_in_progress_list}
                                                                 remove_task_from_list = {props.remove_task_from_list}
                                                                 task_text = {task.task}/>)
    }
    return (
        <div>
            <h3>To Do</h3>
            {tasks}
            <NewTask cb = {set_new_task_text}
                     value = {new_task_text}/>
            <button onClick = {() => {
                    props.add_task_to_list(new_task_text)
                    set_new_task_text('')}}>
                Add task
            </button>
        </div>
    )
}

type CurrentTaskType = {
    id: number
    task_text: string
    remove_task_from_list: typeof actions.remove_task_task_to_list
    add_task_to_in_progress_list: typeof in_progress_actions.add_task_task_to_list
}

const CurrentTask: React.FC<CurrentTaskType> = (props) => {
    const delete_task = () => {
        props.remove_task_from_list(props.id)
    }
    const add_task_to_in_progress_list = () => {
        props.remove_task_from_list(props.id)
        props.add_task_to_in_progress_list(props.task_text)
    }
    return (
        <div>
            {props.task_text}
            <button onClick = {delete_task}>x</button>
            <button onClick = {add_task_to_in_progress_list}>Add to In progress</button>
        </div>
    )
}

type NewTaskTypes = {
    cb: Dispatch<SetStateAction<string>>,
    value: string
}

const NewTask: React.FC<NewTaskTypes> = (props) => {
    const onTaskTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.cb(e.currentTarget.value)
    }
    return (
        <input type = {'text'} onChange = {onTaskTextChange} value = {props.value}/>
    )
}

type MapStateToPropsType = {
    tasks: null | TaskType[]
}

const map_state_to_props = (state: AppStoreType): MapStateToPropsType => {
    return { tasks: state.to_do_tasks.tasks }
}

type MaDispatchToPropsType = {
    add_task_to_list: typeof actions.add_task_task_to_list
    remove_task_from_list: typeof actions.remove_task_task_to_list
    add_task_to_in_progress_list: typeof in_progress_actions.add_task_task_to_list
}

const map_dispatch_to_props = {
    add_task_to_list: actions.add_task_task_to_list,
    remove_task_from_list: actions.remove_task_task_to_list,
    add_task_to_in_progress_list: in_progress_actions.add_task_task_to_list
}

export default connect<MapStateToPropsType, MaDispatchToPropsType, {}, AppStoreType>(map_state_to_props, map_dispatch_to_props)(ToDoTasks)