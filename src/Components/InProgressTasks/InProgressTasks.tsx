import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AppStoreType } from '../../redux/redux'
import { InPropgressTaskType, actions } from '../../redux/in_progress_tasks_reducer'


const InProgressTasks: React.FC<MaDispatchToPropsType & MapStateToPropsType> = (props) => {
    let tasks = null
    if(props.tasks) {
        tasks = props.tasks.map((task: InPropgressTaskType) => <InProgressTask key = {task.id}
                                                                 start_time = {task.start_time}
                                                                 id = {task.id}
                                                                 remove_task_from_list = {props.remove_task_from_list}
                                                                 task_text = {task.text}/>)
    }
    return (
        <div>
            <h3>In Progress</h3>
            {tasks}
        </div>
    )
}

type InProgressTaskType = {
    start_time: number
    id: number
    task_text: string
    remove_task_from_list: typeof actions.remove_task_task_to_list
}

const InProgressTask: React.FC<InProgressTaskType> = (props) => {
    const [task_time, set_task_time] = useState<string>('')
    const delete_task = () => {
        props.remove_task_from_list(props.id)
    }
    setTimeout(() => {
        let new_task_time = new Date(Date.now() - props.start_time - 3 * 3600 * 1000).toLocaleTimeString()
        set_task_time(new_task_time)
    }, 1000)
    return (
        <div>
            <div>{props.task_text}</div>
            <div>{task_time}</div>
            <button onClick = {delete_task}>x</button>
            <button>Resolve</button>
        </div>
    )
}


type MapStateToPropsType = {
    tasks: null | InPropgressTaskType[]
}

const map_state_to_props = (state: AppStoreType): MapStateToPropsType => {
    return { tasks: state.in_progress_tasks.tasks }
}

type MaDispatchToPropsType = {
    add_task_to_list: typeof actions.add_task_task_to_list
    remove_task_from_list: typeof actions.remove_task_task_to_list
}

const map_dispatch_to_props = {
    add_task_to_list: actions.add_task_task_to_list,
    remove_task_from_list: actions.remove_task_task_to_list
}

export default connect<MapStateToPropsType, MaDispatchToPropsType, {}, AppStoreType>(map_state_to_props, map_dispatch_to_props)(InProgressTasks)