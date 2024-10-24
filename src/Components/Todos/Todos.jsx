import { useReducer } from 'react';
import styles from './Todos.module.css';
import ToDo from '../ToDo/ToDo';

const initialState = {
    value: '',
    todos: [],
    isValid: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeValue': {
            return {
                ...state,
                value: action.payload
            }
        }
        case 'addItem': {
            if (state.value.trim() && state.value) {
                return {
                    ...state,
                    todos: [...state.todos,
                    {
                        id: Date.now(),
                        title: state.value,
                        isDone: false
                    }],
                    value: '',
                    isValid: false
                }
            } else {
                return {
                    ...state,
                    isValid: true
                }
            }
        }
        case 'check': {
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            isDone: !todo.isDone
                        }
                    } else {
                        return todo
                    }
                })
            }
        }
        case 'delete': {
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload)
            }
        }
        case 'changeItem': {
            if (action.payload.title.trim()) {
                return {
                    ...state,
                    todos: state.todos.map((todo) => {
                        if (todo.id === action.payload.id) {
                            return {
                                ...todo,
                                title: action.payload.title
                            }
                        } else {
                            return todo
                        }
                    })
                }
            }
        }
        default: {
            return state
        }
    }
}


function Todos() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className={styles.container}>
            <h1>My To-Do List</h1>
            <input
                type="text"
                value={state.value}
                onChange={(e) => dispatch({ type: 'changeValue', payload: e.target.value })}
                placeholder="Add a new task..."
                className={`${styles.input} ${state.isValid ? styles.error : ''}`} />
            {
                state.isValid && <p className={styles.error_text}>Please enter text</p>
            }
            <button onClick={() => dispatch({ type: 'addItem' })} className={styles.button}>Add</button>
            <ul className={styles.taskList}>
                {
                    state.todos.map((task) => (
                        <ToDo key={task.id} task={task} dispatch={dispatch} />
                    ))
                }
            </ul>
            {
                state.todos.length === 0 ? <p className={styles.noItems}> No Items</p> : ''
            }
        </div>
    )
}

export default Todos