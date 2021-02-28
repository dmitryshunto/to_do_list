import { PropertiesType } from "./redux"
const ADD_TASK_TO_LIST = 'IN_PROGRESS_TASKS_REDUCER/ADD_TASK_TO_LIST'
const REMOVE_TASK_FROM_LIST = 'IN_PROGRESS_TASKS_REDUCER/REMOVE_TASK_FROM_LIST'

export type InPropgressTaskType = {
    id: number
    text: string
    start_time: number
}

export const actions = {
    add_task_task_to_list: (task_text: string) => {
        return {type: ADD_TASK_TO_LIST, task_text} as const
    },
    remove_task_task_to_list: (task_id: number) => {
        return {type: REMOVE_TASK_FROM_LIST, task_id} as const
    }
}

let initial_state = {
    tasks: null as InPropgressTaskType[] | null
}

type ActionsTypes = ReturnType<PropertiesType<typeof actions>>

const in_progress_tasks_reducer = (state = initial_state, action: ActionsTypes) => {
    switch(action.type) {
        case ADD_TASK_TO_LIST: {
            let tasks
            if(!state.tasks) {
                let task: InPropgressTaskType = {id: 0, text: action.task_text, start_time: Date.now()}
                tasks = [task]
            } else {
                let task: InPropgressTaskType = {id: state.tasks.length, text: action.task_text, start_time: Date.now()}
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

export default in_progress_tasks_reducer
