import { PropertiesType } from "./redux"
const ADD_TASK_TO_LIST = 'DONE_TASKS_REDUCER/ADD_TASK_TO_LIST'
const REMOVE_TASK_FROM_LIST = 'DONE_TASKS_REDUCER/REMOVE_TASK_FROM_LIST'

export type DoneTaskType = {
    id: number
    text: string
    complition_time: number
}

export const actions = {
    add_task_to_list: (task_text: string, complition_time: number) => {
        return {type: ADD_TASK_TO_LIST, task_text, complition_time} as const
    },
    remove_task_to_list: (task_id: number) => {
        return {type: REMOVE_TASK_FROM_LIST, task_id} as const
    }
}

let initial_state = {
    tasks: null as DoneTaskType[] | null
}

type ActionsTypes = ReturnType<PropertiesType<typeof actions>>

const done_tasks_reducer = (state = initial_state, action: ActionsTypes) => {
    // debugger
    switch(action.type) {
        case ADD_TASK_TO_LIST: {
            let tasks
            if(!state.tasks) {
                let task: DoneTaskType = {id: 0, text: action.task_text, complition_time: action.complition_time}
                tasks = [task]
            } else {
                let task: DoneTaskType = {id: state.tasks.length, text: action.task_text, complition_time: action.complition_time}
                tasks = [...state.tasks, task]
            }
            return {
                ...state,
                tasks
            }
        }
        case REMOVE_TASK_FROM_LIST: {
            return {
                ...state,
                tasks: state.tasks!.filter(task => task.id !== action.task_id)
            }
        }
        default: return state
    }
}

export default done_tasks_reducer
