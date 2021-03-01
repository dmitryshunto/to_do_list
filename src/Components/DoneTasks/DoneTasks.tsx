import React from 'react'
import { connect } from 'react-redux'
import { actions, DoneTaskType } from '../../redux/done_tasks_reducer'
import { AppStoreType } from '../../redux/redux'

const hourly_rate = 10

const DoneTasks: React.FC<MapStateToPropsType & MaDispatchToPropsType> = (props) => {
    let tasks = null
    if(props.tasks) {
        tasks = props.tasks.map((task, index) => <DoneTask key = {task.id}
                                                    index = {index + 1}
                                                    id = {task.id}
                                                    remove_task_from_list = {props.remove_task_from_list}
                                                    complition_time = {task.complition_time}
                                                    task_text = {task.text}/>)
    }
    return (
        <div className = 'comp'>
            <h3>Done Tasks (hourly rate is 10$)</h3>
            {tasks}            
        </div>
    )
}

type DoneTaskPropsType = {
    index: number
    task_text: string
    complition_time: number
    id: number
    remove_task_from_list: typeof actions.remove_task_to_list
}

const DoneTask: React.FC<DoneTaskPropsType> = (props) => {
    const delete_task = () => {
        props.remove_task_from_list(props.id)
    }
    const cost = Math.round(props.complition_time / 1000 / 3600 * hourly_rate * 100) / 100


    return (
        <div className = 'task'>
            <div>{`${props.index}. ${props.task_text}`}</div>
            <div>{`${cost} $`}</div>
            <button onClick = {delete_task}>x</button>
        </div>
    )
}

type MapStateToPropsType = {
    tasks: null | DoneTaskType[]
}

const map_state_to_props = (state: AppStoreType): MapStateToPropsType => {
    return { tasks: state.done_tasks.tasks }
}

type MaDispatchToPropsType = {
    remove_task_from_list: typeof actions.remove_task_to_list
}

const map_dispatch_to_props = {
    remove_task_from_list: actions.remove_task_to_list
}

export default connect<MapStateToPropsType, MaDispatchToPropsType, {}, AppStoreType>(map_state_to_props, map_dispatch_to_props)(DoneTasks)