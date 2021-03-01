import { createStore, combineReducers} from "redux"
import done_tasks_reducer from "./done_tasks_reducer"
import in_progress_tasks_reducer from "./in_progress_tasks_reducer"
import to_do_tasks_reducer from "./to_do_tasks_reducer"

const root_reducer = combineReducers({
    to_do_tasks: to_do_tasks_reducer,
    in_progress_tasks: in_progress_tasks_reducer,
    done_tasks: done_tasks_reducer
})

const store = createStore(root_reducer)

type RootReducerType = typeof root_reducer
export type AppStoreType = ReturnType<RootReducerType>
export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export default store