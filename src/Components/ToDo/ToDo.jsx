import { useState } from 'react'
import styles from './ToDo.module.css'

function ToDo({ task, dispatch }) {
    const [isShowInput, setShowInput] = useState(false);

    return (
        <li className={task.isDone ? styles.completed : ''}>
            <input type="checkbox"
                onChange={() => dispatch({ type: 'check', payload: task.id })} checked={task.isDone} />
            {
                !isShowInput && <span onDoubleClick={() => setShowInput(true)}>{task.title}</span>
            }
            {
                isShowInput && <input type="text" value={task.title}
                    onChange={(e) => dispatch({ type: 'changeItem', payload: { id: task.id, title: e.target.value } })}
                    onBlur={() => setShowInput(false)} />
            }
            <button
                onClick={() => dispatch({ type: 'delete', payload: task.id })} className={styles.deleteBtn}>X</button>
        </li>
    )
}

export default ToDo