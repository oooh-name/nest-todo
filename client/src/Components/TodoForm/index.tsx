import * as React from "react"
import {FC, useEffect, useState} from "react"
import {ITodo} from "../../../types/Todo"

interface Props {
  onSubmit: (todo: Partial<ITodo>) => Promise<void>;
  todo?: ITodo;
}

const defaultTodo: Omit<ITodo, 'id'> = {
  title: '',
  description: '',
  status: 0,
}

const TodoForm: FC<Props> = (props) => {
  const { todo, onSubmit } = props;

  // 新待办
  const [newTodo, setNewTodo] = useState<Omit<ITodo, 'id' | 'status'>>(defaultTodo);

  useEffect(() => {
    setNewTodo(todo || defaultTodo);
  }, [todo])

  return (
    <div>
      <div>
        <input
          value={newTodo.title}
          onChange={e => setNewTodo({...newTodo, title: e.target.value})}
          placeholder="输入标题"
          type='text'
        />
      </div>
      <div>
        <textarea
          placeholder="输入内容"
          value={newTodo.description}
          onChange={e => setNewTodo({...newTodo, description: e.target.value})} cols={30} rows={10}
        />
      </div>
      <button onClick={() => onSubmit(newTodo)}>提交</button>
      <button onClick={() => onSubmit(newTodo)}>重置</button>
    </div>
  )
}

export default TodoForm