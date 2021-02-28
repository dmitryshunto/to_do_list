import { PropertiesType } from "./redux"
const ADD_TASK_TO_LIST = 'TO_DO_TASKS_REDUCER/ADD_TASK_TO_LIST'
const REMOVE_TASK_FROM_LIST = 'TO_DO_TASKS_REDUCER/REMOVE_TASK_FROM_LIST'


export type TaskType = {
    id: number
    task: string
}

export const actions = {
    add_task_task_to_list: (task_text: string) => {
        return { type: ADD_TASK_TO_LIST, task_text } as const
    },
    remove_task_task_to_list: (task_id: number) => {
        return { type: REMOVE_TASK_FROM_LIST, task_id } as const
    }
}

let initial_state = {
    tasks: null as TaskType[] | null
}

type ActionsTypes = ReturnType<PropertiesType<typeof actions>>

const to_do_tasks_reducer = (state = initial_state, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_TASK_TO_LIST: {
            if (action.task_text) {
                let tasks
                if (!state.tasks) {
                    let task: TaskType = { id: 0, task: action.task_text }
                    tasks = [task]
                } else {
                    let task: TaskType = { id: state.tasks.length, task: action.task_text }
                    tasks = [...state.tasks, task]
                }
                return {
                    ...state,
                    tasks
                }
            } else return state
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

export default to_do_tasks_reducer
