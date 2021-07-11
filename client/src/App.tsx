import React, { FC, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import axios from 'axios';

const baseURL = 'http://localhost:4200';

const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  // new todo
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id' | 'status'>>({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchTodos().then();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const { data } = await axios.request<Todo[]>(({ baseURL, url: '/todo', method: 'GET' }));
    setTodos(data);
    setLoading(false);
  };

  const addTodo = async () => {
    setLoading(true);
    const newTodoData: Omit<Todo, 'id'> = {
      ...newTodo,
      status: 0,
    };
    await axios.request<Todo>(({ baseURL, url: '/todo', method: 'POST', data: newTodoData }));
    setLoading(false);
    await fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    await axios.request<Todo>(({ baseURL, url: `/todo/${id}`, method: 'DELETE' }));
    setLoading(false);
    await fetchTodos();
  };

  return (
    <div className='App'>
      {loading && <div>Loading...</div>}

      <div>
        <div>
          <input
            value={newTodo.title}
            onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder='输入新待办事项'
            type='text'
          />
        </div>
        <div>
          <textarea
            value={newTodo.description}
            onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} cols={30} rows={10}
          />
        </div>
        <button onClick={addTodo}>添加</button>
      </div>

      <hr />

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <p>标题：{todo.title}</p>
            <small>具体内容：{todo.description}</small>
            <div>
              <button onClick={() => deleteTodo(todo.id)}>移除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
